/**
 * @Author: Caven Chen
 */

'use strict'

import fse from 'fs-extra'
import path from 'path'
import gulp from 'gulp'
import esbuild from 'esbuild'
import startServer from './server.js'
import inlineImage from 'esbuild-plugin-inline-image'
import { sassPlugin } from 'esbuild-sass-plugin'
import shell from 'shelljs'
import chalk from 'chalk'

const buildConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  color: true,
  legalComments: `inline`,
  logLimit: 0,
  target: `es2019`,
  minify: false,
  sourcemap: false,
  write: true,
  logLevel: 'info',
  plugins: [
    inlineImage({
      limit: -1,
    }),
    sassPlugin(),
  ],
}

async function buildCSS(options) {
  await esbuild.build({
    ...buildConfig,
    minify: !!options.minify,
    entryPoints: ['src/themes/index.scss'],
    outfile: path.join('dist', 'dmt.min.css'),
  })
}

async function buildModules(options) {
  // Build IIFE
  if (options.iife) {
    await esbuild.build({
      ...buildConfig,
      format: 'iife',
      globalName: 'DM',
      minify: !!options.minify,
      outfile: path.join('dist', 'dmt.min.js'),
    })
  }

  // Build Node
  if (options.node) {
    await esbuild.build({
      ...buildConfig,
      format: 'esm',
      platform: 'node',
      minify: options.minify,
      define: {
        TransformStream: 'null',
      },
      outfile: path.join('dist', 'index.js'),
    })
  }
}

async function regenerate(option, content) {
  await fse.remove('dist/dmt.min.js')
  await fse.remove('dist/dmt.min.css')
  await buildModules(option)
  await buildCSS(option)
}

export const server = gulp.series(startServer)

export const dev = gulp.series(() => {
  shell.echo(chalk.yellow('============= start dev =============='))
  const watcher = gulp.watch('src', {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
  })
  watcher
    .on('ready', async () => {
      await regenerate({ iife: true })
      await startServer()
    })
    .on('change', async () => {
      let now = new Date().getTime()
      await regenerate({ iife: true })
      shell.echo(
        chalk.green(`regenerate lib takes ${new Date().getTime() - now} ms`)
      )
    })
  return watcher
})

export const buildIIFE = gulp.series(
  () => buildModules({ iife: true }),
  () => buildCSS({ minify: true })
)

export const buildNode = gulp.series(
  () => buildModules({ node: true }),
  () => buildCSS({ minify: true })
)

export const build = gulp.series(
  () => buildModules({ iife: true }),
  () => buildModules({ node: true }),
  () => buildCSS({ minify: true })
)

export const buildRelease = gulp.series(
  () => buildModules({ iife: true, minify: true }),
  () => buildModules({ node: true, minify: true }),
  () => buildCSS({ minify: true })
)
