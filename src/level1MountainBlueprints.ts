import { MountainBlueprint } from "./mountainTypes";

export const LEVEL_1_MOUNTAINS: MountainBlueprint[] = [
  {
    name: "Null",
    width: 400,
    height: 700,
    vertices: [
      { x: 0, y: 0 },
      { x: 75, y: 150 },
      { x: 175, y: 550 },
      { x: 250, y: 575 },
      { x: 350, y: 100 },
      { x: 500, y: 0 },
    ],
    landingPads: []
  },
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
  },
  {
    name: "Epsilon",
    width: 450,
    height: 370,
    vertices: [
      { x: 0, y: 50 },
      { x: 50, y: 275 },
      { x: 125, y: 370 },
      { x: 190, y: 200 },
      { x: 250, y: 150 },
      { x: 300, y: 250 },
      { x: 350, y: 250 },
      { x: 400, y: 100 },
      { x: 500, y: 50 }
    ],
    landingPads: [{ name: "epsilon", startX: 300, endX: 350, y: 205 }]
  },
  {
    name: "Delta",
    width: 350,
    height: 300,
    vertices: [
      { x: 0, y: 0 },
      { x: 50, y: 150 },
      { x: 100, y: 100 },
      { x: 150, y: 300 },
      { x: 200, y: 100 },
      { x: 250, y: 50 },
      { x: 300, y: 50 },
      { x: 330, y: 60 },
      { x: 410, y: 0 }
    ],
    landingPads: [{ name: "delta", startX: 250, endX: 297, y: 55 }]
  },
  {
    name: "Tranquility",
    width: 450,
    height: 500,
    vertices: [
      { x: 0, y: 0 },
      { x: 150, y: 350 },
      { x: 200, y: 240 },
      { x: 250, y: 500 },
      { x: 300, y: 350 },
      { x: 350, y: 350 },
      { x: 400, y: 150 },
      { x: 450, y: 150 },
      { x: 570, y: 0 },
    ],
    landingPads: [
      { name: "tranquility base", startX: 300, endX: 350, y: 355 },
      { name: "gamma", startX: 400, endX: 450, y: 155 }
    ]
  },
  {
    name: "Wallace",
    width: 750,
    height: 500,
    vertices: [
      { x: 0, y: 0 },
      { x: 170, y: 300 },
      { x: 230, y: 250 },
      { x: 290, y: 450 },
      { x: 350, y: 400 },
      { x: 490, y: 200 },
      { x: 600, y: 260 },
      { x: 750, y: 0 },
    ],
    landingPads: [ ]
  }
];
