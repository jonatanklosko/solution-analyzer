import { analyzeSolution } from '../src/solution-analyzer';

describe('analyzeSolution', () => {
  test('supports CFOP', () => {
    expect(
      analyzeSolution(
        "B2 L2 D' R2 D' L2 R2 D2 B2 D' R' F2 D R F D' R D' B' L",
        "z2 L2 F' D' U R' U2 R' U R' F R2 F' R U' R' y2 U R U R' U2 y R' D' F D R U f R U R' U' f' U' B' R2 D' R U' R' D R2 U B U'",
        'CFOP'
      )
    ).toEqual({
      solved: true,
      steps: [
        { label: 'inspection', moves: ["z2"] },
        { label: 'cross', moves: ["L2", "F'", "D'", "U", "R'"] },
        { label: '1st pair', moves: ["U2", "R'", "U", "R'", "F", "R2", "F'"] },
        { label: '2nd pair', moves: ["R", "U'", "R'"] },
        { label: '3rd + 4th pair', moves: ["y2", "U", "R", "U", "R'", "U2", "y", "R'", "D'", "F", "D", "R"] },
        { label: '1LLL', moves: ["U", "f", "R", "U", "R'", "U'", "f'", "U'", "B'", "R2", "D'", "R", "U'", "R'", "D", "R2", "U", "B"] },
        { label: 'AUF', moves: ["U'"] }
      ]
    });
  });

  test('supports Roux', () => {
    expect(
      analyzeSolution(
        "F2 B' R2 B' R' L D L B' U B2 R2 U' B2 U B2 R2 L2 D L2",
        "x2 y B U2 F' D' M' U2 M' B' U' R' U R2' U2 R U' R' U' R r U' r' U2' R' U' R U' R' U R' F R F' U R U M U' M' U M2 U'",
        'Roux'
      )
    ).toEqual({
      solved: true,
      steps: [
        { label: 'inspection', moves: ["x2", "y"] },
        { label: 'LSquare', moves: ["B", "U2", "F'", "D'"] },
        { label: 'LBlock', moves: ["M'", "U2", "M'", "B'"] },
        { label: 'RSquare', moves: ["U'", "R'", "U", "R2'", "U2", "R", "U'", "R'", "U'"] },
        { label: 'RBlock', moves: ["R", "r", "U'", "r'"] },
        { label: 'CMLL', moves: ["U2'", "R'", "U'", "R", "U'", "R'", "U", "R'", "F", "R", "F'", "U", "R"] },
        { label: 'EO', moves: ["U", "M", "U'","M'"] },
        { label: 'LSE', moves: ["U", "M2", "U'"] }
      ]
    });
  });

  test('supports ZZ', () => {
    expect(
      analyzeSolution(
        "U' L U2 D' F' B' R' D' F B2 D L2 D B2 U' R2 U2 B2 R2 U'",
        "D F U' R L B' R2 F2 R2 U' L U2 L2 U' R' U' L' U2 R2 U R2 U2 R U' R' U' R U R U2' R' U L' U2 R U R' U' R U' R' L U",
        'ZZ'
      )
    ).toEqual({
      solved: true,
      steps: [
        { label: 'EOLine', moves: ["D", "F", "U'", "R", "L", "B'", "R2", "F2"] },
        { label: 'LSquare', moves: ["R2", "U'", "L", "U2"] },
        { label: 'LBlock', moves: ["L2", "U'", "R'", "U'", "L'"] },
        { label: 'RSquare', moves: ["U2", "R2", "U"] },
        { label: 'RBlock', moves: ["R2", "U2", "R", "U'", "R'", "U'", "R"] },
        { label: 'ZBLL', moves: ["U", "R", "U2'", "R'", "U", "L'", "U2", "R", "U", "R'", "U'", "R", "U'", "R'", "L"] },
        { label: 'AUF', moves: ["U"] }
      ]
    });
  });

  test('handles a partial solution', () => {
    expect(
      analyzeSolution(
        "U2 B2 U' R2 U2 L F2 R' D2 U L2 R D' U R' B' F R'",
        "x r U' U' x' L R' D y L' U L D' R U",
        'CFOP'
      )
    ).toEqual({
      solved: false,
      steps: [
        { label: 'inspection', moves: ["x"] },
        { label: 'cross', moves: ["r", "U'", "U'", "x'", "L", "R'", "D"] },
        { label: '1st pair', moves: ["y", "L'", "U", "L"] },
        { label: null, moves: ["D'", "R", "U"] }
      ]
    });
  });

  test('handles a partial solution including just rotations', () => {
    expect(analyzeSolution('R', 'x2 y', 'CFOP')).toEqual({
      solved: false,
      steps: [
        { label: 'inspection', moves: ["x2", "y"] }
      ]
    });
  });

  test('throws when an empty scramble is given', () => {
    expect(() => analyzeSolution('', 'R', 'CFOP')).toThrow(
      'Scramble must include at least one valid move.'
    );
    expect(() => analyzeSolution('W2', 'R', 'CFOP')).toThrow(
      'Scramble must include at least one valid move.'
    );
  });

  test('throws when an empty solution  is given', () => {
    expect(() => analyzeSolution('R', '', 'Roux')).toThrow(
      'Solution must include at least one valid move.'
    );
  });

  test('throws when no method is given', () => {
    expect(() => analyzeSolution("R", "R'")).toThrow("Method is missing");
  });

  test('throws when unsupported method is given', () => {
    expect(() => analyzeSolution("R", "R'", 'Petrus')).toThrow(
      "Unsupported method 'Petrus'. Supported methods are: CFOP, Roux, ZZ."
    );
  });
});
