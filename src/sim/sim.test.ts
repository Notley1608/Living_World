import { expect, test } from 'vitest';
import { createWorld, tick, toSnapshot } from '@sim';

test('tick advances the world', () => {
  const world = createWorld();
  tick(world, 100);
  tick(world, 100);
  expect(toSnapshot(world).tick).toBe(2);
});
