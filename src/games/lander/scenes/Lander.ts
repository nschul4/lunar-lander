import "phaser";
import { ControllerScene } from "./controllerScene";

export class Lander extends Phaser.GameObjects.Polygon {
  public thrust: Phaser.GameObjects.Polygon;

  public declare body: MatterJS.BodyType;

  private static readonly THRUST_FORCE = 0.00002;
  private static readonly ROTATION_SPEED = 0.01;

  constructor(scene: Phaser.Scene) {
    const xLeft = 0, xMiddle = 20, xRight = 40;
    const yTop = 0, yMiddle = 30, yBottom = 40;
    const landerPoints = `${xLeft} ${yBottom} ${xMiddle} ${yMiddle} ${xRight} ${yBottom} ${xMiddle} ${yTop}`;

    super(scene, 0, 0, landerPoints, 0x999999);
    scene.add.existing(this);

    scene.matter.add.gameObject(this, {
      shape: { type: 'fromVerts', verts: landerPoints, flagInternal: true }
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

    const mysteryShifter = -12;
    const yTop2 = yMiddle + mysteryShifter;
    const yMiddle2 = yBottom + mysteryShifter;
    const yBottom2 = yBottom + mysteryShifter + 10;
    const thrustFlamePoints = `${xLeft} ${yMiddle2} ${xMiddle} ${yBottom2} ${xRight} ${yMiddle2} ${xMiddle} ${yTop2}`;

    this.thrust = scene.add.polygon(this.x, this.y, thrustFlamePoints, 0xffffff);
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

  public update(controllerScene: ControllerScene): void {
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