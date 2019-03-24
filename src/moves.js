const MOVES_REGEXP = /([RLUDFB]w?|[rludfbMSExyz])2?'?/g;

export const stringToMoves = string => {
  if (!string) return [];
  const preformatted = string
    .replace(/\s+/g, '')
    .replace(/`/g, "'")
    .replace(/[XYZ]/g, rotation => rotation.toLowerCase());
  return preformatted.match(MOVES_REGEXP) || [];
};

export const invertMove = move =>
  move.match(/(2|')$/) ? move.replace("'", '') : move + "'";

export const doubleMove = move =>
  move.replace(/2?'?$/, '2');
