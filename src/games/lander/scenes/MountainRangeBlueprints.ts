export interface MountainRangeBlueprint {
  key: string;
  textureWidth: number;
  textureHeight: number;
  color: number;
  vertices: { x: number; y: number }[];
  tileX: number;
  tileY: number;
  tileWidth: number;
  tileHeight: number;
  depth: number;
  parallaxFactor: number;
}

export const BACKGROUND_RANGES_DATABASE: MountainRangeBlueprint[] = [
  {
    key: 'mountain_range_far',
    textureWidth: 1300,
    textureHeight: 1600,
    color: 0x222222,
    tileX: -100,
    tileY: -500,
    tileWidth: 3100,
    tileHeight: 1500,
    depth: -2,
    parallaxFactor: 0.05,
    vertices: [
      { x: 0, y: 0 }, { x: 500, y: 700 }, { x: 600, y: 400 }, { x: 900, y: 800 }, { x: 1300, y: 0 }
    ]
  },
  {
    key: 'mountain_range_mid',
    textureWidth: 2530,
    textureHeight: 1600,
    color: 0x333333,
    tileX: -100,
    tileY: -500,
    tileWidth: 3100,
    tileHeight: 1500,
    depth: -1,
    parallaxFactor: 0.1,
    vertices: [
      { x: 0, y: 0 }, { x: 280, y: 200 }, { x: 710, y: 300 }, { x: 880, y: 400 }, 
      { x: 930, y: 290 }, { x: 1280, y: 0 }, { x: 1480, y: 250 }, { x: 1780, y: 320 }, 
      { x: 2080, y: 600 }, { x: 2230, y: 240 }, { x: 2530, y: 0 }
    ]
  }
];