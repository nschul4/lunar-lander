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
        width: 600,
        height: 500,
        vertices: [
            { x: 0, y: 0 },
            { x: 100, y: 500 },
            { x: 200, y: 500 },
            { x: 300, y: 200 },
            { x: 600, y: 0 }
        ],
        landingPads: [
            { name: "Alpha-Prime-Base", x: 100, y: 500, width: 100 }
        ]
    },
    {
        name: "Beta",
        width: 700,
        height: 700,
        vertices: [
            { x: 0, y: 0 },
            { x: 250, y: 300 },
            { x: 300, y: 300 },
            { x: 400, y: 700 },
            { x: 500, y: 700 },
            { x: 700, y: 0 }
        ],
        landingPads: [
            { name: "Beta-Ridge-E", x: 250, y: 300, width: 50 },
            { name: "Beta-Peak-High", x: 400, y: 700, width: 100 }
        ]
    },
    {
        name: "Olympus",
        width: 900,
        height: 500,
        vertices: [
            { x: 0, y: 0 },
            { x: 200, y: 200 },
            { x: 300, y: 500 },
            { x: 450, y: 500 },
            { x: 550, y: 300 },
            { x: 900, y: 0 }
        ],
        landingPads: [
            { name: "Olympus-Chasm-Base", x: 300, y: 500, width: 150 }
        ]
    },
    {
        name: "Titus",
        width: 500,
        height: 300,
        vertices: [
            { x: 0, y: 0 },
            { x: 200, y: 300 },
            { x: 300, y: 300 },
            { x: 400, y: 100 },
            { x: 500, y: 0 }
        ],
        landingPads: [
            { name: "Titus", x: 200, y: 300, width: 100 }
        ]
    }
];