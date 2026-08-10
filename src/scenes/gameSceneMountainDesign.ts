import { MOUNTAIN_DATABASE, MountainBlueprint } from "../mountainBlueprints";
import { WorldCreator } from "../worldCreator";

export class GameSceneMountainDesign extends Phaser.Scene {
  private static readonly STORAGE_KEY = 'selectedMountainName';
  private selectedIndex: number = 0;
  private mountainDatabase: MountainBlueprint[] = MOUNTAIN_DATABASE;
  private titleText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "MountainDesignerScene" });
  }

  init(data?: { selectedIndex?: number }): void {
    if (data && data.selectedIndex !== undefined) {
      this.selectedIndex = data.selectedIndex;
    } else {
      this.selectedIndex = this.getSavedMountainIndex();
    }
  }

  create(): void {
    const activeBlueprint = this.mountainDatabase[this.selectedIndex];
    const worldWidth = activeBlueprint.width;
    const worldHeight = 1000;

    const viewWidth = this.scale.width;
    const viewHeight = this.scale.height;

    // 1. Center camera horizontally on the mountain and align ground Y=1000 near the bottom of viewport
    this.cameras.main.centerOn(
      worldWidth / 2,
      worldHeight - (viewHeight / 2) + 100
    );

    // 2. Draw blueprint-oriented measurement grid (Y=0 at ground, increasing upward)
    this.drawBlueprintGrid(Math.max(worldWidth, viewWidth), worldHeight);

    // 3. Render single mountain via WorldCreator starting at X = 0, Y = 1000
    WorldCreator.createWorld(this, [activeBlueprint], worldHeight);

    // 4. On-screen labels pinned to viewport
    this.titleText = this.add.text(
      20,
      20,
      `Mountain [${this.selectedIndex + 1}/${this.mountainDatabase.length}]: ${activeBlueprint.name}`,
      { fontSize: '20px', color: '#00ff00', fontStyle: 'bold' }
    ).setScrollFactor(0).setDepth(20);

    this.add.text(
      20,
      50,
      "Use LEFT / RIGHT arrow keys or Click to cycle blueprints",
      { fontSize: '14px', color: '#aaaaaa' }
    ).setScrollFactor(0).setDepth(20);

    // 5. Save active selection to localStorage
    this.saveMountainSelection(activeBlueprint.name);

    // 6. Navigation Listeners
    if (this.input && this.input.keyboard) {
      this.input.keyboard.on("keydown-LEFT", () => this.cycleMountain(-1));
      this.input.keyboard.on("keydown-RIGHT", () => this.cycleMountain(1));
    }

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const event = pointer.event as MouseEvent;
      const delta = (event.ctrlKey || event.metaKey) ? -1 : 1;
      this.cycleMountain(delta);
    });
  }

  /**
   * Draws a measurement grid where ground level (world Y=1000) displays as Y:0 
   * and positive Y values increase upward matching MountainBlueprint coordinates.
   */
  private drawBlueprintGrid(gridWidth: number, groundY: number): void {
    const gridGraphics = this.add.graphics();
    gridGraphics.setDepth(10);
    gridGraphics.lineStyle(1, 0x00ff00, 0.3);

    const step = 100;

    // Vertical Lines & X Labels
    for (let x = 0; x <= gridWidth; x += step) {
      gridGraphics.lineBetween(x, 0, x, groundY);

      // Shift X:0 up higher (groundY - 32) so X sits above Y:0 at the baseline
      const labelYOffset = x === 0 ? 32 : 20;

      this.add.text(x + 5, groundY - labelYOffset, `X:${x}`, { fontSize: '12px', color: '#00ff00' })
        .setAlpha(0.6)
        .setDepth(10);
    }

    // Horizontal Lines & Inverted Y Labels (worldY = 1000 becomes Y:0)
    for (let worldY = groundY; worldY >= 0; worldY -= step) {
      gridGraphics.lineBetween(0, worldY, gridWidth, worldY);
      const blueprintY = groundY - worldY;
      this.add.text(5, worldY - 15, `Y:${blueprintY}`, { fontSize: '12px', color: '#00ff00' })
        .setAlpha(0.6)
        .setDepth(10);
    }
  }

  private cycleMountain(direction: number): void {
    const total = this.mountainDatabase.length;
    const nextIndex = (this.selectedIndex + direction + total) % total;
    this.scene.restart({ selectedIndex: nextIndex });
  }

  private getSavedMountainIndex(): number {
    const savedName = localStorage.getItem(GameSceneMountainDesign.STORAGE_KEY);
    if (savedName) {
      const foundIdx = this.mountainDatabase.findIndex(m => m.name === savedName);
      if (foundIdx !== -1) return foundIdx;
    }
    return 0;
  }

  private saveMountainSelection(name: string): void {
    localStorage.setItem(GameSceneMountainDesign.STORAGE_KEY, name);
  }
}