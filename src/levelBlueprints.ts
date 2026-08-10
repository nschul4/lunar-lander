// src/levelBlueprints.ts
import { MOUNTAIN_DATABASE, MountainBlueprint } from "./mountainBlueprints";
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

/**
 * Level 0: Introductory training course.
 * Shorter map width (1500px), slightly lighter gravity, and a gentle 2-mountain sequence.
 */
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
  mountains: MOUNTAIN_DATABASE.slice(0, 2),
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

/**
 * Level 1: Full-length course across complete mountain database.
 */
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
  mountains: MOUNTAIN_DATABASE,
  backgroundRanges: BACKGROUND_RANGES_DATABASE
};

export const LEVELS: LevelBlueprint[] = [LEVEL_0, LEVEL_1];