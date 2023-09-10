import path from 'node:path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dtsPlugin } from 'esbuild-plugin-d.ts'
import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck'
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build`)
const esmOut = path.join(outdir, `esm`)
const cjsOut = path.join(outdir, `cjs`)
const parkinEntry = path.join(rootDir, `src/index.js`)
const globalParkin = path.join(rootDir, `src/global.js`)
const testEntry = path.join(rootDir, `src/test/index.js`)
const globalTest = path.join(rootDir, `src/test/global.js`)
const reportersEntry = path.join(rootDir, `src/bin/reporters/index.js`)
const pluginsEntry = path.join(rootDir, `plugins/index.js`)

const minify = false

const shared = {
  bundle: true,
  minify: minify,
  sourcemap: true,
  treeShaking: true,
  entryPoints: [
    testEntry,
    globalTest,
    parkinEntry,
    globalParkin,
    reportersEntry,
    pluginsEntry,
  ],
}

const cjsBuild = async () => {
  // Build the files with esbuild
  await esbuild
    .build({
      ...shared,
      outdir: cjsOut,
      platform: 'node',
      target: ['node16'],
      plugins: [nodeModulesPolyfillPlugin()],
    })
    .catch(() => process.exit(1))
}

const esmBuild = async () => {
  // Build the files with esbuild
  await esbuild
    .build({
      ...shared,
      format: 'esm',
      outdir: esmOut,
      splitting: true,
      target: ['esnext'],
      define: { global: 'window' },
      plugins: [nodeModulesPolyfillPlugin(), typecheckPlugin(), dtsPlugin()],
    })
    .catch(() => process.exit(1))
}

;(async () => {
  await cjsBuild()
  await esmBuild()
})()
