import "phaser";

/**
 * Draws the measurement grid system restricted cleanly to the playable map boundaries.
 * Adds green coloration and labels for ALL 100px increments (both major and minor).
 */
export function drawMeasurementGrid(scene: Phaser.Scene): void {
  const gridGraphics = scene.add.graphics();
  
  // Placed exactly between background layers and foreground terrain
  gridGraphics.setDepth(10);

  const worldWidth = 3000;
  const worldMinY = 0;
  const worldMaxY = 1000;

  // 1. Draw ALL Horizontal Grid Lines (Every 100px)
  for (let y = worldMinY; y <= worldMaxY; y += 100) {
    // Determine style: Major lines (500px) are thicker and more opaque
    const isMajor = y % 500 === 0;
    const thickness = isMajor ? 2 : 1;
    const alpha = isMajor ? 0.4 : 0.15;
    
    gridGraphics.lineStyle(thickness, 0x00ff00, alpha);
    gridGraphics.lineBetween(0, y, worldWidth, y);

    // Render text label for EVERY horizontal line
    if (y > worldMinY) {
      scene.add.text(15, y - 18, `Y: ${y}`, {
        fontFamily: 'Courier',
        fontSize: isMajor ? '14px' : '11px',
        color: '#00ff00'
      }).setDepth(1).setAlpha(isMajor ? 0.6 : 0.35);
    }
  }

  // 2. Draw ALL Vertical Grid Lines (Every 100px)
  for (let x = 0; x <= worldWidth; x += 100) {
    const isMajor = x % 500 === 0;
    const thickness = isMajor ? 2 : 1;
    const alpha = isMajor ? 0.4 : 0.15;

    gridGraphics.lineStyle(thickness, 0x00ff00, alpha);
    gridGraphics.lineBetween(x, worldMinY, x, worldMaxY);

    // Render text label for EVERY vertical line
    if (x > 0 && x < worldWidth) {
      // Stagger minor line text down slightly so it doesn't overlap major headers
      const textPaddingY = isMajor ? 15 : 35;
      
      scene.add.text(x + 8, worldMinY + textPaddingY, `X: ${x}`, {
        fontFamily: 'Courier',
        fontSize: isMajor ? '14px' : '11px',
        color: '#00ff00'
      }).setDepth(1).setAlpha(isMajor ? 0.6 : 0.35);
    }
  }
}