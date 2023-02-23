import path from 'node:path'
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'


const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const binDir = path.join(rootDir, `src/bin`)
const outdir = path.join(rootDir, `.bin`)

const minify = true
const binEntry = path.join(binDir, `parkin.ts`)

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
  })
  .catch(() => process.exit(1))
}


;(async () => {
  // Remove the existing output dir
  await fs.rm(outdir, { recursive: true, force: true })
  await cjsBuild()
})()


