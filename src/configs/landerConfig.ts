/**
 * Developer flag to toggle the local reference grid overlay.
 */
export const SHOW_LANDER_GRID = false;

/**
 * Raw local coordinates defining the Lander hull.
 */
const LANDER_Y_SHIFT = -3;
export const LANDER_VERTICES = [
  -20, 20 + LANDER_Y_SHIFT, // Left-bottom wing tip
  0, 10 + LANDER_Y_SHIFT,   // Bottom-middle indent
  20, 20 + LANDER_Y_SHIFT,  // Right-bottom wing tip
  0, -20 + LANDER_Y_SHIFT   // Top nose cone tip
];

/**
 * Raw local coordinates defining the Thrust flame engine output.
 */
const THRUST_Y_SHIFT = -2;
export const THRUST_VERTICES = [
  -20, 20 + THRUST_Y_SHIFT, // Left edge meeting the left wing
  0, 30 + THRUST_Y_SHIFT, // Bottom tip of the flame blowing downwards
  20, 20 + THRUST_Y_SHIFT, // Right edge meeting the right wing
  0, 10 + THRUST_Y_SHIFT  // Top tip of the flame tucked inside the ship indent
];

/**
 * Texture generation settings for crisp rendering.
 */
export const LANDER_TEXTURE_KEY = 'lander_texture';
export const THRUST_TEXTURE_KEY = 'thrust_texture';

export const LANDER_RENDER_ORDER: ('grid' | 'lander' | 'thrust')[] = ['grid', 'lander', 'thrust'];