import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import resolve from '@rollup/plugin-node-resolve'
import buildHook from './buildHook'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'

const config = {
  input: {
    index: 'src/index.js',
    test: 'src/test/index.js',
    global: 'src/test/global.js',
  },
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
    {
      dir: `./build/system`,
      format: 'system',
      sourcemap: !isProd,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    cleanup(),
    // isProd &&
    //   terser({
    //     mangle: true,
    //     toplevel: false,
    //     keep_fnames: true,
    //     keep_classnames: true,
    //   }),
    buildHook()
  ],
}

export default config
