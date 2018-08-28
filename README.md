# Solution Analyzer
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

Returns an object representing the solution. Example:
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
