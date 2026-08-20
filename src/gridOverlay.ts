import "phaser";

/**
 * Draws the measurement grid system restricted cleanly to the playable map boundaries.
 * Adds green coloration and labels for ALL 100px increments (both major and minor).
 */

export function drawMeasurementGrid(
  scene: Phaser.Scene,
  worldWidth: number,
  worldMaxY: number,
  minX: number = 0,
  bleedRight: number = 0
): void {
  const gridGraphics = scene.add.graphics();
  gridGraphics.setDepth(10);

  const worldMinY = 0;
  const maxX = worldWidth + bleedRight;

  // 1. Horizontal Grid Lines
  for (let y = worldMinY; y <= worldMaxY; y += 100) {
    const isMajor = y % 500 === 0;
    const thickness = isMajor ? 2 : 1;
    const alpha = isMajor ? 0.4 : 0.15;

    gridGraphics.lineStyle(thickness, 0x00ff00, alpha);
    gridGraphics.lineBetween(minX, y, maxX, y);

    if (y > worldMinY) {
      scene.add
        .text(minX + 15, y - 18, `Y: ${y}`, {
          fontFamily: "Courier",
          fontSize: isMajor ? "14px" : "11px",
          color: "#00ff00",
        })
        .setDepth(1)
        .setAlpha(isMajor ? 0.6 : 0.35);
    }
  }

  // 2. Vertical Grid Lines (With Bleed Zone Color Differentiation)
  for (let x = minX; x <= maxX; x += 100) {
    const isMajor = x % 500 === 0;
    const isOutOfBounds = x < 0; // Check if coordinate is in the left bleed zone

    const thickness = isMajor ? 2 : 1;

    // Playable area = Green (0x00ff00), Out-of-bounds = Red/Crimson (0xff3333)
    const lineColor = isOutOfBounds ? 0xff3333 : 0x00ff00;
    const alpha = isOutOfBounds
      ? isMajor
        ? 0.3
        : 0.1 // Muted opacity for bleed zone
      : isMajor
        ? 0.4
        : 0.15;

    gridGraphics.lineStyle(thickness, lineColor, alpha);
    gridGraphics.lineBetween(x, worldMinY, x, worldMaxY);

    if (x > minX && x < maxX) {
      const textPaddingY = isMajor ? 15 : 35;
      const textColor = isOutOfBounds ? "#ff4444" : "#00ff00";
      const textAlpha = isOutOfBounds ? (isMajor ? 0.4 : 0.25) : isMajor ? 0.6 : 0.35;

      scene.add
        .text(x + 8, worldMinY + textPaddingY, `X: ${x}`, {
          fontFamily: "Courier",
          fontSize: isMajor ? "14px" : "11px",
          color: textColor,
        })
        .setDepth(1)
        .setAlpha(textAlpha);
    }
  }
}
