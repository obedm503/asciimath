import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/asciimath.ts',
  plugins: [typescript(), resolve()],
  output: [
    {
      file: 'dist/asciimath.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/asciimath.mjs',
      format: 'esm',
    },
    {
      file: 'dist/asciimath.js',
      format: 'umd',
      name: 'asciimath',
    },
  ],
};
export default config;
