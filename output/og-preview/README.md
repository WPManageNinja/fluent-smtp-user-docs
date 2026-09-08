# Documentation feature images

28 unique covers in `docs/public/og/`: one for each of the 27 guides and one homepage social cover. All exports are 1200 × 630 JPEGs. Built-in imagegen was used with the approved dashboard design as a reference; the exact prompts and source image paths are recorded in `prompts.json`.

`docs/.vitepress/feature-images.json` maps pages to cover files, alt text and their design briefs. VitePress adds the corresponding image to each article header and emits per-page Open Graph, Twitter large-image and structured-data image metadata. The custom homepage keeps its existing visible hero and uses its new cover for social sharing. The 404 page remains noindex.

Review `gallery.html` for all covers. `article-desktop.png` and `article-mobile.png` show integration on the dashboard guide. `gallery.png` is a full gallery screenshot.

Validation completed:

- Production build: passed.
- TypeScript and discovery checks: passed for all 28 pages, including visible article covers, image files and social metadata.
- Final JPEG dimensions: all 28 confirmed as 1200 × 630.
- OCR title/subtitle checks: 27 exact normalized matches. The homepage OCR mistook the dot on the i in “email”; visually verified correct spelling in the actual image.
- Gallery visually reviewed; desktop and mobile article layout reviewed.
- No deployment or commit performed.
