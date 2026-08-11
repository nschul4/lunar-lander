import { MountainBlueprint } from "./mountainTypes";

export const LEVEL_0_MOUNTAINS: MountainBlueprint[] = [
  {
    name: "Null",
    width: 435,
    height: 700,
    vertices: [
      { x: 0, y: 0 },
      { x: 75, y: 100 },
      { x: 175, y: 475 },
      { x: 250, y: 450 },
      { x: 350, y: 150 },
      { x: 500, y: 0 },
    ],
    landingPads: []
  },
  {
    name: "Alpha",
    width: 950,
    height: 500,
    vertices: [
      { x: 0, y: 0 },
      { x: 100, y: 225 },
      { x: 150, y: 575 },
      { x: 200, y: 600 },
      { x: 290, y: 325 },
      { x: 340, y: 350 },
      { x: 390, y: 310 },
      { x: 475, y: 340 },
      { x: 525, y: 425 },
      { x: 600, y: 425 },
      { x: 650, y: 310 },
      { x: 690, y: 275 },
      { x: 730, y: 80 },
      { x: 750, y: 100 },
      { x: 865, y: 100 },
      { x: 880, y: 115 },
      { x: 895, y: 70 },
      { x: 940, y: 20 },
      { x: 1000, y: 0 },
    ],
    landingPads: [
      { name: "alpha", startX: 529, endX: 597, y: 430 },
      { name: "beta", startX: 755, endX: 860, y: 105 }
    ]
  },
  {
    name: "Gemini",
    width: 800,
    height: 450,
    vertices: [
      { x: 0, y: 0 },
      { x: 100, y: 150 },
      { x: 160, y: 400 },
      { x: 215, y: 500 },
      { x: 300, y: 375 },
      { x: 325, y: 250 },
      { x: 360, y: 200 },
      { x: 400, y: 260 },
      { x: 475, y: 260 },
      { x: 500, y: 130 },
      { x: 600, y: 100 },
      { x: 650, y: 120 },
      { x: 700, y: 50 },
      { x: 800, y: 0 }
    ],
    landingPads: [{ name: "gemini", startX: 403, endX: 472, y: 265 }]
  }
];
