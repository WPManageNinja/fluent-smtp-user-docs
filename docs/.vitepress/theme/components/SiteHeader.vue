<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, withBase } from 'vitepress'
import groups from './header-menu.json'

const route = useRoute()
const openGroup = ref<string | null>(null)
const hoveredGroup = ref<string | null>(null)
const activeGroup = computed(() => openGroup.value || hoveredGroup.value)
function closeGroups() { openGroup.value = null; hoveredGroup.value = null }
const header = ref<HTMLElement>()
const drawer = ref<HTMLDialogElement>()
const toggle = ref<HTMLButtonElement>()
const mobileOpen = ref(false)
const pluginsOpen = ref(false)
const download = 'https://wordpress.org/plugins/fluent-smtp/'
const article = 'https://fluentsmtp.com/articles/wordpress-email-settings-smtp-configuration/'
const href = (url: string) => url === '/docs/' ? withBase('/') : url
const mobileLinks = [
  ['Getting Started', 'https://fluentsmtp.com/getting-started/'],
  ['Why FluentSMTP?', 'https://fluentsmtp.com/why-fluentsmtp/'],
  ['SMTP Integrations', 'https://fluentsmtp.com/smtp-integrations/'],
  ['Compare', 'https://fluentsmtp.com/comparisons/'],
  ['Articles', 'https://fluentsmtp.com/articles/']
]
let previousOverflow = ''
function updateHeaderOffset() {
  const visible = Math.max(0, header.value?.getBoundingClientRect().bottom ?? 0)
  document.documentElement.style.setProperty('--site-header-visible', `${visible}px`)
}
function closeMobile() { drawer.value?.close() }
function onDrawerClose() {
  mobileOpen.value = false
  pluginsOpen.value = false
  document.body.style.overflow = previousOverflow
  toggle.value?.focus()
}
function openMobile() {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  mobileOpen.value = true
  drawer.value?.showModal()
}
function dismiss(event: PointerEvent) {
  if (!header.value?.contains(event.target as Node)) closeGroups()
}
function escape(event: KeyboardEvent) {
  if (event.key === 'Escape' && activeGroup.value) {
    const name = activeGroup.value
    closeGroups()
    header.value?.querySelector<HTMLButtonElement>(`[data-group="${name}"]`)?.focus()
  }
}
function onFocusOut(event: FocusEvent) {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) closeGroups()
}
function toggleGroup(label: string) { hoveredGroup.value = null; openGroup.value = openGroup.value === label ? null : label }
watch(() => route.path, () => { closeGroups(); if (mobileOpen.value) closeMobile() })
onMounted(() => {
  document.addEventListener('pointerdown', dismiss)
  document.addEventListener('keydown', escape)
  window.addEventListener('scroll', updateHeaderOffset, { passive: true })
  updateHeaderOffset()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderOffset)
  document.documentElement.style.removeProperty('--site-header-visible')
  document.removeEventListener('pointerdown', dismiss)
  document.removeEventListener('keydown', escape)
  if (mobileOpen.value) document.body.style.overflow = previousOverflow
})
</script>

