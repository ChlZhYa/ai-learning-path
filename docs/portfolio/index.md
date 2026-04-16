---
title: 持仓分析仪表盘
layout: page
---

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const API_URL = '/portfolio/data/analysis.json'

const data = ref(null)
const loading = ref(true)
const error = ref(null)
const lastUpdate = ref('')
const autoRefresh = ref(true)
let timer = null

const adviceColor = (advice) => {
  if (!advice) return '#999'
  const a = advice.toLowerCase()
  if (a.includes('买入') || a.includes('加仓')) return '#22c55e'
  if (a.includes('卖出') || a.includes('减仓') || a.includes('止损')) return '#ef4444'
  if (a.includes('观望')) return '#f59e0b'
  return '#3b82f6'
}

const scoreColor = (score) => {
  if (score >= 75) return '#22c55e'
  if (score >= 60) return '#3b82f6'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

const scoreLabel = (score) => {
  if (score >= 75) return '强势看多'
  if (score >= 60) return '偏多'
  if (score >= 40) return '中性'
  return '偏空'
}

const fetchData = async () => {
  try {
    loading.value = true
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data.value = await res.json()
    lastUpdate.value = new Date().toLocaleTimeString('zh-CN')
    error.value = null
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
  timer = setInterval(fetchData, 30 * 60 * 1000) // 30分钟刷新
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<div class="dashboard">
  <div class="dash-header">
    <h1>📊 持仓分析仪表盘</h1>
    <div class="dash-meta">
      <span v-if="lastUpdate" class="update-time">🔄 更新于 {{ lastUpdate }}</span>
      <span class="refresh-info">每30分钟自动刷新</span>
    </div>
  </div>

  <div v-if="loading && !data" class="loading">⏳ 正在加载数据...</div>
  <div v-else-if="error" class="error">
    ❌ 加载失败: {{ error }}
    <button @click="fetchData" class="retry-btn">重试</button>
  </div>
  <template v-else-if="data">
    <!-- 总览 -->
    <div class="overview">
      <div class="ov-card">
        <div class="ov-label">持仓数量</div>
        <div class="ov-value">{{ data.stocks.length }}</div>
      </div>
      <div class="ov-card">
        <div class="ov-label">看多</div>
        <div class="ov-value green">{{ data.stocks.filter(s => s.sentiment_score >= 60).length }}</div>
      </div>
      <div class="ov-card">
        <div class="ov-label">中性</div>
        <div class="ov-value yellow">{{ data.stocks.filter(s => s.sentiment_score >= 40 && s.sentiment_score < 60).length }}</div>
      </div>
      <div class="ov-card">
        <div class="ov-label">偏空</div>
        <div class="ov-value red">{{ data.stocks.filter(s => s.sentiment_score < 40).length }}</div>
      </div>
    </div>

    <!-- 股票卡片 -->
    <div class="stock-grid">
      <div v-for="stock in data.stocks" :key="stock.code" class="stock-card">
        <div class="card-top">
          <div class="stock-info">
            <span class="stock-name">{{ stock.name }}</span>
            <span class="stock-code">{{ stock.code }}</span>
          </div>
          <div class="stock-score" :style="{ borderColor: scoreColor(stock.sentiment_score), color: scoreColor(stock.sentiment_score) }">
            <div class="score-num">{{ stock.sentiment_score }}</div>
            <div class="score-label">{{ scoreLabel(stock.sentiment_score) }}</div>
          </div>
        </div>

        <div class="card-price">
          <span class="price">¥{{ stock.price?.toFixed(3) || '-' }}</span>
          <span class="pct" :class="stock.pct_chg >= 0 ? 'up' : 'down'">
            {{ stock.pct_chg >= 0 ? '+' : '' }}{{ stock.pct_chg?.toFixed(2) }}%
          </span>
        </div>

        <div class="card-advice" :style="{ borderColor: adviceColor(stock.operation_advice), color: adviceColor(stock.operation_advice) }">
          {{ stock.operation_advice || '暂无建议' }}
        </div>

        <div class="card-prices">
          <div class="price-item">
            <span class="pi-label">买入价</span>
            <span class="pi-val">¥{{ stock.ideal_buy?.toFixed(2) || '-' }}</span>
          </div>
          <div class="price-item">
            <span class="pi-label">止损价</span>
            <span class="pi-val red">¥{{ stock.stop_loss?.toFixed(2) || '-' }}</span>
          </div>
          <div class="price-item">
            <span class="pi-label">目标价</span>
            <span class="pi-val green">¥{{ stock.take_profit?.toFixed(2) || '-' }}</span>
          </div>
        </div>

        <div class="card-summary" v-if="stock.analysis_summary">
          {{ stock.analysis_summary }}
        </div>

        <div class="card-meta">
          <span>分析于 {{ stock.analyzed_at?.replace('T', ' ').slice(0, 16) }}</span>
        </div>
      </div>
    </div>
  </template>
</div>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}
.dash-header {
  text-align: center;
  margin-bottom: 32px;
}
.dash-header h1 {
  font-size: 2em;
  margin: 0 0 8px;
}
.dash-meta {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}
.update-time { color: var(--vp-c-brand-1); font-weight: 600; }
.overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
.ov-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}
.ov-label { font-size: 13px; color: var(--vp-c-text-3); margin-bottom: 8px; }
.ov-value { font-size: 2em; font-weight: 800; }
.ov-value.green { color: #22c55e; }
.ov-value.yellow { color: #f59e0b; }
.ov-value.red { color: #ef4444; }
.stock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}
.stock-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stock-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.stock-name { font-size: 16px; font-weight: 700; display: block; }
.stock-code { font-size: 12px; color: var(--vp-c-text-3); }
.stock-score {
  text-align: center;
  padding: 8px 16px;
  border: 2px solid;
  border-radius: 12px;
  min-width: 72px;
}
.score-num { font-size: 24px; font-weight: 800; line-height: 1.2; }
.score-label { font-size: 11px; opacity: 0.8; }
.card-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
}
.price { font-size: 20px; font-weight: 700; }
.pct { font-size: 14px; font-weight: 600; }
.pct.up { color: #22c55e; }
.pct.down { color: #ef4444; }
.card-advice {
  padding: 8px 14px;
  border-left: 4px solid;
  border-radius: 0 8px 8px 0;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 12px;
}
.card-prices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.price-item {
  text-align: center;
  padding: 8px 4px;
  background: var(--vp-c-bg);
  border-radius: 8px;
}
.pi-label { font-size: 11px; color: var(--vp-c-text-3); display: block; }
.pi-val { font-size: 14px; font-weight: 700; }
.pi-val.green { color: #22c55e; }
.pi-val.red { color: #ef4444; }
.card-summary {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 8px;
  max-height: 120px;
  overflow-y: auto;
}
.card-meta {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: right;
}
.loading, .error {
  text-align: center;
  padding: 64px;
  font-size: 16px;
  color: var(--vp-c-text-2);
}
.retry-btn {
  margin-top: 12px;
  padding: 8px 20px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .overview { grid-template-columns: repeat(2, 1fr); }
  .stock-grid { grid-template-columns: 1fr; }
  .dash-header h1 { font-size: 1.4em; }
}
</style>
