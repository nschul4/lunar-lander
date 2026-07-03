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
        width: 500,
        vertices: [
            { x: 0, y: 300 },
            { x: 200, y: 0 },
            { x: 300, y: 0 },
            { x: 400, y: 200 },
            { x: 500, y: 300 }
        ],
        landingPads: [
            // Restored to your preferred regional naming style, hitting y: 0 for the peak
            { name: "Alpha-Prime-Base", x: 200, y: 0, width: 100 }
        ]
    },
    // {
    //     name: "Beta",
    //     width: 600,
    //     vertices: [
    //         { x: 0, y: 400 },
    //         { x: 150, y: 150 },
    //         { x: 300, y: 150 },
    //         { x: 450, y: 300 },
    //         { x: 600, y: 400 }
    //     ],
    //     landingPads: [
    //         { name: "Beta-Landing-Station", x: 150, y: 0, width: 150 }
    //     ]
    // },
    {
        name: "Gamma",
        width: 550,
        vertices: [
            { x: 0, y: 350 },
            { x: 100, y: 100 },
            { x: 200, y: 100 },
            { x: 350, y: 50 },
            { x: 450, y: 50 },
            { x: 550, y: 350 }
        ],
        landingPads: [
            { name: "Gamma-Ridge-E", x: 100, y: 50, width: 100 },
            { name: "Gamma-Peak-High", x: 350, y: 0, width: 100 }
        ]
    },
    {
        name: "Olympus",
        width: 800,
        vertices: [
            { x: 0, y: 500 },
            { x: 200, y: 200 },
            { x: 400, y: 50 },
            { x: 550, y: 50 },
            { x: 650, y: 300 },
            { x: 800, y: 500 }
        ],
        landingPads: [
            { name: "Olympus-Chasm-Base", x: 400, y: 0, width: 150 }
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