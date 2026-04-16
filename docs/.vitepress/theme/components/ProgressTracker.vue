<template>
  <div class="progress-section" v-if="sections.length > 0">
    <div class="progress-header">
      <span class="progress-label">学习进度</span>
      <span class="progress-count">{{ completed }}/{{ sections.length }}</span>
    </div>
    <div class="progress-bar-bg">
      <div class="progress-bar-fill" :style="{ width: percentage + '%' }"></div>
    </div>
    <div class="progress-list">
      <label v-for="s in sections" :key="s.id" class="progress-item">
        <input type="checkbox" :checked="s.done" @change="toggle(s.id)" />
        <span :class="{ done: s.done }">{{ s.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'ai-learning-progress'

const sections = ref([
  { id: 's1', label: '第一阶段：AI 基础理论', done: false },
  { id: 's2', label: '第二阶段：Prompt & FC', done: false },
  { id: 's3', label: '第三阶段：工程基建', done: false },
  { id: 's4', label: '第四阶段：RAG 深度攻坚', done: false },
  { id: 's5', label: '第五阶段：Agent 架构', done: false },
  { id: 's6', label: '第六阶段：框架实战', done: false },
  { id: 's7', label: '第七阶段：MCP & A2A', done: false },
  { id: 's8', label: '第八阶段：多模态', done: false },
  { id: 's9', label: '第九阶段：部署优化', done: false },
  { id: 's10', label: '第十阶段：安全 & 可观测', done: false },
  { id: 's11', label: '第十一阶段：面试准备', done: false }
])

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const map = JSON.parse(saved)
    sections.value.forEach(s => { if (map[s.id]) s.done = true })
  }
})

const completed = computed(() => sections.value.filter(s => s.done).length)
const percentage = computed(() => Math.round((completed.value / sections.value.length) * 100))

function toggle(id) {
  const s = sections.value.find(s => s.id === id)
  if (s) s.done = !s.done
  const map = {}
  sections.value.forEach(s => { map[s.id] = s.done })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}
</script>

<style scoped>
.progress-section {
  margin: 20px 16px;
  padding: 16px;
  border-radius: 12px;
  background: var(--vp-sidebar-bg);
  border: 1px solid var(--vp-c-divider);
}
.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.progress-label { font-weight: 600; font-size: 13px; }
.progress-count { font-size: 12px; color: var(--vp-c-text-2); }
.progress-bar-bg {
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  margin-bottom: 12px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: width 0.3s ease;
}
.progress-list { display: flex; flex-direction: column; gap: 6px; }
.progress-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.progress-item input { accent-color: #6366f1; }
.progress-item .done {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}
</style>
