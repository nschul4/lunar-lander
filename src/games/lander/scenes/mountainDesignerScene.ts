import { MOUNTAIN_DATABASE } from "../mountains/MountainBlueprints";
import { Mountain } from "../mountains/Mountain";

export class MountainDesignerScene extends Phaser.Scene {
    private currentIdx: number = 0;
    private currentMountainObjects: Phaser.GameObjects.GameObject[] = [];
    private titleText: Phaser.GameObjects.Text;
    private gridGraphics: Phaser.GameObjects.Graphics;
    private gridLabels: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({ key: "GameScene" });
    }

    create(): void {
        const width = this.scale.width;
        const height = this.scale.height;

        // Render the measurement grid system layer
        this.drawMeasurementGrid();

        // Render instruction text
        this.titleText = this.add.text(width / 2, 40, '', {
            fontSize: '24px',
            color: '#00ff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(width / 2, height - 40, "Press LEFT / RIGHT arrows to cycle mountains", {
            fontSize: '18px',
            color: '#aaaaaa'
        }).setOrigin(0.5);

        // Render the initial mountain
        this.loadMountain();

        // Keyboard controls to cycle
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
     * Draws a localized measurement grid system forced on top of the terrain and safely manages text memory lifetime
     */
    private drawMeasurementGrid(): void {
        // Safe lifecycle cleanup: destroy existing grid graphics and text labels if this method or create() runs again
        if (this.gridGraphics) {
            this.gridGraphics.destroy();
        }
        this.gridLabels.forEach(label => {
            if (label) label.destroy();
        });
        this.gridLabels = [];

        this.gridGraphics = this.add.graphics();
        
        // Force the grid lines to a high depth layer so mountains spawn underneath them
        this.gridGraphics.setDepth(10); 

        const viewWidth = this.scale.width;
        const viewHeight = this.scale.height;
        const step = 100;

        this.gridGraphics.lineStyle(3, 0x00ff00, 0.4);

        // Vertical Lines & X Labels
        for (let x = 0; x <= viewWidth; x += step) {
            this.gridGraphics.lineBetween(x, 0, x, viewHeight);

            const xLabel = this.add.text(x + 10, 10, `X:${x}`, {
                fontSize: '24px',
                color: '#00ff00',
                fontStyle: 'bold'
            }).setAlpha(0.6).setDepth(10);
            
            this.gridLabels.push(xLabel);
        }

        // Horizontal Lines & Y Labels
        for (let y = 0; y <= viewHeight; y += step) {
            this.gridGraphics.lineBetween(0, y, viewWidth, y);
            
            const yLabel = this.add.text(10, y + 10, `Y:${y}`, {
                fontSize: '24px',
                color: '#00ff00',
                fontStyle: 'bold'
            }).setAlpha(0.6).setDepth(10);

            this.gridLabels.push(yLabel);
        }
    }

    private loadMountain(): void {
        // Clean up previous elements and explicitly remove their Matter physics bodies from the world simulation
        this.currentMountainObjects.forEach(obj => {
            if (obj) {
                if (obj.body) {
                    this.matter.world.remove(obj.body);
                }
                if (typeof obj.destroy === 'function') {
                    obj.destroy();
                }
            }
        });
        
        this.currentMountainObjects = [];

        const blueprint = MOUNTAIN_DATABASE[this.currentIdx];
        const mountainInstance = new Mountain(blueprint);

        // Center the mountain in the viewport dynamically
        const targetX = (this.scale.width / 2) - (blueprint.width / 2);
        const targetY = this.scale.height - 100;

        // Spawns mountain at default depth (0), safely underneath our grid (10)
        this.currentMountainObjects = mountainInstance.spawn(this, targetX, targetY);

        // Update display text
        this.titleText.setText(`Designing Mountain [${this.currentIdx + 1}/${MOUNTAIN_DATABASE.length}]: ${blueprint.name}`);
    }
}