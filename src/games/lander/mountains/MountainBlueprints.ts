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
        width: 700,
        height: 500,
        vertices: [
            { x: 0, y: 0 },
            { x: 120, y: 110 },
            { x: 210, y: 310 },
            { x: 255, y: 360 },
            { x: 290, y: 430 },
            { x: 340, y: 360 },
            { x: 400, y: 330 },
            { x: 415, y: 305 },
            { x: 430, y: 370 },
            { x: 450, y: 290 },
            { x: 540, y: 150 },
            { x: 590, y: 150 },
            { x: 600, y: 160 },
            { x: 630, y: 100 },
            { x: 750, y: 0 }
        ],
        landingPads: [{ name: "alpha", x: 540, y: 220, width: 50 }]
    },
    {
        name: "Beta",
        width: 500,
        height: 400,
        vertices: [
            { x: 0, y: 0 },
            { x: 100, y: 350 },
            { x: 150, y: 400 },
            { x: 250, y: 220 },
            { x: 300, y: 200 },
            { x: 350, y: 100 },
            { x: 400, y: 50 },
            { x: 450, y: 50 },
            { x: 530, y: 0 }
        ],
        landingPads: [{ name: "beta", x: 400, y: 50, width: 50 }]
    },
    {
        name: "Epsilon",
        width: 450,
        height: 400,
        vertices: [
            { x: 0, y: 50 },
            { x: 50, y: 275 },
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
        landingPads: [{ name: "delta", x: 250, y: 50, width: 50 }]
    },
    {
        name: "Tranquility",
        width: 400,
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
            { x: 550, y: 0 },
        ],
        landingPads: [
            { name: "tranquility base", x: 300, y: 350, width: 50 },
            { name: "gamma", x: 400, y: 150, width: 50 }
        ]
    }
];