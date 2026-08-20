import { MOUNTAINS_LEVEL_0 } from "./mountainBlueprintsLevel0";
import { MOUNTAINS_LEVEL_1 } from "./mountainBlueprintsLevel1";
import { MOUNTAINS_UNUSED } from "./mountainBlueprintsUnused";
import { MountainBlueprint } from "./mountainTypes";
import { BACKGROUND_RANGES_DATABASE, MountainRangeBlueprint } from "./mountainRangeBlueprints";
import { LanderSpawnConfig } from "./lander";

export interface LevelBlueprint {
  id: string;
  name: string;
  startX?: number;
  worldWidth: number;
  worldHeight: number;
  gravityY?: number;
  spawnPosition?: LanderSpawnConfig;
  mountains: MountainBlueprint[];
  backgroundRanges: MountainRangeBlueprint[];
}

export const LEVEL_0: LevelBlueprint = {
  id: "level_0",
  name: "Tranquility Basin",
  startX: -500,
  worldWidth: 1500,
  worldHeight: 1000,
  gravityY: 0.005,
  spawnPosition: {
    x: 100,
    y: 250,
    angle: -5,
    velocityX: 0.58,
    velocityY: -0.1
  },
  mountains: MOUNTAINS_LEVEL_0,
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

export const LEVEL_1: LevelBlueprint = {
  id: "level_1",
  name: "Lunar Mare",
  startX: -500,
  worldWidth: 2600,
  worldHeight: 1000,
  gravityY: 0.006,
  spawnPosition: {
    x: 100,
    y: 200,
    angle: -90,
    velocityX: 1.5,
    velocityY: 0
  },
  mountains: MOUNTAINS_LEVEL_1,
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

export const LEVEL_UNUSED: LevelBlueprint = {
  id: "level_unused",
  name: "Unused / Scratchpad",
  startX: -500,
  worldWidth: 1500,
  worldHeight: 1000,
  gravityY: 0.006,
  mountains: MOUNTAINS_UNUSED,
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

export const LEVELS: LevelBlueprint[] = [LEVEL_0, LEVEL_1];

export const ALL_LEVELS: LevelBlueprint[] = [...LEVELS, LEVEL_UNUSED];
