import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

/**
 * @param {import('rollup').RollupOptions} [override]
 * @returns {import('rollup').RollupOptions}
 */
function config(override = {}) {
  return {
    input: 'src/asciimath.ts',
    external: source => /lodash/.test(source),
    ...override,
  };
}

export default [
  // node builds
  config({
    plugins: [resolve(), commonjs(), typescript({ module: 'ESNext' })],
    output: [
      {
        file: 'dist/asciimath.cjs',
        format: 'commonjs',
      },
      {
        file: 'dist/asciimath.mjs',
        format: 'module',
      },
    ],
  }),
  // browser builds
  // TODO: browser bundles still include all of lodash!
  config({
    external: [],
    output: [
      {
        name: 'asciimath',
        file: 'dist/asciimath.js',
        format: 'iife',
      },
      {
        name: 'asciimath',
        file: 'dist/asciimath.min.js',
        format: 'iife',
        plugins: [terser()], // minifies
      },
    ],
  }),
];
