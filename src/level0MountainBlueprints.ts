import { MountainBlueprint } from "./mountainTypes";

export const LEVEL_0_MOUNTAINS: MountainBlueprint[] = [
  {
    name: "Alpha",
    width: 875,
    height: 500,
    vertices: [
      { x: 0, y: 0 },
      { x: 0, y: 700 },
      { x: 50, y: 650 },
      { x: 140, y: 325 },
      { x: 190, y: 350 },
      { x: 240, y: 310 },
      { x: 325, y: 340 },
      { x: 375, y: 450 },
      { x: 450, y: 450 },
      { x: 525, y: 300 },
      { x: 600, y: 300 },
      { x: 580, y: 175 },
      { x: 590, y: 100 },
      { x: 705, y: 100 },
      { x: 720, y: 115 },
      { x: 735, y: 70 },
      { x: 770, y: 20 },
      { x: 800, y: 30 },
      { x: 840, y: 60 },
      { x: 900, y: 0 }
    ],
    landingPads: [
      { name: "alpha", startX: 378, endX: 447, y: 455 },
      { name: "beta", startX: 528, endX: 596, y: 305 },
      { name: "cap", startX: 592, endX: 699, y: 105 }
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
