import { MOUNTAIN_DATABASE } from "../mountains/MountainBlueprints";
import { Mountain } from "../mountains/Mountain";

export class MountainDesignerScene extends Phaser.Scene {
    private currentIdx: number = 0;
    private currentMountainObjects: Phaser.GameObjects.GameObject[] = [];
    private titleText: Phaser.GameObjects.Text;
    private gridGraphics: Phaser.GameObjects.Graphics;
    private gridLabels: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({ key: "MountainDesignerScene" });
    }

    create(): void {
        const width = this.scale.width;
        const height = this.scale.height;

        this.drawMeasurementGrid();

        this.titleText = this.add.text(width / 2, 40, '', { fontSize: '24px', color: '#00ff00', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(width / 2, height - 40, "Press LEFT / RIGHT arrows to cycle mountains", { fontSize: '18px', color: '#aaaaaa' }).setOrigin(0.5);

        this.loadMountain();

        this.input.keyboard.on('keydown-LEFT', () => {
            this.currentIdx = (this.currentIdx - 1 + MOUNTAIN_DATABASE.length) % MOUNTAIN_DATABASE.length;
            this.loadMountain();
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
            this.currentIdx = (this.currentIdx + 1) % MOUNTAIN_DATABASE.length;
            this.loadMountain();
        });
    }

    /**
     * Draws a measurement grid system shifted up by 100px 
     * to match the mountain's ground level (Y:0).
     */
    private drawMeasurementGrid(): void {

        if (this.gridGraphics) {
            this.gridGraphics.destroy();
        }

        this.gridLabels.forEach(label => { if (label) label.destroy(); });
        this.gridLabels = [];

        this.gridGraphics = this.add.graphics();
        this.gridGraphics.setDepth(10);

        const viewWidth = this.scale.width;
        const viewHeight = this.scale.height;
        const step = 100;
        const groundOffset = 100; // Matches targetY in loadMountain()

        this.gridGraphics.lineStyle(2, 0x00ff00, 0.3);

        // Vertical Lines & X Labels
        for (let x = 0; x <= viewWidth; x += step) {
            this.gridGraphics.lineBetween(x, 0, x, viewHeight);
            const xLabel = this.add.text(x + 5, 5, `X:${x}`, { fontSize: '14px', color: '#00ff00' }).setAlpha(0.6).setDepth(10);
            this.gridLabels.push(xLabel);
        }

        // Horizontal Lines & Y Labels
        // Drawing lines so Y=0 is at (viewHeight - groundOffset)
        for (let y = 0; y <= viewHeight; y += step) {
            const screenY = (viewHeight - groundOffset) - y;

            // Draw only within visible bounds
            if (screenY <= viewHeight) {
                this.gridGraphics.lineBetween(0, screenY, viewWidth, screenY);
                const yLabel = this.add.text(5, screenY - 15, `Y:${y}`, { fontSize: '14px', color: '#00ff00' }).setAlpha(0.6).setDepth(10);
                this.gridLabels.push(yLabel);
            }
        }
    }

    private loadMountain(): void {
        this.currentMountainObjects.forEach(obj => {
            if (obj) {
                if ((obj as any).body) { this.matter.world.remove((obj as any).body); }
                if (typeof obj.destroy === 'function') { obj.destroy(); }
            }
        });
        this.currentMountainObjects = [];

        const blueprint = MOUNTAIN_DATABASE[this.currentIdx];
        const mountainInstance = new Mountain(blueprint);

        const targetX = (this.scale.width / 2) - (blueprint.width / 2);
        const targetY = this.scale.height - 100; // Ground level reference

        this.currentMountainObjects = mountainInstance.spawn(this, targetX, targetY);

        this.titleText.setText(`Designing Mountain [${this.currentIdx + 1}/${MOUNTAIN_DATABASE.length}]: ${blueprint.name}`);
    }
}