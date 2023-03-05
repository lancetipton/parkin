import path from 'path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import { dTSPathAliasPlugin } from 'esbuild-plugin-d-ts-path-alias'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `build`)
const esmOut = path.join(outdir, `esm`)
const cjsOut = path.join(outdir, `cjs`)
const parkinEntry = path.join(rootDir, `src/index.js`)
const globalParkin = path.join(rootDir, `src/global.js`)
const testEntry = path.join(rootDir, `src/test/index.js`)
const globalTest = path.join(rootDir, `src/test/global.js`)


const minify = true

const cjsBuild = async () => {
  // Build the files with esbuild
  await esbuild.build({
    entryPoints: [
      parkinEntry,
      testEntry,
      globalParkin,
      globalTest
    ],
    outdir: cjsOut,
    bundle: true,
    minify: minify,
    sourcemap: true,
    platform: "node",
    target: ["node16"],
  })
  .catch(() => process.exit(1))
}

const esmBuild = async () => {
  // Build the files with esbuild
  await esbuild.build({
    entryPoints: [
      parkinEntry,
      testEntry,
      globalParkin,
      globalTest
    ],
    format: "esm",
    outdir: esmOut,
    bundle: true,
    minify: minify,
    sourcemap: true,
    splitting: true,
    target: ["esnext"],
    define: { global: "window" },
    plugins: [
      dTSPathAliasPlugin({
        outputPath: esmOut,
        tsconfigPath: path.join(rootDir, 'tsconfig.json'),
      })
    ]
  })
  .catch(() => process.exit(1))
}

const entryFiles = async () => {
  // an entry file for esm at the root of the bundle
  await fs.writeFile(path.join(rootDir, "index.js"), "export * from './build/esm/index.js'")
  // an entry file for cjs at the root of the bundle
  await fs.writeFile(path.join(rootDir, "index.cjs"), "module.exports = require('./build/cjs/index.js')")
}

;(async () => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })

  await cjsBuild()
  await esmBuild()
  await entryFiles()
})()


