import { stringToMoves, invertMove, doubleMove } from '../src/moves';

describe('stringToMoves', () => {
  test('return an empty array when no valid moves are given', () => {
    expect(stringToMoves()).toEqual([]);
    expect(stringToMoves('')).toEqual([]);
    expect(stringToMoves('W2 O')).toEqual([]);
  });

  test('ignores invalid characters', () => {
    expect(stringToMoves('R o L4 W')).toEqual(['R', 'L']);
  });

  test('handles correctly a lack of white characters', () => {
    expect(stringToMoves("R'UL2MbF'")).toEqual(["R'", 'U', 'L2', 'M', 'b', "F'"]);
  });

  test("attaches ', 2 and w signs to their corresponding moves regerdless white characters", () => {
    expect(stringToMoves("R  'u 2 L wM2'")).toEqual(["R'", 'u2', 'Lw', "M2'"]);
  });
});

describe('invertMove', () => {
  test("turns both 2' and 2 into 2", () => {
    expect(invertMove("U2'")).toEqual('U2');
    expect(invertMove('U2')).toEqual('U2');
  });

  test('returns anti-clockwise move when a clockwise move is given', () => {
    expect(invertMove('L')).toEqual("L'");
  });

  test('returns clockwise move when an anti-clockwise move is given', () => {
    expect(invertMove("L'")).toEqual('L');
  });
});

describe('doubleMove', () => {
  test("turns both 2' and 2 into 2", () => {
    expect(doubleMove("U2'")).toEqual('U2');
    expect(doubleMove('U2')).toEqual('U2');
  });

  test('returns double move when a clockwise move is given', () => {
    expect(doubleMove('R')).toEqual('R2');
  });

  test('returns double move when an anti-clockwise move is given', () => {
    expect(doubleMove("R'")).toEqual('R2');
  });
});
