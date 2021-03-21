import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import resolve from '@rollup/plugin-node-resolve'
import buildHook from './buildHook'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'

const config = {
  input: 'src/index.js',
  output: [
    {
      dir: 'build/esm',
      format: 'esm',
      sourcemap: !isProd
    },
    {
      dir: `./build/cjs`,
      format: 'cjs',
      sourcemap: !isProd
    },
  ],
  plugins: [
    buildHook(),
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    cleanup(),
    isProd &&
      terser({
        mangle: true,
        toplevel: false,
        keep_fnames: true,
        keep_classnames: true,
      }),
  ],
}

export default config
