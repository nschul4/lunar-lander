import "phaser";
import { GameSceneController } from "./scenes/gameSceneController";
import { LanderGrid } from "./landerGrid";
import {
  LANDER_VERTICES,
  THRUST_VERTICES,
  SHOW_LANDER_GRID,
  LANDER_RENDER_ORDER,
  LANDER_TEXTURE_KEY,
  THRUST_TEXTURE_KEY
} from "./configs/landerConfig";

export class Lander {
  public sprite: Phaser.Physics.Matter.Sprite;
  public thrust: Phaser.GameObjects.Sprite;
  private devGrid: LanderGrid;

  private static readonly THRUST_FORCE = 0.000027;
  private static readonly ROTATION_SPEED = 0.008;

  constructor(scene: Phaser.Scene) {
    Lander.generateLanderTexture(scene);
    Lander.generateThrustTexture(scene);

    this.sprite = scene.matter.add.sprite(100, 200, LANDER_TEXTURE_KEY, undefined, {
      shape: { type: 'fromVerts', verts: LANDER_VERTICES.join(' '), flagInternal: true }
    });

    (this.sprite as any).lander = this;

    this.sprite.setAngle(-90);

    if (this.sprite.body) {
      scene.matter.body.setVelocity(this.sprite.body as MatterJS.BodyType, { x: 1.5, y: 0 });
    }

    this.sprite.setFrictionAir(0);
    this.sprite.setBounce(0);
    this.sprite.setName("lander");

    // 3. Obtain center offset dynamically computed by Matter.js
    const localPosition = (this.sprite.body as any).positionLocal || { x: 0, y: 0 };
    const dx = localPosition.x;
    const dy = localPosition.y;

    // Shift the texture canvas origin to offset Matter's center-of-mass shift
    this.sprite.setOrigin(
      (30 - dx) / 60,
      (30 - dy) / 60
    );

    // 4. Instantiate the thrust effect as an Image Sprite attached to lander origin
    this.thrust = scene.add.sprite(this.x, this.y, THRUST_TEXTURE_KEY);
    this.thrust.setName("thrust");
    this.thrust.visible = false;

    // Shift thruster origin using the same center-of-mass offsets
    this.thrust.setOrigin(
      (30 - dx) / 60,
      (30 - dy) / 60
    );

    // 5. Initialize developer overlay grid
    this.devGrid = new LanderGrid(scene, dx, dy);
    this.devGrid.setVisible(SHOW_LANDER_GRID);

    this.applyLayerDepths();
  }

  // Position convenience getters/setters for seamless compatibility with scene code
  public get x(): number {
    return this.sprite.x;
  }

  public get y(): number {
    return this.sprite.y;
  }

  public get angle(): number {
    return this.sprite.angle;
  }

  public set angle(value: number) {
    this.sprite.setAngle(value);
  }

  /**
   * Generates a high-resolution canvas texture for the lander ship frame.
   */
  private static generateLanderTexture(scene: Phaser.Scene): void {
    if (scene.textures.exists(LANDER_TEXTURE_KEY)) return;

    const g = scene.make.graphics({ x: 0, y: 0 });

    g.fillStyle(0x999999, 1);

    const offsetX = 30;
    const offsetY = 30;

    g.beginPath();
    g.moveTo(LANDER_VERTICES[0] + offsetX, LANDER_VERTICES[1] + offsetY);
    for (let i = 2; i < LANDER_VERTICES.length; i += 2) {
      g.lineTo(LANDER_VERTICES[i] + offsetX, LANDER_VERTICES[i + 1] + offsetY);
    }
    g.closePath();
    g.fillPath();
    g.strokePath();

    g.generateTexture(LANDER_TEXTURE_KEY, 60, 60);
    g.destroy();
  }

  /**
   * Generates a high-resolution canvas texture for the thruster flame output.
   */
  private static generateThrustTexture(scene: Phaser.Scene): void {
    if (scene.textures.exists(THRUST_TEXTURE_KEY)) return;

    const g = scene.make.graphics({ x: 0, y: 0 });

    g.fillStyle(0xffffff, 1);

    const offsetX = 30;
    const offsetY = 31;

    g.beginPath();
    g.moveTo(THRUST_VERTICES[0] + offsetX, THRUST_VERTICES[1] + offsetY);
    for (let i = 2; i < THRUST_VERTICES.length; i += 2) {
      g.lineTo(THRUST_VERTICES[i] + offsetX, THRUST_VERTICES[i + 1] + offsetY);
    }
    g.closePath();
    g.fillPath();

    g.generateTexture(THRUST_TEXTURE_KEY, 60, 60);
    g.destroy();
  }

  private applyLayerDepths(): void {
    const baseDepth = 20;
    LANDER_RENDER_ORDER.forEach((layerType, index) => {
      const assignedDepth = baseDepth + index;
      if (layerType === 'grid') {
        this.devGrid.setDepth(assignedDepth);
      } else if (layerType === 'lander') {
        this.sprite.setDepth(assignedDepth);
      } else if (layerType === 'thrust') {
        this.thrust.setDepth(assignedDepth);
      }
    });
  }

  public getVelocityX(): number {
    return this.sprite.body ? this.sprite.body.velocity.x : 0;
  }

  public getVelocityY(): number {
    return this.sprite.body ? this.sprite.body.velocity.y : 0;
  }

  public stop(): void {
    if (this.sprite.body && this.sprite.scene && this.sprite.scene.matter) {
      this.sprite.scene.matter.body.setVelocity(this.sprite.body as MatterJS.BodyType, { x: 0, y: 0 });
      this.sprite.scene.matter.body.setAngularVelocity(this.sprite.body as MatterJS.BodyType, 0);
    }
    this.angle = 0;
  }

  public update(controllerScene: GameSceneController): void {
    if (controllerScene.thrusting === true) {
      this.thrust.visible = true;
      const radians = Phaser.Math.DegToRad(this.angle);

      const forceX = Lander.THRUST_FORCE * Math.sin(radians);
      const forceY = -Lander.THRUST_FORCE * Math.cos(radians);

      if (this.sprite.body) {
        (this.sprite.scene.matter as any).body.applyForce(
          this.sprite.body as MatterJS.BodyType,
          this.sprite.body.position,
          { x: forceX, y: forceY }
        );
      }
    } else {
      this.thrust.visible = false;
    }

    if (this.sprite.body && this.sprite.scene && this.sprite.scene.matter) {
      let angularVelocity = 0;
      if (controllerScene.rotatingLeft === true) {
        angularVelocity = -Lander.ROTATION_SPEED;
      } else if (controllerScene.rotatingRight === true) {
        angularVelocity = Lander.ROTATION_SPEED;
      }
      this.sprite.scene.matter.body.setAngularVelocity(this.sprite.body as MatterJS.BodyType, angularVelocity);
    }

    // Keep thrust sprite transform in sync with lander
    this.thrust.setPosition(this.x, this.y);
    this.thrust.setAngle(this.angle);

    // Direct toggle synchronization checks visibility states continuously
    this.devGrid.setVisible(SHOW_LANDER_GRID);
    if (SHOW_LANDER_GRID) {
      this.devGrid.render(this.x, this.y, this.angle);
    }
  }

  public destroy(): void {
    this.devGrid.destroy();
    this.thrust.destroy();
    this.sprite.destroy();
  }
}