<template>
  <header ref="header" class="site-header" aria-label="FluentSMTP website">
    <div class="site-header-inner">
      <a class="site-brand" href="https://fluentsmtp.com/" aria-label="FluentSMTP home">
        <img :src="withBase('/header/logo.png')" alt="FluentSMTP" width="200" height="30">
      </a>
      <nav class="site-navigation" aria-label="Main website navigation">
        <ul class="site-menu">
          <li><a href="https://fluentsmtp.com/why-fluentsmtp/">Why FluentSMTP?</a></li>
          <li><a href="https://fluentsmtp.com/features/">Features</a></li>
          <li v-for="(group, index) in groups" :key="group.label" class="has-dropdown"
            @pointerenter="(event) => { if (event.pointerType === 'mouse') hoveredGroup = group.label }"
            @pointerleave="closeGroups" @focusout="onFocusOut">
            <div class="menu-trigger">
              <a v-if="group.href" :href="group.href">{{ group.label }}</a>
              <button v-else class="menu-label" :data-group="group.label" :aria-expanded="activeGroup === group.label" :aria-controls="`site-menu-${index}`" @click="toggleGroup(group.label)">{{ group.label }}<span class="chevron" aria-hidden="true"></span></button>
              <button v-if="group.href" class="submenu-toggle" :data-group="group.label" :aria-label="`Toggle ${group.label} menu`" :aria-expanded="activeGroup === group.label" :aria-controls="`site-menu-${index}`" @click="toggleGroup(group.label)"><span class="chevron" aria-hidden="true"></span></button>
            </div>
            <div v-show="activeGroup === group.label" :id="`site-menu-${index}`" class="site-dropdown" :class="{ 'resources-dropdown': group.label === 'Resources', 'compare-dropdown': group.label === 'Compare' }">
              <ul class="dropdown-links" :class="{ 'single-column': group.label === 'Resources' }">
                <li v-for="item in group.items" :key="item.href">
                  <a :href="href(item.href)" :aria-current="item.href === '/docs/' ? 'location' : undefined" @click="closeGroups">
                    <img v-if="'image' in item" :src="withBase(item.image)" alt="" width="32" height="32" loading="lazy">
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>
                    <span>{{ item.label }}</span>
                  </a>
                </li>
              </ul>
              <a v-if="group.label === 'Resources'" class="resource-article" :href="article">
                <img :src="withBase('/header/resource-article.png')" alt="" width="308" height="161" loading="lazy">
                <span>A Complete Guide to WordPress Email Settings and SMTP Configuration</span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <a class="site-download" :href="download">Get FluentSMTP <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 12H3v9h18v-9h-2"/></svg></a>
      <button ref="toggle" class="mobile-toggle" aria-label="Open website menu" :aria-expanded="mobileOpen" aria-controls="website-mobile-menu" @click="openMobile"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M3 5h18M3 12h18M3 19h18"/></svg></button>
    </div>
    <dialog id="website-mobile-menu" ref="drawer" class="mobile-drawer" aria-label="Website navigation" @close="onDrawerClose" @click="(event) => { if (event.target === drawer) closeMobile() }">
      <div class="mobile-drawer-inner">
        <button class="drawer-close" aria-label="Close website menu" autofocus @click="closeMobile"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>
        <nav aria-label="Mobile website navigation">
          <ul>
            <li v-for="[label, url] in mobileLinks" :key="url"><a :href="url" @click="closeMobile">{{ label }}</a></li>
            <li>
              <button class="mobile-plugins-toggle" :aria-expanded="pluginsOpen" aria-controls="mobile-plugins" @click="pluginsOpen = !pluginsOpen">Our Plugins <span class="chevron" aria-hidden="true"></span></button>
              <ul v-show="pluginsOpen" id="mobile-plugins" class="mobile-plugins"><li v-for="item in groups[3].items" :key="item.href"><a :href="item.href" @click="closeMobile">{{ item.label }}</a></li></ul>
            </li>
            <li><a href="https://fluentsmtp.com/contact-us/" @click="closeMobile">Contact Us</a></li>
            <li><a :href="download" @click="closeMobile">Get FluentSMTP</a></li>
          </ul>
        </nav>
      </div>
    </dialog>
  </header>
</template>

