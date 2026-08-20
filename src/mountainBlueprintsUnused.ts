import { MountainBlueprint } from "./mountainTypes";

export const MOUNTAINS_UNUSED: MountainBlueprint[] = [
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
