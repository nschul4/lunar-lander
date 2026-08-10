import { LevelBlueprint, LEVELS } from "./levelBlueprints";

export function getLevelFromUrl(): { level: LevelBlueprint; index: number } {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('level');

  if (param !== null) {
    // 1. Try parsing as 0-based array index
    const parsedIdx = parseInt(param, 10);
    if (!isNaN(parsedIdx) && LEVELS[parsedIdx]) {
      return { level: LEVELS[parsedIdx], index: parsedIdx };
    }

    // 2. Try matching level ID (e.g., ?level=level_2)
    const foundIdx = LEVELS.findIndex(l => l.id === param);
    if (foundIdx !== -1) {
      return { level: LEVELS[foundIdx], index: foundIdx };
    }
  }

  // Fallback to Level 0
  return { level: LEVELS[0], index: 0 };
}