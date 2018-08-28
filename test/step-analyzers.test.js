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
  const scramble = "U' L F2 L2 U2 R' B2 F2 D2 B2 R2 U' F2 L' R' B' F' L D' L";
  const lSquare = scramble + "x' z' R' F2 U B";
  const lBlock = lSquare + "U' M r' F";
  const rSquare = lBlock + "r U R U' M' U R";
  const rBlock = rSquare + "U' M U' r U' r'";
  const cmll = rBlock + "U L' U R U' L U R'";
  const eo = cmll + "M' U' M U M' U M'";
  const ulur = eo + "U2 M2";
  const ep = ulur + "U E2 M E2 M";

  [ { previous: scramble, next: lSquare, expectedLabel: 'LSquare'    },
    { previous: lSquare,  next: lBlock,  expectedLabel: 'LBlock'     },
    { previous: lBlock,   next: rSquare, expectedLabel: 'RSquare'    },
    { previous: rSquare,  next: rBlock,  expectedLabel: 'RBlock'     },
    { previous: rBlock,   next: cmll,    expectedLabel: 'CMLL'       },
    { previous: rBlock,   next: eo,      expectedLabel: 'CMLL + EO'  },
    { previous: cmll,     next: eo,      expectedLabel: 'EO'         },
    { previous: cmll,     next: ulur,    expectedLabel: 'EO + UL/UR' },
    { previous: eo,       next: ulur,    expectedLabel: 'UL/UR'      },
    { previous: ulur,     next: ep,      expectedLabel: 'EP'         },
    { previous: eo,       next: ep,      expectedLabel: 'LSE'        },
  ].forEach(({ previous, next, expectedLabel }) => {
    test(`recognises ${expectedLabel}`, () => {
      expect(
        labelRouxStep(cubeAfter(previous), cubeAfter(next))
      ).toBe(expectedLabel);
    });
  });
});

describe('labelZZStep', () => {
  const scramble = "L2 B2 U' B2 U2 B2 R2 F2 D F2 R2 F' D B L2 F D L2 R U2 R'";
  const eoLine = scramble + "x2 y' F L2 F' L D";
  const lSquare = eoLine + "R U L' U2 L U' L2 U'";
  const lBlock = lSquare + "L2 U' L'";
  const rSquare = lBlock + "U R' U' R2 U' R U2";
  const rBlock = rSquare + "R2 U' R";
  const ocll = rBlock + "F' r U R' U' L' U l";
  const cpll = ocll + "x R' U R' D2 R U' R' D2 R2 x'";
  const epll = cpll + "M2' U M' U2 M U M2'";
  const auf = epll + "U2";

  [ { previous: scramble, next: eoLine,  expectedLabel: 'EOLine' },
    { previous: eoLine,   next: lSquare, expectedLabel: 'LSquare' },
    { previous: lSquare,  next: lBlock,  expectedLabel: 'LBlock'  },
    { previous: lBlock,   next: rSquare, expectedLabel: 'RSquare' },
    { previous: rSquare,  next: rBlock,  expectedLabel: 'RBlock'  },
    { previous: rBlock,   next: ocll,    expectedLabel: 'OCLL'    },
    { previous: rBlock,   next: cpll,    expectedLabel: 'COLL'    },
    { previous: ocll,     next: cpll,    expectedLabel: 'CPLL'    },
    { previous: cpll,     next: epll,    expectedLabel: 'EPLL'    },
    { previous: ocll,     next: epll,    expectedLabel: 'PLL'     },
    { previous: rBlock,   next: epll,    expectedLabel: 'ZBLL'    },
    { previous: epll,     next: auf,     expectedLabel: 'AUF'     }
  ].forEach(({ previous, next, expectedLabel }) => {
    test(`recognises ${expectedLabel}`, () => {
      expect(
        labelZZStep(cubeAfter(previous), cubeAfter(next))
      ).toBe(expectedLabel);
    });
  });
});