<style scoped>
.site-header { position: relative; z-index: 50; flex-shrink: 0; height: 80px; border-bottom: 1px solid var(--vp-c-divider); background: var(--site-header-bg); color: var(--site-header-text); font-family: Inter, var(--vp-font-family-base), sans-serif; }
.site-header-inner { height: 100%; max-width: 1280px; padding: 0 39px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.site-brand { flex: 0 0 200px; }
.site-brand img { width: 200px; height: auto; display: block; }
ul { list-style: none; margin: 0; padding: 0; }
.site-menu { display: flex; align-items: center; }
.site-menu > li > a, .menu-trigger { display: flex; align-items: center; min-height: 44px; font-size: 14px; font-weight: 500; line-height: 1; white-space: nowrap; }
.site-menu > li > a { padding: 15px 10px; }
.menu-trigger > a { padding: 15px 0 15px 10px; }
.menu-label { display: flex; align-items: center; gap: 5px; padding: 15px 10px; font: inherit; }
.submenu-toggle { display: flex; align-items: center; justify-content: center; width: 22px; height: 44px; }
.chevron { display: inline-block; width: 5px; height: 5px; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; transform: translateY(-2px) rotate(45deg); }
a, button { transition: color .15s, background-color .15s; }
a:hover, button:hover { color: #c716c1; }
a:focus-visible, button:focus-visible { outline: 2px solid #c716c1; outline-offset: 4px; border-radius: 3px; }
.site-download { flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px; border-radius: 5px; padding: 12px 20px; background: #c716c1; color: #fff; font-size: 16px; font-weight: 600; line-height: 27px; }
.site-download:hover { background: #9e0099; color: #fff; }
.has-dropdown { position: static; }
.site-dropdown { position: absolute; top: 80px; left: 50%; transform: translateX(-50%); width: min(1063px, calc(100vw - 80px)); padding: 30px 40px; background: var(--site-header-bg); color: var(--site-header-text); box-shadow: 0 15px 20px #0002; border-radius: 0 0 10px 10px; }
.site-dropdown::before { content: ''; position: absolute; height: 18px; bottom: 100%; left: 0; right: 0; }
.dropdown-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px 24px; }
.dropdown-links a { display: flex; align-items: center; gap: 14px; min-height: 62px; padding: 12px; font-size: 16px; line-height: 1.5; border-radius: 5px; }
.dropdown-links a:hover { background: var(--site-menu-hover); }
.dropdown-links img { flex-shrink: 0; width: 32px; height: 32px; object-fit: contain; }
.resources-dropdown { width: 680px; left: auto; right: max(40px, calc((100vw - 1202px) / 2 + 80px)); transform: none; display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; }
.single-column { grid-template-columns: 1fr; gap: 0; }
.single-column a { min-height: 50px; border-bottom: 1px solid var(--vp-c-divider); padding: 10px 4px; }
.resource-article { border-radius: 10px; overflow: hidden; box-shadow: 0 3px 16px #0000000a; font-size: 14px; font-weight: 600; line-height: 1.5; align-self: start; }
.resource-article img { width: 100%; height: auto; }
.resource-article span { display: block; padding: 14px 16px; }
.compare-dropdown { width: 760px; }
.mobile-toggle { display: none; align-items: center; justify-content: center; width: 44px; height: 44px; color: var(--site-header-text); }
.mobile-drawer { inset: 0 0 0 auto; margin: 0; padding: 0; width: min(345px, 90vw); max-width: 100%; height: 100dvh; max-height: 100dvh; border: 0; background: var(--site-drawer-bg); color: var(--site-header-text); }
.mobile-drawer::backdrop { background: #0006; }
.mobile-drawer-inner { min-height: 100%; padding: 52px 18px 32px 24px; }
.drawer-close { position: absolute; top: 6px; right: 12px; width: 44px; height: 44px; display: grid; place-items: center; }
.mobile-drawer nav a, .mobile-plugins-toggle { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 15px 8px; border-bottom: 1px solid var(--vp-c-divider); font-size: 16px; line-height: 20px; text-align: left; }
.mobile-plugins { padding-left: 16px; }
.mobile-plugins a { font-size: 14px !important; }
@media (max-width: 1199px) {
  .site-navigation, .site-download { display: none; }
  .mobile-toggle { display: flex; }
  .site-header-inner { padding: 0 24px; }
}
@media (max-width: 767px) { .site-header-inner { padding: 0 16px; } }
@media (prefers-reduced-motion: reduce) { a, button { transition: none; } }
</style>
