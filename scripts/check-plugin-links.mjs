import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

const plugin = resolve(process.argv[2] || '../fluent-smtp')
const dist = new URL('../docs/.vitepress/dist-cf', import.meta.url)
const links = new Map()
function scan(path) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const file = join(path, entry.name)
    if (entry.isDirectory()) scan(file)
    else if (/\.(?:php|vue|js|json|md|txt|pot|po|html)$/.test(entry.name)) inspect(file)
  }
}
function inspect(file) {
  const content = readFileSync(file, 'utf8').replaceAll('\\/', '/')
  for (const match of content.matchAll(/https?:\/\/(?:www\.)?fluentsmtp\.com\/docs(?:-category)?(?:\/[^\s"'<>\\`)]*)?(?![\w-])/g)) {
    const url = match[0].replaceAll('&amp;', '&')
    if (!links.has(url)) links.set(url, [])
    links.get(url).push(file.slice(plugin.length + 1))
  }
}
for (const dir of ['app', 'resources', 'assets', 'language']) {
  if (existsSync(join(plugin, dir))) scan(join(plugin, dir))
}
for (const file of ['README.md', 'readme.txt', 'fluent-smtp.php']) {
  if (existsSync(join(plugin, file))) inspect(join(plugin, file))
}
assert.ok(links.size, 'No documentation links found; check the plugin path')
for (const [href, files] of [...links].sort()) {
  const url = new URL(href)
  const path = url.pathname
  const asset = path.endsWith('.json') ? path : path.replace(/\/$/, '') + '/index.html'
  assert.ok(existsSync(new URL('.' + asset, dist.href + '/')), `Missing target: ${href} (${files.join(', ')})`)
  if (process.env.DOCS_TEST_ORIGIN) {
    // Include the query parameters added by the plugin's documentation list.
    for (const query of [url.search, '?utm_source=wp&utm_medium=doc&utm_campaign=doc']) {
      const response = await fetch(process.env.DOCS_TEST_ORIGIN + path + query)
      assert.equal(response.status, 200, href)
      if (path.endsWith('.json')) {
        assert.equal((await response.json()).version, 1, href)
      } else {
        assert.match(response.headers.get('content-type'), /text\/html/, href)
        const html = await response.text()
        const canonical = 'https://fluentsmtp.com' + path.replace(/\/$/, '') + '/'
        assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `Wrong page for ${href}`)
        if (url.hash) assert.ok(html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor: ${href}`)
      }
    }
  }
  console.log(`OK ${href}`)
}
console.log(`Verified ${links.size} unique hard-coded documentation URLs across plugin sources, translations, readmes and built assets${process.env.DOCS_TEST_ORIGIN ? ', including live Worker responses and tracking queries' : ''}.`)
