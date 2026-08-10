import { LEVEL_0_MOUNTAINS } from "./level0MountainBlueprints";
import { LEVEL_1_MOUNTAINS } from "./level1MountainBlueprints";
import { MountainBlueprint } from "./mountainTypes";
import { BACKGROUND_RANGES_DATABASE, MountainRangeBlueprint } from "./mountainRangeBlueprints";
import { LanderSpawnConfig } from "./lander";

export interface LevelBlueprint {
  id: string;
  name: string;
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
  worldWidth: 1500,
  worldHeight: 1000,
  gravityY: 0.005,
  spawnPosition: {
    x: 100,
    y: 250,
    angle: -90,
    velocityX: 1.0,
    velocityY: 0
  },
  mountains: LEVEL_0_MOUNTAINS,
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

export const LEVEL_1: LevelBlueprint = {
  id: "level_1",
  name: "Lunar Mare",
  worldWidth: 3000,
  worldHeight: 1000,
  gravityY: 0.006,
  spawnPosition: {
    x: 100,
    y: 200,
    angle: -90,
    velocityX: 1.5,
    velocityY: 0
  },
  mountains: LEVEL_1_MOUNTAINS,
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

export const LEVELS: LevelBlueprint[] = [LEVEL_0, LEVEL_1];