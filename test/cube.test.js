import { newCube, applyMove, applyMoves } from '../src/cube';

describe('applyMove', () => {
  test('throws when an invalid move is given', () => {
    expect(() => applyMove(newCube(), 'W2')).toThrow('Invalid move: W2');
  });

  test('handles single layer moves', () => {
    const stateR = applyMove(newCube(), 'R');
    expect(stateR).toEqual({
      ...newCube(),
      'UBR': 'F', 'UR': 'F', 'URF': 'F',
      'FUR': 'D', 'FR': 'D', 'FRD': 'D',
      'DFR': 'B', 'DR': 'B', 'DRB': 'B',
      'BDR': 'U', 'BR': 'U', 'BRU': 'U'
    });
    const stateRU = applyMove(stateR, 'U');
    expect(stateRU).toEqual({
      ...stateR,
      'UFL': 'F', 'UF': 'F', 'UR': 'U', 'UBR': 'U',
      'FLU': 'R', 'FU': 'R', 'FUR': 'R',
      'RFU': 'U', 'RU': 'B', 'RUB': 'B',
      'BRU': 'L', 'BU': 'L', 'BUL': 'L',
      'LBU': 'F', 'LU': 'F', 'LUF': 'D'
    });
  });

  test('handles slice moves', () => {
    expect(applyMove(newCube(), "M'")).toEqual({
      ...newCube(),
      'UB': 'F', 'U': 'F', 'UF': 'F',
      'FU': 'D', 'F': 'D', 'FD': 'D',
      'DF': 'B', 'D': 'B', 'DB': 'B',
      'BD': 'U', 'B': 'U', 'BU': 'U'
    });
  });

  test('handles double layer moves', () => {
    expect(applyMove(newCube(), 'f')).toEqual({
      ...newCube(),
      'UL': 'L', 'U': 'L', 'UR': 'L', 'UFL': 'L', 'UF': 'L', 'URF': 'L',
      'RU': 'U', 'R': 'U', 'RD': 'U', 'RFU': 'U', 'RF': 'U', 'RDF': 'U',
      'DR': 'R', 'D': 'R', 'DL': 'R', 'DFR': 'R', 'DF': 'R', 'DLF': 'R',
      'LD': 'D', 'L': 'D', 'LU': 'D', 'LFD': 'D', 'LF': 'D', 'LUF': 'D'
    });
  });

  test('handles rotations', () => {
    expect(applyMove(newCube(), 'y')).toEqual({
      ...newCube(),
      'F': 'R', 'FUR': 'R', 'FR': 'R', 'FRD': 'R', 'FD': 'R', 'FDL': 'R', 'FL': 'R', 'FLU': 'R', 'FU': 'R',
      'R': 'B', 'RUB': 'B', 'RB': 'B', 'RBD': 'B', 'RD': 'B', 'RDF': 'B', 'RF': 'B', 'RFU': 'B', 'RU': 'B',
      'B': 'L', 'BUL': 'L', 'BL': 'L', 'BLD': 'L', 'BD': 'L', 'BDR': 'L', 'BR': 'L', 'BRU': 'L', 'BU': 'L',
      'L': 'F', 'LUF': 'F', 'LF': 'F', 'LFD': 'F', 'LD': 'F', 'LDB': 'F', 'LB': 'F', 'LBU': 'F', 'LU': 'F'
    });
  });

  test('handles anti-clockwise moves', () => {
    expect(applyMove(newCube(), "D'")).toEqual({
      ...newCube(),
      'FDL': 'R', 'FD': 'R', 'FRD': 'R',
      'RDF': 'B', 'RD': 'B', 'RBD': 'B',
      'BDR': 'L', 'BD': 'L', 'BLD': 'L',
      'LDB': 'F', 'LD': 'F', 'LFD': 'F'
    });
  });

  test('handles double moves', () => {
    expect(applyMove(newCube(), 'U2')).toEqual({
      ...newCube(),
      'FLU': 'B', 'FU': 'B', 'FUR': 'B',
      'RFU': 'L', 'RU': 'L', 'RUB': 'L',
      'BRU': 'F', 'BU': 'F', 'BUL': 'F',
      'LBU': 'R', 'LU': 'R', 'LUF': 'R'
    });
  });
});

describe('applyMoves', () => {
  test('returns a new cube with all the given moves applied', () => {
    expect(
      applyMoves(newCube(), ["R", "U", "R'", "U", "R", "U2'", "R'"])
    ).toEqual({
      ...newCube(),
      'URF': 'B',
      'UFL': 'R',
      'ULB': 'F',
      'RUB': 'L',
      'RU' : 'L',
      'RFU': 'U',
      'FUR': 'L',
      'FLU': 'U',
      'LUF': 'B',
      'LU' : 'B',
      'LBU': 'U',
      'BUL': 'R',
      'BU' : 'R',
      'BRU': 'F'
    });
  });
});
