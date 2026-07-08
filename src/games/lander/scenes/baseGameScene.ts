import { GameSceneOverlay } from "./gameSceneOverlay";
import { ControllerScene } from "./controllerScene";
import { WorldCreator } from "./worldCreator";

export abstract class BaseGameScene extends Phaser.Scene {
  private static readonly GRAVITY_Y = 0.007;
  private static readonly THRUST_FORCE = 0.00002;
  private static readonly ROTATION_SPEED = 0.01;

  private static readonly MAX_SAFE_HORIZONTAL_SPEED = 0.05;
  private static readonly MAX_SAFE_VERTICAL_SPEED = 0.4;
  private static readonly MAX_SAFE_ANGLE = 4;

  public lander: any;
  protected controllerScene: any = null;
  protected thrust: any;

  protected worldBoundsRectangleColorTop: number = 0x555555;
  protected worldBoundsRectangleColorBottom: number = 0x555555;
  protected worldBoundsRectangleColorLeft: number = 0x555555;
  protected worldBoundsRectangleColorRight: number = 0x555555;

  protected background: Phaser.GameObjects.TileSprite;
  protected mountainRange: Phaser.GameObjects.TileSprite;
  protected mountainRange2: Phaser.GameObjects.TileSprite;
  protected gridGraphics: Phaser.GameObjects.Graphics;
  
  public successCount: number = 0;
  public noOfSuccessesPossible: number = 0;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  public pause() {
    this.scene.pause();
  }

  protected objectToString(target: any): string {
    var result: string = "";
    Object.getOwnPropertyNames(target).forEach(
      (name) => {
        result += " ";
        result += name;
        result += ": ";
        result += target[name];
        result += ",\n";
      }
    );
    return "{\n" + result + "}";
  }

  protected setupLander(): void {
    var xLeft: number = 0;
    var xMiddle: number = 20;
    var xRight: number = 40;

    var yTop: number = 0;
    var yMiddle: number = 30;
    var yBottom: number = 40;

    var landerPoints: string = ""
      + xLeft + " " + yBottom // left
      + " "
      + xMiddle + " " + yMiddle // center
      + " "
      + xRight + " " + yBottom // right
      + " "
      + xMiddle + " " + yTop // peak
      ;

    var xRight2: number = xRight;
    var xMiddle2: number = xMiddle;
    var xLeft2: number = xLeft;

    var mysteryShifter = -12;
    var yTop2: number = yMiddle + mysteryShifter;
    var yMiddle2: number = yBottom + mysteryShifter;
    var yBottom2: number = yBottom + mysteryShifter + 10;

    var thrustFlamePoints: string = ""
      + xLeft2 + " " + yMiddle2 // left
      + " "
      + xMiddle2 + " " + yBottom2 // center
      + " "
      + xRight2 + " " + yMiddle2 // right
      + " "
      + xMiddle2 + " " + yTop2 // peak
      ;

    this.lander = this.add.polygon(0, 0, landerPoints, 0x999999);
    this.matter.add.gameObject(
      this.lander,
      {
        shape: {
          type: 'fromVerts',
          verts: landerPoints,
          flagInternal: true
        }
      }
    );

    this.lander.angle = -90;
    this.lander.setPosition(100, 200);
    this.lander.setVelocityX(1.5);
    this.lander.setFrictionAir(0);
    this.lander.setBounce(0, 0);

    this.lander.setName("lander");

    this.thrust = this.add.polygon(
      this.lander.x,
      this.lander.y,
      thrustFlamePoints,
      0xffffff
    );
    this.thrust.setName("thrust");
  }

/**
   * Generates a continuous jagged texture to serve as a background mountain range
   * using a bottom-anchored coordinate system matching the mountain blueprints.
   */
  protected generateMountainRange(): void {
    if (this.textures.exists('mountain_range')) return;

    const width = 1400;
    const height = 1600;
    const g = this.make.graphics({ x: 0, y: 0 });

    // Define vertices using bottom-anchored coordinates (y=0 is the bottom)
    const blueprintVertices = [
      { x: 0, y: 0 },
      { x: 500, y: 800 },
      { x: 600, y: 400 },
      { x: 900, y: 1000 },
      { x: 1300, y: 0 },
    ];

    // Invert the Y-axis to match Phaser's native top-left coordinate system
    const nativePoints = blueprintVertices.map(v => new Phaser.Math.Vector2(v.x, height - v.y));

    // Draw the dark silhouette ridge line
    g.fillStyle(0x222222, 1);
    g.beginPath();
    
    // Move to the first point and trace the ridge vertices
    if (nativePoints.length > 0) {
      g.moveTo(nativePoints[0].x, nativePoints[0].y);
      for (let i = 1; i < nativePoints.length; i++) {
        g.lineTo(nativePoints[i].x, nativePoints[i].y);
      }
    }
    
    g.closePath();
    g.fillPath();

    g.generateTexture('mountain_range', width, height);
  }

  protected generateMountainRange2(): void {
    if (this.textures.exists('mountain_range2')) return;

    const width = 2400;
    const height = 1600;
    const g = this.make.graphics({ x: 0, y: 0 });

    // Define vertices using bottom-anchored coordinates (y=0 is the bottom)
    const blueprintVertices = [
      { x: 0, y: 0 },
      { x: 300, y: 200 },
      { x: 600, y: 300 },
      { x: 900, y: 400 },
      { x: 1200, y: 0 },
      { x: 1500, y: 300 },
      { x: 1800, y: 400 },
      { x: 2100, y: 500 },
      { x: 2400, y: 0 },
    ];

    // Invert the Y-axis to match Phaser's native top-left coordinate system
    const nativePoints = blueprintVertices.map(v => new Phaser.Math.Vector2(v.x, height - v.y));

    // Draw the dark silhouette ridge line
    g.fillStyle(0x444444, 1);
    g.beginPath();
    
    // Move to the first point and trace the ridge vertices
    if (nativePoints.length > 0) {
      g.moveTo(nativePoints[0].x, nativePoints[0].y);
      for (let i = 1; i < nativePoints.length; i++) {
        g.lineTo(nativePoints[i].x, nativePoints[i].y);
      }
    }
    
    g.closePath();
    g.fillPath();

    g.generateTexture('mountain_range2', width, height);
  }

