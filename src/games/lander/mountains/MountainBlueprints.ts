// ./src/games/lander/mountains/MountainBlueprints.ts

export interface PadBlueprint {
    name: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
}

export interface MountainBlueprint {
    name: string;
    width: number;
    height: number;
    vertices: { x: number; y: number }[];
    landingPads: PadBlueprint[];
}

export const MOUNTAIN_DATABASE: MountainBlueprint[] = [
    {
        name: "Alpha",
        width: 250,
        height: 500,
        vertices: [
            { x: 0,   y: 50 },
            { x: 50,  y: 500 },
            { x: 100, y: 400 },
            { x: 150, y: 350 },
            { x: 200, y: 50 }
        ],
        landingPads: [{ name: "alpha", x: 200, y: 50, width: 50 }]
    },
    {
        name: "Beta",
        width: 450,
        height: 400,
        vertices: [
            { x: 0,   y: 0 },
            { x: 50,  y: 350 },
            { x: 100, y: 400 },
            { x: 200, y: 220 },
            { x: 250, y: 200 },
            { x: 300, y: 100 },
            { x: 350, y: 50 },
            { x: 400, y: 50 },
            { x: 450, y: 0 }
        ],
        landingPads: [{ name: "beta", x: 350, y: 50, width: 50 }]
    },
    {
        name: "Epsilon",
        width: 500,
        height: 400,
        vertices: [
            { x: 0,   y: 50 },
            { x: 50,  y: 275 },
            { x: 125, y: 400 },
            { x: 200, y: 200 },
            { x: 250, y: 150 },
            { x: 300, y: 250 },
            { x: 350, y: 250 },
            { x: 400, y: 100 },
            { x: 500, y: 50 }
        ],
        landingPads: [{ name: "epsilon", x: 300, y: 250, width: 50 }]
    },
    {
        name: "Delta",
        width: 300,
        height: 300,
        vertices: [
            { x: 0,   y: 50 },
            { x: 50,  y: 150 },
            { x: 100, y: 100 },
            { x: 150, y: 300 },
            { x: 200, y: 100 },
            { x: 250, y: 50 }
        ],
        landingPads: [{ name: "delta", x: 250, y: 50, width: 50 }]
    },
    {
        name: "Tranquility",
        width: 300,
        height: 500,
        vertices: [
            { x: 0,   y: 0 },
            { x: 50,  y: 350 },
            { x: 100, y: 250 },
            { x: 150, y: 500 },
            { x: 200, y: 350 },
            { x: 250, y: 350 },
            { x: 300, y: 0 }
        ],
        landingPads: [
            { name: "tranquility base", x: 200, y: 350, width: 50 },
            { name: "gamma", x: 300, y: 0, width: 50 }
        ]
    }
];