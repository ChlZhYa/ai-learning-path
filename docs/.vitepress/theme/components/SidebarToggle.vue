<template>
  <button class="sidebar-toggle-btn" @click="toggleSidebar" :title="collapsed ? '展开侧边栏' : '收起侧边栏'">
    <svg v-if="!collapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M11 19l-7-7 7-7"/><path d="M18 5l-7 7 7 7"/>
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M13 17l5-5-5-5"/><path d="M6 7l5 5-5 5"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const collapsed = ref(false)
let observer = null

function toggleSidebar() {
  collapsed.value = !collapsed.value
  document.body.classList.toggle('sidebar-collapsed', collapsed.value)
}

// Observe actual sidebar state to sync button
onMounted(() => {
  collapsed.value = document.body.classList.contains('sidebar-collapsed')
  
  // Use MutationObserver to watch for class changes on body
  observer = new MutationObserver(() => {
    collapsed.value = document.body.classList.contains('sidebar-collapsed')
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.sidebar-toggle-btn {
  position: fixed;
  bottom: 24px;
  left: 16px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.sidebar-toggle-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: scale(1.05);
}
@media (max-width: 960px) {
  .sidebar-toggle-btn { display: none; }
}
</style>
