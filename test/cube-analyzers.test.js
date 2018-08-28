import {
  isSolved,
  edgesOriented,
  solvedSlots,
  crossBottomEdgesOriented,
  sideOriented,
  sideSolved,
  lrSquares,
  ulurSolved,
  uCornersSolved,
  eoLine,
  lrF2lSquares
} from '../src/cube-analyzers';
import { cubeAfter } from './test-utils';

describe('isSolved', () => {
  test('returns true if the cube is solved regardless rotations', () => {
    expect(isSolved(cubeAfter(''))).toBe(true);
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

describe('lrSquares', () => {
  test('returns corners on left and right sides with adjacent edges solved', () => {
    expect(lrSquares(cubeAfter('R U2 R'))).toEqual([['LFD', 'LDB'], ['RDF', 'RFU']]);
    expect(lrSquares(cubeAfter("U2 L' R U2 R'"))).toEqual([['LFD'], ['RBD']]);
  });
});

describe('ulurSolved', () => {
  test('returns true if left and right upper 1x1x3 blocks are solved', () => {
    expect(ulurSolved(cubeAfter("M2' U"))).toBe(true);
    expect(ulurSolved(cubeAfter("U2 M U2 M U"))).toBe(true);
  });
});

describe('uCornersSolved', () => {
  test('returns true if all corners of the U side are solved relatively to each other', () => {
    expect(uCornersSolved(cubeAfter("M2 U M' U"))).toBe(true);
  });

  test('returns false if not all corners of the U side are solved relatively to each other', () => {
    expect(uCornersSolved(cubeAfter("R U R' U R U2' R'"))).toBe(false);
    expect(uCornersSolved(cubeAfter("R U R' F' R U R' U' R' F R2 U' R'"))).toBe(false);
  });
});

describe('eoLine', () => {
  test('returns true if EO Line is done', () => {
    expect(eoLine(cubeAfter("R L U R2 L U R"))).toBe(true);
    expect(eoLine(cubeAfter("F2 R L2 U R U' F2"))).toBe(true);
  });

  test('returns false if edges are not oriented', () => {
    expect(eoLine(cubeAfter("F R' F' R"))).toBe(false);
  });

  test('returns false if either DF or DB is not solved', () => {
    expect(eoLine(cubeAfter("F2"))).toBe(false);
    expect(eoLine(cubeAfter("B"))).toBe(false);
  });
});

describe('lrF2lSquares', () => {
  test('returns corners on left and right sides with adjacent edges solved that belong to first two layers', () => {
    expect(lrF2lSquares(cubeAfter('R U2 R L2'))).toEqual([['LUF', 'LBU'], ['RFU']]);
    expect(lrF2lSquares(cubeAfter("R2 U L' U2 R"))).toEqual([['LFD'], []]);
  });
});
