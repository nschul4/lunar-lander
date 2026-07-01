export class MoveLine {

    private scene: Phaser.Scene;
    private gameObject: Phaser.GameObjects.GameObject;
    private fromX: number;
    private fromY: number;
    private tweenTarget = { t: 0, pointVector: new Phaser.Math.Vector2() };
    private line: Phaser.Curves.Line = null;
    private active: boolean = false;
    private cancelTime: number = 3000;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create(
        gameObject: Phaser.GameObjects.GameObject,
        fromX: number, fromY: number,
        toX: number, toY: number,
    ) {
        this.gameObject = gameObject;
        this.fromX = fromX;
        this.fromY = fromY;

        var tweenBuilderConfig
            // TODO: why is TweenBuilderConfig not visible?
            // : Phaser.Types.Tweens.TweenBuilderConfig
            : any
            = {
            targets: this.tweenTarget,
            t: 1,
            ease: 'Linear',
            duration: 250,
            repeat: 0
        };
        this.scene.tweens.add(tweenBuilderConfig);

        var fromV = new Phaser.Math.Vector2(fromX, fromY);
        var toV = new Phaser.Math.Vector2(toX, toY);
        this.line = new Phaser.Curves.Line(fromV, toV);
        this.active = true;
    }

    update(): void {
        if (this.active) {
            this.line.getPoint(
                this.tweenTarget.t,
                this.tweenTarget.pointVector
            );
            // TODO: find out why the cast here?
            (<any>this.gameObject).setPosition(
                this.tweenTarget.pointVector.x, this.tweenTarget.pointVector.y,
            );
            if (this.tweenTarget.t == 1) {
                this.active = true;
            }
        }
    }

    cancel(): void {
        this.active = false;
        this.scene.time.delayedCall(
            this.cancelTime,
            function () {
                // TODO: find out why the cast here?
                (<any>this.gameObject).setPosition(
                    this.fromX, this.fromY
                );
            },
            null,
            this
        );
    }
}
