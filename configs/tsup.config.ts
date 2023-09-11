import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/global.ts',
    'src/parkin.ts',
    'src/test/index.ts',
    'src/test/global.ts',
    'src/bin/reporters/index.ts',
  ],
  outDir: 'build',
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
})
