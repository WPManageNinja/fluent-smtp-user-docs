import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DocsHome from './components/DocsHome.vue'
import SiteHeader from './components/SiteHeader.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-top': () => h(SiteHeader),
    'home-hero-before': () => h(DocsHome)
  })
} satisfies Theme
