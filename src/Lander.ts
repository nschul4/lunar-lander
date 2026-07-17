import "phaser";
import { GameSceneController } from "./scenes/gameSceneController";

export class Lander extends Phaser.GameObjects.Polygon {
  public thrust: Phaser.GameObjects.Polygon;

  public declare body: MatterJS.BodyType;

  private static readonly THRUST_FORCE = 0.00002;
  private static readonly ROTATION_SPEED = 0.01;

  constructor(scene: Phaser.Scene) {
    const landerPoints = [
      -20, 20, // Left-bottom wing tip
      0, 10,   // Bottom-middle indent
      20, 20,  // Right-bottom wing tip
      0, -20   // Top nose cone tip
    ];

    super(scene, 0, 0, landerPoints, 0x999999);
    scene.add.existing(this);

    scene.matter.add.gameObject(this, {
      shape: { type: 'fromVerts', verts: landerPoints.join(' '), flagInternal: true }
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

    const yShift = 8;
    const thrustFlamePoints = [
      0, 20 + yShift,  // Left edge meeting the left wing
      20, 30 + yShift, // Bottom tip of the flame blowing downwards
      40, 20 + yShift, // Right edge meeting the right wing
      20, 10 + yShift  // Top tip of the flame tucked inside the ship indent
    ];

    this.thrust = scene.add.polygon(0, 0, thrustFlamePoints, 0xffffff);
    this.thrust.setName("thrust");
    this.thrust.visible = false;
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
  }
}