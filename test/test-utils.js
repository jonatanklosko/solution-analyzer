import { newCube, applyMoves } from '../src/cube';
import { stringToMoves } from '../src/moves';

export const cubeAfter = movesString =>
  applyMoves(newCube(), stringToMoves(movesString));
