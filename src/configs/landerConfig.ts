/**
 * Developer flag to toggle the local reference grid overlay.
 */
export const SHOW_LANDER_GRID = false;

/**
 * Raw local coordinates defining the Lander hull.
 */
export const LANDER_VERTICES = [
  -20, 20, // Left-bottom wing tip
  0, 10,   // Bottom-middle indent
  20, 20,  // Right-bottom wing tip
  0, -20   // Top nose cone tip
];

/**
 * Raw local coordinates defining the Thrust flame engine output.
 */
const Y_SHIFT = 8;
export const THRUST_VERTICES = [
  0, 20 + Y_SHIFT,  // Left edge meeting the left wing
  20, 30 + Y_SHIFT, // Bottom tip of the flame blowing downwards
  40, 20 + Y_SHIFT, // Right edge meeting the right wing
  20, 10 + Y_SHIFT  // Top tip of the flame tucked inside the ship indent
];

/**
 * Controls the precise composition rendering sequence order.
 * Array items can be re-arranged safely to re-order layer drawing prioritization.
 */
export const LANDER_RENDER_ORDER: ('grid' | 'lander' | 'thrust')[] = ['grid', 'lander', 'thrust'];