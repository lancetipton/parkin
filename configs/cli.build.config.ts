import path from 'node:path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'node:fs'
import packConf from '../package.json'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const binDir = path.join(rootDir, `src/bin`)
const outdir = path.join(rootDir, `.bin`)

const minify = false
const binEntry = path.join(binDir, `parkin.js`)

const cjsBuild = async () => {
  // Build the files with esbuild
  await esbuild.build({
    outdir,
    bundle: true,
    minify: minify,
    sourcemap: true,
    platform: "node",
    target: ["node16"],
    entryPoints: [binEntry],
    external: Object.keys(packConf.dependencies),
  })
  .catch(() => process.exit(1))
}


;(async () => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  await cjsBuild()
})()


