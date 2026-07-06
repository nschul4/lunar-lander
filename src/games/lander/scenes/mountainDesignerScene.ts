import { MOUNTAIN_DATABASE } from "../mountains/MountainBlueprints";
import { Mountain } from "../mountains/Mountain";

export class MountainDesignerScene extends Phaser.Scene {
private currentIdx: number = 0;
    private currentMountainObjects: (Phaser.GameObjects.GameObject | Phaser.GameObjects.Group | Phaser.GameObjects.Layer)[] = [];
    private titleText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "MountainDesignerScene" });
    }

    create(): void {
        const width = this.scale.width;
        const height = this.scale.height;

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

private loadMountain(): void {
        // Clean up previous graphics/text/bodies from the scene
        this.currentMountainObjects.forEach(obj => {
            if (obj && typeof obj.destroy === 'function') {
                obj.destroy();
            }
        });
        // Fix: Use the accurate compound type Phaser expects
        this.currentMountainObjects = [];

        const blueprint = MOUNTAIN_DATABASE[this.currentIdx];
        const mountainInstance = new Mountain(blueprint);

        // Center the mountain in the viewport dynamically
        const targetX = (this.scale.width / 2) - (blueprint.width / 2);
        const targetY = this.scale.height - 100;

        // Hook into scene creation to track what gets spawned
        const originalAdd = this.add.existing.bind(this.add);
        const trackedObjects: (Phaser.GameObjects.GameObject | Phaser.GameObjects.Group | Phaser.GameObjects.Layer)[] = [];
        
        this.add.existing = (obj) => {
            trackedObjects.push(obj);
            return originalAdd(obj);
        };

        // Spawn it
        mountainInstance.spawn(this, targetX, targetY);

        // Restore default factory behavior and record objects for later destruction
        delete (this.add as any).existing;
        this.currentMountainObjects = trackedObjects;

        // Update display text
        this.titleText.setText(`Designing Mountain [${this.currentIdx + 1}/${MOUNTAIN_DATABASE.length}]: ${blueprint.name}`);
    }
}
