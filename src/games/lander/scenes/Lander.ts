import "phaser";
import { ControllerScene } from "./controllerScene";

export class Lander extends Phaser.GameObjects.Polygon {
  public thrust: Phaser.GameObjects.Polygon;
  
  // Expose the dynamically added matter body for internal TypeScript checks
  public body!: MatterJS.BodyType; 

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

    const physicsSelf = this as any;
    physicsSelf.setVelocityX(1.5);
    physicsSelf.setFrictionAir(0);
    physicsSelf.setBounce(0, 0);
    
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

  // ENCAPSULATION: Getters for physics properties
  public getVelocityX(): number {
    return this.body ? this.body.velocity.x : 0;
  }

  public getVelocityY(): number {
    return this.body ? this.body.velocity.y : 0;
  }

  public stop(): void {
    const physicsSelf = this as any;
    if (typeof physicsSelf.setVelocity === 'function') {
      physicsSelf.setVelocity(0, 0);
    }
    if (typeof physicsSelf.setAngularVelocity === 'function') {
      physicsSelf.setAngularVelocity(0);
    }
    // ENCAPSULATION: Reset angle internally
    this.angle = 0; 
  }

  public update(controllerScene: ControllerScene): void {
    if (controllerScene.thrusting === true) {
      this.thrust.visible = true;
      const radians = Phaser.Math.DegToRad(this.angle);

      const forceX = Lander.THRUST_FORCE * Math.sin(radians);
      const forceY = -Lander.THRUST_FORCE * Math.cos(radians);
      
      (this.scene.matter as any).body.applyForce(this.body, this.body.position, {
        x: forceX,
        y: forceY
      });
    } else {
      this.thrust.visible = false;
    }

    const physicsSelf = this as any;
    physicsSelf.setAngularVelocity(0);
    
    if (controllerScene.rotatingLeft === true) {
      physicsSelf.setAngularVelocity(-Lander.ROTATION_SPEED);
    }
    if (controllerScene.rotatingRight === true) {
      physicsSelf.setAngularVelocity(Lander.ROTATION_SPEED);
    }

    this.thrust.x = this.x;
    this.thrust.y = this.y;
    this.thrust.angle = this.angle;
  }
}