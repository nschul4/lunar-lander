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
    vertices: { x: number; y: number }[];
    landingPads: PadBlueprint[];
}

export const MOUNTAIN_DATABASE: MountainBlueprint[] = [
    {
        name: "Alpha",
        width: 600,
        vertices: [
            { x: 0, y: 500 },
            { x: 100, y: 0 },
            { x: 200, y: 0 },
            { x: 300, y: 300 },
            { x: 600, y: 500 }
        ],
        landingPads: [
            { name: "Alpha-Prime-Base", x: 100, y: 0, width: 100 }
        ]
    },
    {
        name: "Beta",
        width: 700,
        vertices: [
            { x: 0, y: 700 },
            { x: 250, y: 400 },
            { x: 300, y: 400 },
            { x: 400, y: 0 },
            { x: 500, y: 0 },
            { x: 700, y: 700 }
        ],
        landingPads: [
            { name: "Beta-Ridge-E", x: 250, y: 400, width: 50 },
            { name: "Beta-Peak-High", x: 400, y: 0, width: 100 }
        ]
    },
    {
        name: "Olympus",
        width: 900,
        vertices: [
            { x: 0, y: 500 },
            { x: 200, y: 300 },
            { x: 300, y: 0 },
            { x: 450, y: 0 },
            { x: 550, y: 200 },
            { x: 900, y: 500 }
        ],
        landingPads: [
            { name: "Olympus-Chasm-Base", x: 300, y: 0, width: 150 }
        ]
    },
    {
        name: "Titus",
        width: 500,
        vertices: [
            { x: 0, y: 300 },
            { x: 200, y: 0 },
            { x: 300, y: 0 },
            { x: 400, y: 200 },
            { x: 500, y: 300 }
        ],
        landingPads: [
            { name: "Titus", x: 200, y: 0, width: 100 }
        ]
    },
    {
        name: "Tam",
        width: 600,
        vertices: [
            { x: 0, y: 300 },
            { x: 200, y: 0 },
            { x: 300, y: 0 },
            { x: 400, y: 200 },
            { x: 500, y: 300 }
        ],
        landingPads: [
            { name: "Tam-Outpost-Delta", x: 200, y: 0, width: 100 }
        ]
    }
];