import { LevelBlueprint, ALL_LEVELS } from "./levelBlueprints";

export function getLevelFromUrl(): { level: LevelBlueprint; index: number } {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("level");

  if (param !== null) {
    const parsedIdx = parseInt(param, 10);
    if (!isNaN(parsedIdx) && ALL_LEVELS[parsedIdx]) {
      return { level: ALL_LEVELS[parsedIdx], index: parsedIdx };
    }
  }

  return { level: ALL_LEVELS[0], index: 0 };
}
