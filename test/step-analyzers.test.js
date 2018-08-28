import { labelCFOPStep, labelRouxStep, labelZZStep } from '../src/step-analyzers';
import { cubeAfter } from './test-utils';

describe('labelCFOPStep', () => {
  const scramble = "D L2 F2 D' B2 D' F2 D B2 D2 L2 F D2 U L B' D' U' F' D";
  const cross = scramble + "U' R2' B' D F D'";
  const firstPair = cross + "L' U' L2 U2 L'";
  const secondPair = firstPair + "U L' U' L U L' U' L";
  const thirdPair = secondPair + "R' U' R U R' U' R";
  const fourthPair = thirdPair + "U' R U' R' U2 y' R' U' R";
  const eoll = fourthPair + "f R U R' U' f'";
  const ocll = eoll + "R U R' U R U' R' U R U2' R'";
  const cpll = ocll + "y' x R2' D2 R U R' D2 R U' R x'";
  const epll = cpll + "M2' U' M' U2 M U' M2'";
  const auf = epll + "U2";

  [ { previous: scramble,   next: cross,      expectedLabel: 'cross'           },
    { previous: scramble,   next: firstPair,  expectedLabel: 'xcross'          },
    { previous: scramble,   next: secondPair, expectedLabel: 'xxcross'         },
    { previous: scramble,   next: thirdPair,  expectedLabel: 'xxxcross'        },
    { previous: scramble,   next: fourthPair, expectedLabel: 'xxxxcross'       },
    { previous: cross,      next: firstPair,  expectedLabel: '1st pair'        },
    { previous: firstPair,  next: secondPair, expectedLabel: '2nd pair'        },
    { previous: secondPair, next: thirdPair,  expectedLabel: '3rd pair'        },
    { previous: firstPair,  next: thirdPair,  expectedLabel: '2nd + 3rd pair'  },
    { previous: thirdPair,  next: eoll,       expectedLabel: '4th pair / EOLS' },
    { previous: thirdPair,  next: ocll,       expectedLabel: '4th pair / OLS'  },
    { previous: fourthPair, next: eoll,       expectedLabel: 'EOLL'            },
    { previous: eoll,       next: ocll,       expectedLabel: 'OCLL'            },
    { previous: fourthPair, next: ocll,       expectedLabel: 'OLL'             },
    { previous: eoll,       next: cpll,       expectedLabel: 'COLL'            },
    { previous: fourthPair, next: cpll,       expectedLabel: 'OLLCP'           },
    { previous: ocll,       next: cpll,       expectedLabel: 'CPLL'            },
    { previous: cpll,       next: epll,       expectedLabel: 'EPLL'            },
    { previous: ocll,       next: epll,       expectedLabel: 'PLL'             },
    { previous: eoll,       next: epll,       expectedLabel: 'ZBLL'            },
    { previous: fourthPair, next: epll,       expectedLabel: '1LLL'            },
    { previous: epll,       next: auf,        expectedLabel: 'AUF'             }
  ].forEach(({ previous, next, expectedLabel }) => {
    test(`recognises ${expectedLabel}`, () => {
      expect(
        labelCFOPStep(cubeAfter(previous), cubeAfter(next))
      ).toBe(expectedLabel);
    });
  });
});

describe('labelRouxStep', () => {
  test('', () => {
  });
});

describe('labelZZStep', () => {
  test('', () => {
  });
});
