import type { Snapshot } from '@shared';

// Pure simulation. No I/O; World is plain JSON.

export type World = {
  tick: number;
};

export function createWorld(): World {
  return { tick: 0 };
}

export function tick(world: World, _dtMs: number): void {
  world.tick++;
}

export function toSnapshot(world: World): Snapshot {
  return { tick: world.tick };
}
