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
    textureWidth: 1800,
    textureHeight: 1000,
    color: 0x222222,
    tileX: 0,
    tileY: 1000,
    tileWidth: 3000,
    tileHeight: 1000,
    depth: -2,
    parallaxFactor: 0.05,
    vertices: [
      { x: 0, y: 350 },
      { x: 550, y: 700 },
      { x: 700, y: 400 },
      { x: 1000, y: 800 },
      { x: 1250, y: 450 },
      { x: 1450, y: 700 },
      { x: 1800, y: 350 }
    ]
  },
  {
    key: 'mountain_range_mid',
    textureWidth: 2700,
    textureHeight: 1000,
    color: 0x333333,
    tileX: 0,
    tileY: 1000,
    tileWidth: 3000,
    tileHeight: 1000,
    depth: -1,
    parallaxFactor: 0.1,
    vertices: [
      { x: 0, y: 150 },
      { x: 330, y: 250 },
      { x: 760, y: 350 },
      { x: 900, y: 450 },
      { x: 950, y: 330 },
      { x: 1100, y: 100 },
      { x: 1480, y: 250 },
      { x: 1780, y: 320 },
      { x: 2050, y: 550 },
      { x: 2230, y: 240 },
      { x: 2700, y: 150 }
    ]
  }
];