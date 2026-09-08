<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
const { page } = useData()
const href = computed(() => withBase('/' + page.value.relativePath))
</script>

<template>
  <!-- Fetch the raw asset instead of letting VitePress route .md links as pages. -->
  <p class="markdown-link"><a :href="href" target="_self">Read as Markdown ↗</a></p>
</template>

<style scoped>
.markdown-link { margin: 0 0 16px; font-size: 13px; }
a { color: var(--vp-c-text-2); text-decoration: underline; text-underline-offset: 3px; }
a:hover { color: var(--vp-c-brand-1); }
</style>
