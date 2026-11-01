/**
 * Optimises real ACA Pozhichalur Ministries photography for the portfolio.
 * Source assets live in the existing church website project, not in this repo.
 *
 * Usage:
 *   npm run optimize:images
 *   ACA_SOURCE="D:/path/to/new-church-site" npm run optimize:images
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

const DEFAULT_SOURCE = path.join(
  os.homedir(),
  'OneDrive',
  'Desktop',
  'new-church-site',
  'public',
  'images',
)

const source = process.env.ACA_SOURCE || DEFAULT_SOURCE
const outDir = path.join(process.cwd(), 'public', 'images', 'work')

const jobs = [
  { from: 'hero/image2.jpeg', to: 'aca-ministries-01.webp', width: 2000 },
  { from: 'gallery/image4.jpeg', to: 'aca-ministries-02.webp', width: 1600 },
  { from: 'gallery/image5.jpeg', to: 'aca-ministries-03.webp', width: 1600 },
  { from: 'image6.jpeg', to: 'aca-ministries-04.webp', width: 1600 },
]

await mkdir(outDir, { recursive: true })

for (const job of jobs) {
  const input = path.join(source, job.from)
  const output = path.join(outDir, job.to)
  const info = await stat(input)
  await sharp(input)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(output)
  const out = await stat(output)
  console.log(
    `${job.to.padEnd(30)} ${Math.round(info.size / 1024)} KB → ${Math.round(out.size / 1024)} KB`,
  )
}

console.log('\nDone. Review the crops before launch — see CONTENT-TODO.md.')