  protected fail() {
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.fail();
    this.time.delayedCall(3000, function () {
      this.successCount = 0;
      this.scene.restart();
      overlayScene.restart();
    }, null, this);
  }

  protected win() {
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.win();
    this.time.delayedCall(7000, function () {
      this.successCount = 0;
      this.scene.restart();
      overlayScene.restart();
    }, null, this);
  }

  create(): void {
    this.scene.bringToTop("GameSceneOverlay");
    this.controllerScene = (<ControllerScene>this.scene.get('ControllerScene'));

    // Layer 1: Background starfield
    this.background = this.add.tileSprite(-1000, -500, 3500, 1500, 'background');
    this.background.setOrigin(0, 0);
    this.background.setDepth(-3);

    // Layer 2: Background mountain range
    this.generateMountainRange();
    this.mountainRange = this.add.tileSprite(-1000, -500, 3500, 1500, 'mountain_range');
    this.mountainRange.setOrigin(0, 0);
    this.mountainRange.setDepth(-2);

    // Layer 3: Midground mountain range 2
    this.generateMountainRange2();
    this.mountainRange2 = this.add.tileSprite(-1000, -500, 3500, 1500, 'mountain_range2');
    this.mountainRange2.setOrigin(0, 0);
    this.mountainRange2.setDepth(-1);

    // Layer 4: Player Lander & Map structures (Grid removed entirely from baseline)
    this.setupLander();

    this.matter.world.setBounds(0, 0, 3000, 1000);

    this.matter.world.on('collisionstart', (event: any, bodyA: any, bodyB: any) => {
      if (!bodyA || !bodyB || !bodyA.gameObject || !bodyB.gameObject) {
        this.fail();
        return;
      }

      var lander = null;
      var otherBody = null;

      if (bodyA.gameObject.name === "lander") {
        lander = bodyA;
        otherBody = bodyB;
      } else if (bodyB.gameObject.name === "lander") {
        lander = bodyB;
        otherBody = bodyA;
      }

      if (lander !== null && otherBody !== null) {
        if (otherBody.gameObject.name && otherBody.gameObject.name !== "lander" && otherBody.gameObject.name !== "thrust") {
          var absAttitude = Math.abs(lander.gameObject.angle);
          var vx = lander.gameObject.body.velocity.x;
          var vy = lander.gameObject.body.velocity.y;

          const isAngleSafe = absAttitude <= BaseGameScene.MAX_SAFE_ANGLE;
          const isHorizontalSafe = Math.abs(vx) <= BaseGameScene.MAX_SAFE_HORIZONTAL_SPEED;
          const isVerticalSafe = Math.abs(vy) <= BaseGameScene.MAX_SAFE_VERTICAL_SPEED;

          if (!isAngleSafe || !isHorizontalSafe || !isVerticalSafe) {
            this.fail();
          } else {
            lander.gameObject.angle = 0;
            this.lander.setVelocity(0, 0);
            if (otherBody.gameObject.landed !== true) {
              otherBody.gameObject.landed = true;
              otherBody.gameObject.setFillStyle(0x00aa00);
              this.successCount += 1;
              if (this.successCount === this.noOfSuccessesPossible) {
                this.win();
              }
            }
          }
        } else {
          console.log("💥 CRASH: Touched raw mountain terrain, not a landing pad.");
          this.fail();
        }
      }
    }, this);

    this.matter.world.setGravity(0, BaseGameScene.GRAVITY_Y);
    this.noOfSuccessesPossible = WorldCreator.createWorld(this);
  }

  update(time: number, delta: number): void {
    if (this.controllerScene.thrusting == true) {
      this.thrust.visible = true;
      var radians = Phaser.Math.DegToRad(this.lander.angle);

      var forceX: number = BaseGameScene.THRUST_FORCE * Math.sin(radians);
      var forceY: number = -BaseGameScene.THRUST_FORCE * Math.cos(radians);

      this.matter.body.applyForce(this.lander.body, this.lander.body.position, {
        x: forceX,
        y: forceY
      });
    } else {
      this.thrust.visible = false;
    }

    this.lander.setAngularVelocity(0);
    if (this.controllerScene.rotatingLeft == true) {
      this.lander.setAngularVelocity(-BaseGameScene.ROTATION_SPEED);
    }
    if (this.controllerScene.rotatingRight == true) {
      this.lander.setAngularVelocity(BaseGameScene.ROTATION_SPEED);
    }

    this.thrust.x = this.lander.x;
    this.thrust.y = this.lander.y;
    this.thrust.angle = this.lander.angle;

    if (this.background) {
      this.background.tilePositionX = this.cameras.main.scrollX * 0.01;
      this.background.tilePositionY = this.cameras.main.scrollY * 0.01;
    }

    if (this.mountainRange) {
      this.mountainRange.tilePositionX = this.cameras.main.scrollX * 0.05;
      this.mountainRange.tilePositionY = this.cameras.main.scrollY * 0.05;
    }
    if (this.mountainRange2) {
      this.mountainRange2.tilePositionX = this.cameras.main.scrollX * 0.07;
      this.mountainRange2.tilePositionY = this.cameras.main.scrollY * 0.07;
    }
  }
}