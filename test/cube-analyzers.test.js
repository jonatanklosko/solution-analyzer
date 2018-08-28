import {
  isSolved,
  edgesOriented,
  solvedSlots,
  crossBottomEdgesOriented,
  sideOriented,
  sideSolved
} from '../src/cube-analyzers';

import { newCube, applyMoves } from '../src/cube';
import { stringToMoves } from '../src/moves';

const cubeAfter = movesString => applyMoves(newCube(), stringToMoves(movesString));

describe('isSolved', () => {
  test('returns true if the cube is solved regardless rotations', () => {
    expect(isSolved(newCube())).toBe(true);
    expect(isSolved(cubeAfter("R U R' U' y2 U L U' L'"))).toBe(true);
  });

  test('returns false if the cube is not solved', () => {
    expect(isSolved(cubeAfter("R U"))).toBe(false);
  });
});

describe('edgesOriented', () => {
  test('returns true if EO is done', () => {
    expect(edgesOriented(cubeAfter("R U D' F2 L2 U"))).toBe(true);
  });

  test('returns false if EO is not done', () => {
    expect(edgesOriented(cubeAfter('F R U'))).toBe(false);
  });

  test('handles different cube orientation', () => {
    expect(edgesOriented(cubeAfter("F U2 D' L2"), 'B', 'L')).toBe(true);
  });
});

describe('solvedSlots', () => {
  test('returns a side along with slots count', () => {
    expect(solvedSlots(cubeAfter("R U R'"))).toEqual({ side: 'D', count: 3 })
  });

  test('returns the maximal number of slots when multiple crosses are solved', () => {
    expect(solvedSlots(cubeAfter("R U R2' U'"))).toEqual({ side: 'L', count: 3 })
  });
});

describe('crossBottomEdgesOriented', () => {
  test('returns true if in any position with cross at the bottom edges are oriented', () => {
    expect(crossBottomEdgesOriented(cubeAfter("R U R'"), 'D')).toBe(true);
    expect(crossBottomEdgesOriented(cubeAfter("F U' F'"), 'D')).toBe(true);
  });

  test('returns false if in every position with cross at the bottom edges are not oriented', () => {
    expect(crossBottomEdgesOriented(cubeAfter("R F R' F'"), 'D')).toBe(false);
  });

  test('handles different cube orientation', () => {
    expect(crossBottomEdgesOriented(cubeAfter("F' R' F R"), 'L')).toBe(true);
  });
});

describe('sideOriented', () => {
  test('returns true if all matching stickers of the given side have the same value', () => {
    expect(sideOriented(cubeAfter("R' U R' D2 R U' R' D2 R2"), 'B')).toBe(true);
  });

  test('returns false if not all matching stickers of the given side have the same value', () => {
    expect(sideOriented(cubeAfter("R U R' U R U2' R'"), 'U')).toBe(false);
  });

  test('accepts a predicate to check a subset of stickers', () => {
    const predicate = sticker =>
      ['ULB', 'UB', 'U', 'UF', 'UFL', 'UL'].includes(sticker);
    expect(sideOriented(cubeAfter("R U R' U'"), 'U', predicate)).toBe(true);
  });
});

describe('sideSolved', () => {
  test('returns true if all matching elements of the given side are solved relatively to each other', () => {
    expect(sideSolved(cubeAfter('R'), 'R')).toBe(true);
  });

  test('returns false if not all matching elements of the given side are solved relatively to each other', () => {
    expect(sideSolved(cubeAfter("R U R' F' R U R' U' R' F R2 U' R'"), 'U')).toBe(false);
  });

  test('accepts a predicate to check a subset of stickers', () => {
    const predicate = sticker =>
      ['ULB', 'UB', 'U', 'UL', 'UFL'].includes(sticker);
    expect(sideSolved(cubeAfter("R U R' F' R U R' U' R' F R2 U' R' U'"), 'U', predicate)).toBe(true);
  });
});
