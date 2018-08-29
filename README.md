# Solution Analyzer [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jonatanklosko/solution-analyzer/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/solution-analyzer.svg)](https://www.npmjs.com/package/solution-analyzer) [![Build Status](https://travis-ci.org/jonatanklosko/solution-analyzer.svg?branch=master)](https://travis-ci.org/jonatanklosko/solution-analyzer) [![Coverage Status](https://coveralls.io/repos/github/jonatanklosko/solution-analyzer/badge.svg?branch=master)](https://coveralls.io/github/jonatanklosko/solution-analyzer?branch=master) [![Try it on RunKit](https://badge.runkitcdn.com/solution-analyzer.svg)](https://npm.runkit.com/solution-analyzer)
A library for analyzing Rubik's Cube solutions.

## Installation
```shell
npm install --save solution-analyzer
```

## Usage
With Node
```js
const solutionAnalyzer = require('solution-analyzer');

solutionAnalyzer.analyzeSolution(...);
```

With ES6
```js
import { analyzeSolution } from 'solution-analyzer';

analyzeSolution(...);
```

## API

##### `analyzeSolution(scramble, solution, method)`
| Argument | Type | Description |
| --- | --- | --- |
| `scramble` | `string` | scrambling moves sequence |
| `solution` | `string` | full or partial solution moves sequence |
| `method`   | `string` | a speedsolving method name, either of: CFOP, Roux, ZZ. |

Returns an object representing the solution. Example: [![Try it on RunKit](https://badge.runkitcdn.com/solution-analyzer.svg)](https://runkit.com/jonatanklosko/solution-analyzer-example-usage)
```js
analyzeSolution(
  "B2 L2 D' R2 D' L2 R2 D2 B2 D' R' F2 D R F D' R D' B' L",
  "z2 L2 F' D' U R' U2 R' U R' F R2 F' R U' R' y2 U R U R' U2 y R' D' F D R U f R U R' U' f' U' B' R2 D' R U' R' D R2 U B U'",
  'CFOP'
);
// =>
{
  solved: true,
  steps: [
    {
      label: 'inspection',
      moves: ["z2"]
    }, {
      label: 'cross',
      moves: ["L2", "F'", "D'", "U", "R'"]
    }, {
      label: '1st pair',
      moves: ["U2", "R'", "U", "R'", "F", "R2", "F'"]
    }, {
      label: '2nd pair',
      moves: [ "R", "U'", "R'"]
    }, {
      label: '3rd + 4th pair',
      moves: ["y2", "U", "R", "U", "R'", "U2", "y", "R'", "D'", "F", "D", "R"]
    }, {
      label: '1LLL',
      moves: ["U", "f", "R", "U", "R'", "U'", "f'", "U'", "B'", "R2", "D'", "R", "U'", "R'", "D", "R2", "U", "B"]
    }, {
      label: 'AUF',
      moves: ["U'"]
    }
  ]
}
```
