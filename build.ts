import { watcherPlugin, serverPlugin } from '@e3o/bun-builder-plugins'
import type { BuildConfig } from 'bun'

const builderConfig: BuildConfig = {
  compile: false,
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  sourcemap: 'inline',
  target: 'browser',
}

await Bun.build({
  ...builderConfig,
  plugins: [
    watcherPlugin(builderConfig, './public', './dist'),
    serverPlugin(8081, './dist'),
  ]
})