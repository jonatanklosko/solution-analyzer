import { analyzeSolution } from '../src/solution-analyzer';

describe('analyzeSolution', () => {
  test('returns a correct solution tree', () => {
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
        { label: '2nd pair', moves: [ "R", "U'", "R'"] },
        { label: '3rd + 4th pair', moves: ["y2", "U", "R", "U", "R'", "U2", "y", "R'", "D'", "F", "D", "R"] },
        { label: '1LLL', moves: ["U", "f", "R", "U", "R'", "U'", "f'", "U'", "B'", "R2", "D'", "R", "U'", "R'", "D", "R2", "U", "B"] },
        { label: 'AUF', moves: ["U'"] }
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
