import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'docs/.vitepress/dist')
const staged = join(root, 'docs/.vitepress/dist-cf')
const nested = join(staged, 'docs')

rmSync(staged, { recursive: true, force: true })
mkdirSync(nested, { recursive: true })
cpSync(dist, nested, { recursive: true })
// Workers 404-page looks for 404.html at the assets root, not under /docs/.
cpSync(join(dist, '404.html'), join(staged, '404.html'))
