import pkg from './package.json';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/solution-analyzer.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }]
      ],
      plugins: ['@babel/plugin-proposal-object-rest-spread']
    })
  ]
};
