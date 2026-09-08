import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import matter from 'gray-matter'
import sidebar from '../docs/.vitepress/sidebar.mjs'

const source = new URL('../docs/', import.meta.url)
const output = new URL('../docs/.vitepress/dist/', import.meta.url)
const base = 'https://fluentsmtp.com/docs/'
function collect(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'public') return []
    const relative = prefix + entry.name
    return entry.isDirectory() ? collect(new URL(`${entry.name}/`, dir), `${relative}/`)
      : relative.endsWith('.md') && relative !== '404.md' ? [relative] : []
  })
}
const pages = collect(source).sort().map(file => {
  const { data, content } = matter(readFileSync(new URL(file, source), 'utf8'))
  if (!data.title || !data.description) throw new Error(`Missing SEO metadata: ${file}`)
  const url = base + file.replace(/index\.md$/, '').replace(/\.md$/, '/')
  // Keep code examples untouched while converting VitePress containers and URLs.
  let fence = false
  const body = content.split('\n').map(line => {
    if (/^\s*(```|~~~)/.test(line)) { fence = !fence; return line }
    if (fence) return line
    if (/^:::\s*$/.test(line)) return ''
    line = line.replace(/^:::\s+(\w+)\s*(.*)$/, (_, kind, title) => `> **${title || kind}:**`)
    return line.replace(/\]\(([^\s)]+)([^)]*)\)/g, (_, href, rest) => {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return `](${href}${rest})`
      const absolute = href.startsWith('/') ? new URL(href.replace(/^\/(?:docs\/)?/, '/docs/'), base).href : new URL(href, url).href
      return `](${absolute}${rest})`
    })
  }).join('\n').trim()
  return { file, title: data.title, description: data.description, url, body }
})
const links = pages.filter(page => page.file !== 'index.md').map(page => `- [${page.title}](${page.url}index.md): ${page.description}`).join('\n')
const index = `# FluentSMTP documentation\n\n> Official setup and troubleshooting documentation for the free FluentSMTP WordPress plugin.\n\nRead individual guides as Markdown using the links below, or request a documentation page with Accept: text/markdown. Cite the canonical HTML source URL included in each guide.\n\n## Documentation\n\n${links}\n\n## Optional\n\n- [Complete documentation](${base}llms-full.txt): All guides in one text file.\n- [XML sitemap](${base}sitemap.xml): Canonical HTML pages.\n`
for (const page of pages) {
  page.markdown = `${page.body || `# ${page.title}\n\n${page.description}\n\n${links}`}\n\n---\nSource: ${page.url}\n`
  const target = new URL(page.file, output)
  mkdirSync(dirname(target.pathname), { recursive: true })
  writeFileSync(target, page.markdown)
}
writeFileSync(new URL('llms.txt', output), index)
writeFileSync(new URL('llms-full.txt', output), `# FluentSMTP complete documentation\n\n${pages.map(page => page.markdown).join('\n\n---\n\n')}`)
console.log(`Generated Markdown for ${pages.length} pages and AI discovery files.`)

// Share the website's category ordering and membership with the plugin.
const articles = pages.filter(page => page.file !== 'index.md')
const docs = sidebar.flatMap(group => group.items.map(item => {
  const page = articles.find(page => page.url === base + item.link.replace(/^\//, ''))
  if (!page) throw new Error(`Sidebar article missing: ${item.link}`)
  return {
    id: page.file.replace(/\/index\.md$/, ''),
    title: page.title,
    description: page.description,
    content: page.body,
    link: page.url,
    category: { value: group.text.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label: group.text }
  }
}))
if (docs.length !== articles.length || new Set(docs.map(doc => doc.id)).size !== articles.length) {
  throw new Error('Every documentation article must appear exactly once in the sidebar')
}
mkdirSync(new URL('api/v1/', output), { recursive: true })
writeFileSync(new URL('api/v1/docs.json', output), JSON.stringify({ version: 1, docs }))
console.log(`Generated plugin index for ${docs.length} articles.`)
