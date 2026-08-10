export interface PadBlueprint {
  name: string;
  startX: number;
  endX: number;
  y: number;
  height?: number;
}

export interface MountainBlueprint {
  name: string;
  width: number;
  height: number;
  vertices: { x: number; y: number }[];
  landingPads: PadBlueprint[];
}
