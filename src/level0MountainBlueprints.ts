import { MountainBlueprint } from "./mountainBlueprints";

export const LEVEL_0_MOUNTAINS: MountainBlueprint[] = [
  {
    name: "Alpha",
    width: 700,
    height: 500,
    vertices: [
      { x: 0, y: 0 },
      { x: 100, y: 110 },
      { x: 190, y: 310 },
      { x: 235, y: 360 },
      { x: 270, y: 430 },
      { x: 300, y: 360 },
      { x: 350, y: 340 },
      { x: 375, y: 305 },
      { x: 410, y: 370 },
      { x: 440, y: 290 },
      { x: 540, y: 150 },
      { x: 590, y: 150 },
      { x: 600, y: 160 },
      { x: 630, y: 100 },
      { x: 750, y: 0 }
    ],
    landingPads: [{ name: "alpha", startX: 542, endX: 587, y: 155 }]
  },
  {
    name: "Beta",
    width: 500,
    height: 450,
    vertices: [
      { x: 0, y: 0 },
      { x: 100, y: 450 },
      { x: 150, y: 500 },
      { x: 250, y: 270 },
      { x: 300, y: 250 },
      { x: 350, y: 100 },
      { x: 400, y: 50 },
      { x: 450, y: 50 },
      { x: 530, y: 0 }
    ],
    landingPads: [{ name: "beta", startX: 401, endX: 447, y: 55 }]
  }
];
