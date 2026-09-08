import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import matter from 'gray-matter'
import { prefersMarkdown } from '../worker/index.ts'

const dist = new URL('../docs/.vitepress/dist-cf/docs/', import.meta.url)
const sitemap = readFileSync(new URL('sitemap.xml', dist), 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
const sources = readdirSync(new URL('../docs/', import.meta.url), { recursive: true })
  .filter(path => path.endsWith('.md') && !path.startsWith('.') && !path.startsWith('public/') && path !== '404.md')
const featureImages = JSON.parse(readFileSync(new URL('../docs/.vitepress/feature-images.json', import.meta.url), 'utf8'))
assert.equal(featureImages.length, sources.length, 'Every page needs a feature image')
assert.equal(new Set(featureImages.map(image => image.image)).size, sources.length, 'Feature images must be unique')
assert.equal(urls.length, sources.length, 'Every source page must appear in the sitemap')
assert.equal(new Set(urls).size, urls.length)
const index = JSON.parse(readFileSync(new URL('api/v1/docs.json', dist), 'utf8'))
assert.equal(index.version, 1)
assert.equal(index.docs.length, sources.length - 1)
assert.equal(new Set(index.docs.map(doc => doc.id)).size, index.docs.length)
for (const doc of index.docs) {
  assert.ok(urls.includes(doc.link) && doc.link !== 'https://fluentsmtp.com/docs/')
  for (const value of [doc.id, doc.title, doc.description, doc.content, doc.category.value, doc.category.label]) {
    assert.equal(typeof value, 'string')
    assert.ok(value.length > 0)
  }
}
const llms = readFileSync(new URL('llms.txt', dist), 'utf8')
const full = readFileSync(new URL('llms-full.txt', dist), 'utf8')
for (const url of urls) {
  assert.ok(url.startsWith('https://fluentsmtp.com/docs/') && url.endsWith('/'))
  assert.ok(!url.includes('404'))
  const path = url.slice('https://fluentsmtp.com/docs/'.length)
  const html = readFileSync(new URL(`${path}index.html`, dist), 'utf8')
  assert.ok(html.includes(`<link rel="canonical" href="${url}">`), url)
  assert.ok(html.includes('type="application/ld+json"'))
  assert.ok(html.includes('favicon-32x32.png'))
  const feature = featureImages.find(image => image.slug === (path.replace(/\/$/, '') || 'index'))
  assert.ok(feature, `Missing feature image for ${url}`)
  const imageURL = `https://fluentsmtp.com/docs${feature.image}`
  assert.ok(existsSync(new URL(feature.image.slice(1), dist)), `Missing image asset for ${url}`)
  assert.ok(html.includes(`<meta property="og:image" content="${imageURL}">`), url)
  assert.ok(html.includes('<meta property="og:image:width" content="1200">'), url)
  assert.ok(html.includes('<meta property="og:image:height" content="630">'), url)
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image">'), url)
  assert.ok(html.includes(`<meta name="twitter:image" content="${imageURL}">`), url)
  assert.ok(!html.includes('class="doc-feature-image"'), `Social cover must not appear in the article: ${url}`)
  assert.ok(!html.includes(`src="/docs${feature.image}"`), url)
  assert.ok(html.includes(`href="${url}index.md"`))
  const markdown = readFileSync(new URL(`${path}index.md`, dist), 'utf8')
  assert.ok(markdown.startsWith('# '))
  assert.ok(markdown.includes(`Source: ${url}`))
  assert.ok(!markdown.includes('](/'), 'Markdown links must be absolute')
  assert.ok(full.includes(`Source: ${url}`))
  if (path) assert.ok(llms.includes(`${url}index.md`))
  const source = matter(readFileSync(new URL(`../docs/${path}index.md`, import.meta.url), 'utf8'))
  assert.ok(html.includes(source.data.title.replaceAll('&', '&amp;')))
}
assert.ok(readFileSync(new URL('404.html', dist), 'utf8').includes('content="noindex"'))
for (const file of ['favicon-32x32.png', 'favicon-192x192.png', 'apple-touch-icon.png']) assert.ok(existsSync(new URL(file, dist)))
for (const [accept, expected] of [
  ['', false], ['*/*', false], ['text/html,application/xhtml+xml,*/*;q=0.8', false],
  ['text/markdown', true], ['text/markdown;q=0', false],
  ['text/markdown;q=0.5,text/html', false], ['text/html;q=0.5,text/markdown', true],
  ['text/markdown;q=invalid', false], ['text/markdown;q=0.5,*/*', false]
]) assert.equal(prefersMarkdown(accept), expected, accept)

if (process.env.DOCS_TEST_ORIGIN) {
  const origin = process.env.DOCS_TEST_ORIGIN
  const feed = await fetch(origin + '/docs/api/v1/docs.json')
  assert.equal(feed.status, 200)
  assert.match(feed.headers.get('content-type'), /application\/json/)
  assert.deepEqual(await feed.json(), index)
  const feedHead = await fetch(origin + '/docs/api/v1/docs.json', { method: 'HEAD' })
  assert.equal(feedHead.status, 200)
  assert.equal(await feedHead.text(), '')
  for (const url of urls) {
    const path = new URL(url).pathname
    const html = await fetch(origin + path)
    assert.equal(html.status, 200, path)
    assert.match(html.headers.get('content-type'), /text\/html/)
    assert.match(html.headers.get('vary'), /Accept/)
    const md = await fetch(origin + path, { headers: { Accept: 'text/markdown' } })
    assert.equal(md.status, 200, path)
    assert.match(md.headers.get('content-type'), /text\/markdown/)
    assert.match(md.headers.get('link'), /rel="canonical"/)
    assert.equal(md.headers.get('x-robots-tag'), null)
    const direct = await fetch(origin + path + 'index.md')
    assert.equal(direct.headers.get('x-robots-tag'), 'noindex')
    assert.equal(await direct.text(), await md.text())
  }
  for (const accept of ['text/html', 'text/markdown']) {
    const missing = await fetch(origin + '/docs/not-a-real-document/', { headers: { Accept: accept } })
    assert.equal(missing.status, 404)
    assert.equal(missing.headers.get('x-robots-tag'), 'noindex')
  }
  const redirect = await fetch(origin + '/docs-category/drivers/', { redirect: 'manual' })
  assert.equal(redirect.status, 301)
  assert.ok(redirect.headers.get('location').endsWith('/docs/configurable-email-delivery-providers/'))
  for (const path of ['sitemap.xml', 'llms.txt', 'llms-full.txt', 'favicon-32x32.png']) {
    assert.equal((await fetch(origin + '/docs/' + path)).status, 200)
  }
  const head = await fetch(origin + '/docs/installing-fluent-smtp/', { method: 'HEAD', headers: { Accept: 'text/markdown' } })
  assert.equal(head.status, 200)
  assert.match(head.headers.get('content-type'), /text\/markdown/)
  assert.equal(await head.text(), '')
}
console.log(`Verified discovery metadata, sitemap and Markdown for ${urls.length} pages${process.env.DOCS_TEST_ORIGIN ? ', including live Worker responses' : ''}.`)
