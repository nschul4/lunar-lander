import { MOUNTAIN_DATABASE } from "../mountainBlueprints";
import { Mountain } from "../mountain";

export class GameSceneMountainDesign extends Phaser.Scene {
    private static readonly STORAGE_KEY = 'selectedMountainName';
    private currentIdx: number = 0;
    private currentMountainObjects: Phaser.GameObjects.GameObject[] = [];
    private titleText!: Phaser.GameObjects.Text;
    private gridGraphics!: Phaser.GameObjects.Graphics;
    private gridLabels: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({ key: "MountainDesignerScene" });
    }

    create(): void {
        const width = this.scale.width;
        const height = this.scale.height;

        // Restore saved selection or default to index 0
        this.currentIdx = this.getSavedMountainIndex();

        this.drawMeasurementGrid();

        this.titleText = this.add.text(width / 10, 40, '', { fontSize: '24px', color: '#00ff00', fontStyle: 'bold' }).setOrigin(0);
        this.add.text(width / 2, height - 40, "Press LEFT/RIGHT arrows or Click/Ctrl-Click to cycle mountains", { fontSize: '18px', color: '#aaaaaa' }).setOrigin(0.5);

        this.loadMountain();

        // Keyboard Navigation
        this.input.keyboard!.on('keydown-LEFT', () => {
            this.stepMountain(-1);
        });

        this.input.keyboard!.on('keydown-RIGHT', () => {
            this.stepMountain(1);
        });

        // Pointer / Click Navigation
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const event = pointer.event as MouseEvent;
            // Ctrl-click or Cmd-click (macOS) moves backward (-1), regular click moves forward (+1)
            const delta = (event.ctrlKey || event.metaKey) ? -1 : 1;
            this.stepMountain(delta);
        });
    }

    private stepMountain(delta: number): void {
        this.currentIdx = (this.currentIdx + delta + MOUNTAIN_DATABASE.length) % MOUNTAIN_DATABASE.length;
        this.saveMountainSelection();
        this.loadMountain();
    }

    /**
     * Retrieves the stored mountain name from localStorage and finds its index.
     * Fallbacks gracefully to index 0 if not found or invalid.
     */
    private getSavedMountainIndex(): number {
        const savedName = localStorage.getItem(GameSceneMountainDesign.STORAGE_KEY);
        if (savedName) {
            const foundIdx = MOUNTAIN_DATABASE.findIndex(m => m.name === savedName);
            if (foundIdx !== -1) {
                return foundIdx;
            }
        }
        return 0;
    }

    /**
     * Persists the currently viewed mountain's name to localStorage.
     */
    private saveMountainSelection(): void {
        const currentMountain = MOUNTAIN_DATABASE[this.currentIdx];
        if (currentMountain) {
            localStorage.setItem(GameSceneMountainDesign.STORAGE_KEY, currentMountain.name);
        }
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

        this.titleText.setText(`Mountain [${this.currentIdx + 1}/${MOUNTAIN_DATABASE.length}]: ${blueprint.name}`);
    }
}