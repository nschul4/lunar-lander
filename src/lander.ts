import "phaser";
import { GameSceneController } from "./scenes/gameSceneController";
import { LanderGrid } from "./landerGrid";
import {
  LANDER_VERTICES,
  THRUST_VERTICES,
  SHOW_LANDER_GRID,
  LANDER_RENDER_ORDER
} from "./configs/landerConfig";

export class Lander extends Phaser.GameObjects.Polygon {
  public thrust: Phaser.GameObjects.Polygon;
  private devGrid: LanderGrid;

  public declare body: MatterJS.BodyType;

  private static readonly THRUST_FORCE = 0.00002;
  private static readonly ROTATION_SPEED = 0.01;

  constructor(scene: Phaser.Scene) {
    // Instantiate exactly as before using configurations to preserve visual geometry metrics
    super(scene, 0, 0, LANDER_VERTICES, 0x999999);
    scene.add.existing(this);

    scene.matter.add.gameObject(this, {
      shape: { type: 'fromVerts', verts: LANDER_VERTICES.join(' '), flagInternal: true }
    });

    this.angle = -90;
    this.setPosition(100, 200);

    if (this.body) {
      scene.matter.body.setVelocity(this.body, { x: 1.5, y: 0 });
    }

    const matterGameObject = this as unknown as Phaser.Physics.Matter.Components.Velocity & Phaser.Physics.Matter.Components.Bounce & Phaser.Physics.Matter.Components.Friction;
    if (typeof matterGameObject.setFrictionAir === 'function') {
      matterGameObject.setFrictionAir(0);
    }
    if (typeof matterGameObject.setBounce === 'function') {
      matterGameObject.setBounce(0);
    }

    this.setName("lander");

    // Initialize standalone modular components safely
    this.thrust = scene.add.polygon(0, 0, THRUST_VERTICES, 0xffffff);
    this.thrust.setName("thrust");
    this.thrust.visible = false;

    this.devGrid = new LanderGrid(scene);
    this.devGrid.setVisible(SHOW_LANDER_GRID);

    // Apply strict rendering layout pipeline stack layers explicitly
    this.applyLayerDepths();
  }

  /**
   * Evaluates the configured order array dynamically and assigns explicit layout depths.
   */
  private applyLayerDepths(): void {
    const baseDepth = 20; // Ensure it renders cleanly above backgrounds/world grids
    LANDER_RENDER_ORDER.forEach((layerType, index) => {
      const assignedDepth = baseDepth + index;
      if (layerType === 'grid') {
        this.devGrid.setDepth(assignedDepth);
      } else if (layerType === 'lander') {
        this.setDepth(assignedDepth);
      } else if (layerType === 'thrust') {
        this.thrust.setDepth(assignedDepth);
      }
    });
  }

  public getVelocityX(): number {
    return this.body ? this.body.velocity.x : 0;
  }

  public getVelocityY(): number {
    return this.body ? this.body.velocity.y : 0;
  }

  public stop(): void {
    if (this.body && this.scene && this.scene.matter) {
      this.scene.matter.body.setVelocity(this.body, { x: 0, y: 0 });
      this.scene.matter.body.setAngularVelocity(this.body, 0);
    }
    this.angle = 0;
  }

  public update(controllerScene: GameSceneController): void {
    if (controllerScene.thrusting === true) {
      this.thrust.visible = true;
      const radians = Phaser.Math.DegToRad(this.angle);

      const forceX = Lander.THRUST_FORCE * Math.sin(radians);
      const forceY = -Lander.THRUST_FORCE * Math.cos(radians);

      if (this.body) {
        (this.scene.matter as any).body.applyForce(this.body, this.body.position, {
          x: forceX,
          y: forceY
        });
      }
    } else {
      this.thrust.visible = false;
    }

    if (this.body && this.scene && this.scene.matter) {
      let angularVelocity = 0;
      if (controllerScene.rotatingLeft === true) {
        angularVelocity = -Lander.ROTATION_SPEED;
      } else if (controllerScene.rotatingRight === true) {
        angularVelocity = Lander.ROTATION_SPEED;
      }
      this.scene.matter.body.setAngularVelocity(this.body, angularVelocity);
    }

    this.thrust.x = this.x;
    this.thrust.y = this.y;
    this.thrust.angle = this.angle;

    // Direct toggle synchronization checks visibility states continuously
    this.devGrid.setVisible(SHOW_LANDER_GRID);
    if (SHOW_LANDER_GRID) {
      this.devGrid.render(this.x, this.y, this.angle);
    }
  }

  public destroy(fromScene?: boolean): void {
    this.devGrid.destroy();
    this.thrust.destroy();
    super.destroy(fromScene);
  }
}