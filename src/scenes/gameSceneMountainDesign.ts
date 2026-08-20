import { MountainBlueprint } from "../mountainTypes";
import { WorldCreator } from "../worldCreator";
import { getLevelFromUrl } from "../levelUtil";
import { LevelBlueprint } from "../levelBlueprints";

export class GameSceneMountainDesign extends Phaser.Scene {
  private static readonly STORAGE_KEY = "selectedMountainName";
  private selectedIndex: number = 0;
  private mountainDatabase: MountainBlueprint[] = [];
  private titleText!: Phaser.GameObjects.Text;
  private level!: LevelBlueprint;
  private levelIndex!: number;

  constructor() {
    super({ key: "MountainDesignerScene" });
  }

  init(data?: { selectedIndex?: number }): void {
    const { level, index } = getLevelFromUrl();
    this.level = level;
    this.levelIndex = index;
    this.mountainDatabase = this.level.mountains;

    if (data && data.selectedIndex !== undefined) {
      this.selectedIndex = data.selectedIndex;
    } else {
      this.selectedIndex = this.getSavedMountainIndex();
    }

    if (this.selectedIndex >= this.mountainDatabase.length) {
      this.selectedIndex = 0;
    }
  }

  create(): void {
    const activeBlueprint = this.mountainDatabase[this.selectedIndex];
    if (!activeBlueprint) return;

    const worldWidth = activeBlueprint.width;
    const worldHeight = this.level.worldHeight;
    const viewWidth = this.scale.width;
    const viewHeight = this.scale.height;

    // 1. Center camera horizontally on the single mountain
    this.cameras.main.centerOn(worldWidth / 2, worldHeight - viewHeight / 2 + 100);

    // 2. Render ONLY the single active mountain
    WorldCreator.createWorld(this, [activeBlueprint], worldHeight);

    // 3. Draw measurement grid for the single mountain width
    this.drawMeasurementGrid(Math.max(worldWidth, viewWidth), worldHeight);

    // 4. Save active selection
    this.saveMountainSelection(activeBlueprint.name);

    // 5. HUD text pinned to viewport
    this.titleText = this.add
      .text(
        20,
        20,
        `${this.level.id} - Mountain ${this.selectedIndex + 1}/${this.mountainDatabase.length} - ${activeBlueprint.name}`,
        { fontSize: "20px", color: "#00ff00", fontStyle: "bold" }
      )
      .setScrollFactor(0)
      .setDepth(20);

    this.add
      .text(20, 50, "Use LEFT / RIGHT arrow keys or Click to cycle blueprints", {
        fontSize: "14px",
        color: "#aaaaaa",
      })
      .setScrollFactor(0)
      .setDepth(20);

    // 6. Cycling Listeners
    if (this.input && this.input.keyboard) {
      this.input.keyboard.on("keydown-LEFT", () => this.cycleMountain(-1));
      this.input.keyboard.on("keydown-RIGHT", () => this.cycleMountain(1));
    }

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const event = pointer.event as MouseEvent;
      const delta = event.ctrlKey || event.metaKey ? -1 : 1;
      this.cycleMountain(delta);
    });
  }

  /**
   * Draws a measurement grid where ground level (world Y=1000) displays as Y:0
   * and positive Y values increase upward matching MountainBlueprint coordinates.
   */
  private drawMeasurementGrid(gridWidth: number, groundY: number): void {
    const gridGraphics = this.add.graphics();
    gridGraphics.setDepth(10);
    gridGraphics.lineStyle(1, 0x00ff00, 0.3);

    const step = 100;

    // Vertical Lines & X Labels
    for (let x = 0; x <= gridWidth; x += step) {
      gridGraphics.lineBetween(x, 0, x, groundY);

      // Shift X:0 up higher (groundY - 32) so X sits above Y:0 at the baseline
      const labelYOffset = x === 0 ? 32 : 20;

      this.add
        .text(x + 5, groundY - labelYOffset, `X:${x}`, { fontSize: "12px", color: "#00ff00" })
        .setAlpha(0.6)
        .setDepth(10);
    }

    // Horizontal Lines & Inverted Y Labels (worldY = 1000 becomes Y:0)
    for (let worldY = groundY; worldY >= 0; worldY -= step) {
      gridGraphics.lineBetween(0, worldY, gridWidth, worldY);
      const blueprintY = groundY - worldY;
      this.add
        .text(5, worldY - 15, `Y:${blueprintY}`, { fontSize: "12px", color: "#00ff00" })
        .setAlpha(0.6)
        .setDepth(10);
    }
  }

  private cycleMountain(direction: number): void {
    if (this.mountainDatabase.length === 0) return;
    const total = this.mountainDatabase.length;
    const nextIndex = (this.selectedIndex + direction + total) % total;
    this.scene.restart({ selectedIndex: nextIndex });
  }

  private getSavedMountainIndex(): number {
    const savedName = localStorage.getItem(GameSceneMountainDesign.STORAGE_KEY);
    if (savedName) {
      const foundIdx = this.mountainDatabase.findIndex((m) => m.name === savedName);
      if (foundIdx !== -1) return foundIdx;
    }
    return 0;
  }

  private saveMountainSelection(name: string): void {
    localStorage.setItem(GameSceneMountainDesign.STORAGE_KEY, name);
  }
}
