import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import resolve from '@rollup/plugin-node-resolve'

const config = {
  input: 'src/index.js',
  output: [
    {
      dir: 'build/esm',
      format: 'esm',
      sourcemap: true
    },
    {
      dir: `./build/cjs`,
      format: 'cjs',
      sourcemap: true
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    cleanup(),
  ],
}

export default config
