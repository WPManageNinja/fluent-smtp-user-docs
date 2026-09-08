<script setup lang="ts">
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <img
    v-if="frontmatter.image"
    class="doc-feature-image"
    :src="withBase(frontmatter.image)"
    :alt="frontmatter.imageAlt || ''"
    width="1200"
    height="630"
    decoding="async"
    fetchpriority="high"
  >
</template>

<style scoped>
.doc-feature-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 630;
  margin: 0 0 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>
