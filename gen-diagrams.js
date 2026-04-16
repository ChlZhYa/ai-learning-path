const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'docs', 'public', 'diagrams');

// Color palette
const C = {
  primary: '#6366f1', secondary: '#8b5cf6', accent: '#f59e0b',
  green: '#10b981', red: '#ef4444', cyan: '#06b6d4',
  text: '#1e293b', subtext: '#64748b', bg: '#fafbfc',
  divider: '#e2e8f0',
};

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="max-width:100%;height:auto;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"><rect width="${w}" height="${h}" fill="${C.bg}" rx="12"/>${body}</svg>`;
}

function rect(x, y, w, h, fill, stroke, r = 8) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
}

function text(x, y, content, size = 14, color = C.text, anchor = 'middle', weight = '600') {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${content}</text>`;
}

function arrow(x1, y1, x2, y2, color = C.subtext, dashed = false) {
  const dash = dashed ? ' stroke-dasharray="6,4"' : '';
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5"${dash}/><polygon points="${x2},${y2} ${x2-6},${y2-4} ${x2-6},${y2+4}" fill="${color}"/>`;
}

function arrowCurve(x1, y1, cx, cy, x2, y2, color = C.subtext) {
  return `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" fill="none" stroke="${color}" stroke-width="1.5"/><polygon points="${x2},${y2} ${x2-6},${y2-4} ${x2-6},${y2+4}" fill="${color}"/>`;
}

// ========== 1. gantt.svg - Modern Gantt Chart ==========
function genGantt() {
  const w = 820, h = 520;
  const items = [
    { label: 'AI 基础理论', start: 0, dur: 3, color: C.primary, hours: '30-40h' },
    { label: 'Prompt & FC', start: 2, dur: 2.5, color: '#7c3aed', hours: '30-35h' },
    { label: '工程基建', start: 4, dur: 1.5, color: C.secondary, hours: '15-20h' },
    { label: 'RAG 深度攻坚', start: 5, dur: 3, color: '#a78bfa', hours: '35-40h' },
    { label: 'Agent 架构', start: 7, dur: 4, color: C.primary, hours: '40-50h' },
    { label: '框架实战', start: 9, dur: 3.5, color: '#7c3aed', hours: '35-40h' },
    { label: 'MCP & A2A', start: 12, dur: 1.5, color: C.secondary, hours: '15-20h' },
    { label: '多模态', start: 13, dur: 1.5, color: '#a78bfa', hours: '15-20h' },
    { label: '部署优化', start: 14, dur: 2, color: C.primary, hours: '20-25h' },
    { label: '安全 & 可观测', start: 16, dur: 1.5, color: '#7c3aed', hours: '15-20h' },
    { label: '面试准备', start: 17, dur: 3, color: C.accent, hours: '50-60h' },
  ];
  const left = 140, right = 780, top = 80, rowH = 38;
  const weekW = (right - left) / 20;
  let body = '';
  body += text(w/2, 32, '20 周学习路线', 20, C.primary, 'middle', '700');
  body += text(w/2, 52, '总时长 300-350 小时', 12, C.subtext, 'middle', '400');
  // Week headers
  for (let i = 0; i <= 20; i += 2) {
    const x = left + i * weekW;
    body += text(x, top - 8, `W${i}`, 10, C.subtext, 'middle', '400');
    if (i % 4 === 0) body += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + items.length * rowH + 10}" stroke="${C.divider}" stroke-width="1" stroke-dasharray="4,4"/>`;
  }
  // Bars
  items.forEach((item, i) => {
    const y = top + i * rowH + 8;
    const x = left + item.start * weekW;
    const bw = item.dur * weekW;
    body += `<rect x="${x}" y="${y}" width="${bw}" height="24" rx="6" fill="${item.color}20" stroke="${item.color}" stroke-width="1.5"/>`;
    body += text(x + bw/2, y + 16, item.hours, 11, item.color, 'middle', '600');
    body += text(left - 10, y + 16, item.label, 13, C.text, 'end', '500');
  });
  return svg(w, h, body);
}

// ========== 2. transformer-arch.svg - Modern Architecture ==========
function genTransformer() {
  const w = 720, h = 360;
  let body = '';
  body += text(360, 36, 'Transformer 三大架构分支', 18, C.primary, 'middle', '700');
  // Center box
  body += rect(280, 55, 160, 44, C.primary + '15', C.primary, 8);
  body += text(360, 82, 'Transformer', 15, C.primary, 'middle', '700');
  // Three branches
  const branches = [
    { label: 'Encoder-only', sub: 'BERT · RoBERTa · DeBERTa', color: C.cyan, x: 120, use: '文本理解/分类/NER' },
    { label: 'Decoder-only', sub: 'GPT · LLaMA · DeepSeek', color: C.green, x: 360, use: '文本生成/对话/代码' },
    { label: 'Encoder-Decoder', sub: 'T5 · BART · mBART', color: C.accent, x: 600, use: '翻译/摘要/语音' },
  ];
  branches.forEach(b => {
    arrowCurve(360, 99, b.x, 120, b.x, 140, b.color);
    body += rect(b.x - 90, 140, 180, 70, b.color + '12', b.color, 8);
    body += text(b.x, 165, b.label, 14, b.color, 'middle', '700');
    body += text(b.x, 185, b.sub, 10, C.subtext, 'middle', '400');
    // Use cases
    body += rect(b.x - 85, 225, 170, 32, C.bg, C.divider, 6);
    body += text(b.x, 246, b.use, 11, C.subtext, 'middle', '400');
    arrow(b.x, 210, b.x, 225, C.divider);
  });
  // Key concepts at bottom
  const concepts = ['Self-Attention', 'Cross-Attention', 'Position Encoding', 'Layer Norm', 'FFN'];
  concepts.forEach((c, i) => {
    const x = 100 + i * 140;
    body += rect(x - 55, 300, 110, 30, C.primary + '08', C.divider, 6);
    body += text(x, 320, c, 11, C.subtext, 'middle', '500');
  });
  return svg(w, h, body);
}

// ========== 3. finetune-evolution.svg - Evolution Timeline ==========
function genFinetune() {
  const w = 760, h = 220;
  let body = '';
  body += text(380, 32, '微调方法演进', 18, C.primary, 'middle', '700');
  const items = [
    { label: 'SFT', sub: '监督微调\n问答对训练', color: C.primary, x: 95 },
    { label: 'RLHF', sub: '人类反馈\n奖励模型+PPO', color: '#7c3aed', x: 265 },
    { label: 'DPO', sub: '直接偏好优化\n无需奖励模型', color: C.secondary, x: 435 },
    { label: 'LoRA/QLoRA', sub: '参数高效微调\n低成本适配', color: C.green, x: 605 },
  ];
  // Timeline line
  body += `<line x1="95" y1="100" x2="605" y2="100" stroke="${C.divider}" stroke-width="2"/>`;
  items.forEach((item, i) => {
    const nx = i < items.length - 1 ? items[i+1].x : item.x;
    arrow(item.x, 100, nx, 100, item.color);
    // Circle on timeline
    body += `<circle cx="${item.x}" cy="100" r="8" fill="${item.color}"/>`;
    // Card above
    body += rect(item.x - 65, 50, 130, 36, item.color + '15', item.color, 8);
    body += text(item.x, 73, item.label, 16, item.color, 'middle', '700');
    // Description below
    const lines = item.sub.split('\n');
    lines.forEach((line, li) => {
      body += text(item.x, 125 + li * 16, line, 11, C.subtext, 'middle', '400');
    });
  });
  return svg(w, h, body);
}

// ========== 4. rag-pipeline.svg - Pipeline Flow ==========
function genRagPipeline() {
  const w = 860, h = 160;
  let body = '';
  body += text(430, 30, 'RAG 全链路流程', 16, C.primary, 'middle', '700');
  const steps = [
    { label: '文档加载', sub: 'PDF/HTML/MD', color: C.primary },
    { label: '分块', sub: 'Chunk Split', color: '#7c3aed' },
    { label: '嵌入', sub: 'Embedding', color: C.secondary },
    { label: '向量存储', sub: 'Vector DB', color: C.green },
    { label: '检索', sub: 'Retrieval', color: C.cyan },
    { label: '重排', sub: 'Reranking', color: C.accent },
    { label: '生成', sub: 'LLM Output', color: C.red },
  ];
  const gap = 110, startX = 65;
  steps.forEach((s, i) => {
    const x = startX + i * gap;
    body += rect(x - 45, 55, 90, 50, s.color + '12', s.color, 8);
    body += text(x, 78, s.label, 12, s.color, 'middle', '700');
    body += text(x, 94, s.sub, 9, C.subtext, 'middle', '400');
    if (i < steps.length - 1) arrow(x + 45, 80, x + gap - 45, 80, C.divider);
  });
  // Query arrow
  body += `<path d="M${startX + 4 * gap - 45},55 Q${startX + 4 * gap - 45},42 ${startX + 4 * gap - 45},80" fill="none" stroke="${C.accent}" stroke-width="1.5" stroke-dasharray="4,3"/>`;
  body += text(startX + 4 * gap - 45, 48, '用户 Query', 10, C.accent, 'middle', '500');
  return svg(w, h, body);
}

// ========== 5. agent-arch.svg - Agent Architecture ==========
function genAgentArch() {
  const w = 520, h = 340;
  let body = '';
  body += text(260, 30, 'Agent 核心架构', 18, C.primary, 'middle', '700');
  // Center LLM
  body += rect(195, 55, 130, 50, C.primary + '15', C.primary, 10);
  body += text(260, 78, 'LLM', 18, C.primary, 'middle', '700');
  body += text(260, 95, '大脑', 11, C.subtext, 'middle', '400');
  // Surrounding components
  const comps = [
    { label: 'Memory', sub: '记忆', color: C.green, x: 80, y: 55 },
    { label: 'Tools', sub: '工具', color: C.accent, x: 440, y: 55 },
    { label: 'Planning', sub: '规划', color: C.secondary, x: 80, y: 165 },
    { label: 'Action', sub: '执行', color: C.red, x: 440, y: 165 },
  ];
  comps.forEach(c => {
    body += rect(c.x - 50, c.y, 100, 44, c.color + '12', c.color, 8);
    body += text(c.x, c.y + 22, c.label, 13, c.color, 'middle', '700');
    body += text(c.x, c.y + 38, c.sub, 10, C.subtext, 'middle', '400');
  });
  // Arrows to center
  arrow(130, 77, 195, 77, C.green);
  arrow(325, 77, 390, 77, C.accent);
  arrow(130, 187, 195, 130, C.secondary);
  arrow(325, 130, 390, 187, C.red);
  // User input at bottom
  body += rect(185, 260, 150, 40, C.primary + '10', C.primary, 8);
  body += text(260, 284, 'User Input', 13, C.primary, 'middle', '600');
  arrow(260, 240, 260, 260, C.primary);
  // Output
  body += rect(185, 315, 150, 0, C.green + '10', C.green, 8);
  body += text(260, 320, 'Output → User', 12, C.green, 'middle', '500');
  arrow(260, 105, 260, 125, C.divider, true);
  // Loop arrow
  body += `<path d="M325,100 Q380,100 380,140 Q380,200 330,200 L270,200" fill="none" stroke="${C.subtext}" stroke-width="1.5" stroke-dasharray="5,3"/>`;
  body += `<polygon points="${270},200 ${278},196 ${278},204" fill="${C.subtext}"/>`;
  body += text(395, 155, '循环', 10, C.subtext, 'start', '400');
  return svg(w, h, body);
}

// ========== 6. react-loop.svg - ReAct Cycle (hand-drawn feel OK here) ==========
function genReactLoop() {
  const w = 480, h = 280;
  let body = '';
  body += text(240, 30, 'ReAct 推理循环', 18, C.primary, 'middle', '700');
  // Three nodes in triangle
  const nodes = [
    { label: 'Thought', sub: '推理思考', color: C.primary, x: 240, y: 100 },
    { label: 'Action', sub: '调用工具', color: C.accent, x: 400, y: 200 },
    { label: 'Observation', sub: '观察结果', color: C.green, x: 80, y: 200 },
  ];
  nodes.forEach(n => {
    body += `<circle cx="${n.x}" cy="${n.y}" r="42" fill="${n.color}10" stroke="${n.color}" stroke-width="2"/>`;
    body += text(n.x, n.y - 4, n.label, 14, n.color, 'middle', '700');
    body += text(n.x, n.y + 14, n.sub, 10, C.subtext, 'middle', '400');
  });
  // Arrows
  arrowCurve(278, 110, 360, 140, 362, 175, C.primary);
  arrowCurve(362, 225, 200, 250, 120, 225, C.accent);
  arrowCurve(100, 175, 160, 140, 205, 110, C.green);
  // Loop label
  body += text(240, 260, '循环直到得到最终答案', 12, C.subtext, 'middle', '400');
  return svg(w, h, body);
}

// ========== 7. domestic-models.svg - Ecosystem Radial ==========
function genDomesticModels() {
  const w = 700, h = 460;
  let body = '';
  body += text(350, 30, '国产大模型生态', 18, C.primary, 'middle', '700');
  // Center
  body += `<circle cx="350" cy="240" r="55" fill="${C.primary}12" stroke="${C.primary}" stroke-width="2"/>`;
  body += text(350, 235, '国产大模型', 13, C.primary, 'middle', '700');
  body += text(350, 252, '生态', 13, C.primary, 'middle', '700');
  const models = [
    { label: 'DeepSeek', sub: 'V3 / R1', color: C.accent, x: 350, y: 90 },
    { label: 'Qwen', sub: '通义千问', color: '#7c3aed', x: 540, y: 160 },
    { label: 'GLM', sub: '智谱 ChatGLM', color: C.green, x: 540, y: 320 },
    { label: '文心一言', sub: 'ERNIE / Paddle', color: C.red, x: 350, y: 390 },
    { label: '月之暗面', sub: 'Kimi', color: C.cyan, x: 160, y: 320 },
    { label: '豆包', sub: '字节跳动', color: C.secondary, x: 160, y: 160 },
  ];
  models.forEach(m => {
    body += `<line x1="350" y1="240" x2="${m.x}" y2="${m.y}" stroke="${m.color}40" stroke-width="1.5"/>`;
    body += rect(m.x - 55, m.y - 28, 110, 56, m.color + '10', m.color, 8);
    body += text(m.x, m.y - 6, m.label, 13, m.color, 'middle', '700');
    body += text(m.x, m.y + 14, m.sub, 10, C.subtext, 'middle', '400');
  });
  return svg(w, h, body);
}

// ========== 8. multi-agent.svg - Multi-Agent Patterns ==========
function genMultiAgent() {
  const w = 620, h = 480;
  let body = '';
  body += text(310, 28, 'Multi-Agent 协作模式', 18, C.primary, 'middle', '700');
  // Pattern 1: Hierarchical
  body += text(120, 55, '① 主从模式', 13, C.primary, 'middle', '600');
  body += rect(85, 65, 70, 32, C.primary + '15', C.primary, 6);
  body += text(120, 86, 'Boss', 12, C.primary, 'middle', '700');
  ['Worker A', 'Worker B', 'Worker C'].forEach((w, i) => {
    const wx = 50 + i * 50;
    body += rect(wx - 20, 120, 40, 26, C.secondary + '12', C.secondary, 5);
    body += text(wx, 138, `W${i+1}`, 10, C.secondary, 'middle', '600');
    arrow(120, 97, wx, 120, C.divider);
  });
  // Pattern 2: Peer
  body += text(430, 55, '② 对等模式', 13, C.accent, 'middle', '600');
  const peers = [{l:'A',x:360},{l:'B',x:430},{l:'C',x:500}];
  peers.forEach(p => {
    body += rect(p.x-20, 65, 40, 32, C.accent + '12', C.accent, 6);
    body += text(p.x, 86, p.l, 12, C.accent, 'middle', '700');
  });
  arrow(380, 81, 410, 81, C.divider);
  arrow(450, 81, 480, 81, C.divider);
  body += `<line x1="380" y1="75" x2="480" y2="75" stroke="${C.divider}40" stroke-width="1" stroke-dasharray="3,3"/>`;
  // Pattern 3: Pipeline
  body += text(120, 200, '③ 流水线模式', 13, C.green, 'middle', '600');
  const pipe = [{l:'输入',x:50},{l:'处理',x:120},{l:'输出',x:190}];
  pipe.forEach((p,i) => {
    body += rect(p.x-25, 215, 50, 30, C.green + '12', C.green, 6);
    body += text(p.x, 235, p.l, 11, C.green, 'middle', '600');
    if (i < pipe.length - 1) arrow(p.x + 25, 230, pipe[i+1].x - 25, 230, C.divider);
  });
  // Pattern 4: Debate
  body += text(430, 200, '④ 辩论模式', 13, C.red, 'middle', '600');
  body += rect(370, 215, 50, 30, C.red + '12', C.red, 6);
  body += text(395, 235, 'Agent A', 10, C.red, 'middle', '600');
  body += rect(440, 215, 50, 30, C.cyan + '12', C.cyan, 6);
  body += text(465, 235, 'Agent B', 10, C.cyan, 'middle', '600');
  body += `<line x1="420" y1="230" x2="440" y2="230" stroke="${C.subtext}" stroke-width="1.5"/>`;
  body += `<text x="430" y="222" font-size="9" fill="${C.subtext}" text-anchor="middle">↔</text>`;
  body += rect(390, 265, 80, 28, C.primary + '10', C.primary, 6);
  body += text(430, 284, 'Judge', 11, C.primary, 'middle', '600');
  arrow(395, 245, 415, 265, C.divider);
  arrow(465, 245, 445, 265, C.divider);
  // Comparison table
  const rows = [
    ['模式', '适用场景', '通信复杂度'],
    ['主从', '任务分解', '低'],
    ['对等', '协作决策', '中'],
    ['流水线', '串行处理', '低'],
    ['辩论', '质量提升', '高'],
  ];
  body += text(310, 340, '模式对比', 14, C.text, 'middle', '600');
  rows.forEach((row, ri) => {
    const y = 360 + ri * 28;
    const cols = [130, 300, 480];
    const widths = [130, 160, 130];
    if (ri === 0) {
      cols.forEach((cx, ci) => {
        body += rect(cx - widths[ci]/2, y - 14, widths[ci], 24, C.primary + '10', C.divider, 4);
        body += text(cx, y + 2, row[ci], 11, C.primary, 'middle', '600');
      });
    } else {
      cols.forEach((cx, ci) => {
        body += text(cx, y + 2, row[ci], 11, ri % 2 === 0 ? C.text : C.subtext, 'middle', '400');
      });
    }
  });
  return svg(w, h, body);
}

// ========== 9. security-layers.svg - Layered Defense ==========
function genSecurityLayers() {
  const w = 500, h = 380;
  let body = '';
  body += text(250, 30, 'Agent 安全防御层次', 18, C.primary, 'middle', '700');
  const cx = 200, cy = 210;
  const layers = [
    { r: 150, color: C.red, label: '输入过滤', desc: 'Prompt注入防护' },
    { r: 120, color: C.accent, label: '输入输出分离', desc: '数据隔离' },
    { r: 90, color: '#eab308', label: '输出验证', desc: '结果校验' },
    { r: 60, color: C.green, label: '权限控制', desc: '最小权限' },
    { r: 30, color: C.cyan, label: '沙箱执行', desc: '隔离环境' },
  ];
  layers.forEach(l => {
    body += `<circle cx="${cx}" cy="${cy}" r="${l.r}" fill="${l.color}08" stroke="${l.color}" stroke-width="1.5"/>`;
  });
  body += text(cx, cy + 4, 'LLM', 10, C.primary, 'middle', '700');
  // Legend
  layers.forEach((l, i) => {
    const ly = 80 + i * 48;
    body += rect(370, ly, 12, 12, l.color, 'none', 3);
    body += text(390, ly + 10, l.label, 12, C.text, 'start', '500');
    body += text(390, ly + 26, l.desc, 10, C.subtext, 'start', '400');
  });
  body += text(250, 370, '从外到内：防御层层递进', 11, C.subtext, 'middle', '400');
  return svg(w, h, body);
}

// ========== 10. distributed-deploy.svg ==========
function genDistributedDeploy() {
  const w = 720, h = 380;
  let body = '';
  body += text(360, 30, '分布式部署架构', 18, C.primary, 'middle', '700');
  // Layers
  const layers = [
    { label: '用户层', items: ['Web App', 'Mobile SDK', 'API Client'], color: C.green, y: 60 },
    { label: '接入层', items: ['Nginx / Gateway', 'Load Balancer', 'Rate Limiter'], color: C.primary, y: 140 },
    { label: '推理层', items: ['vLLM / TGI', 'Model Shard 1', 'Model Shard 2'], color: C.secondary, y: 220 },
    { label: '基础设施', items: ['K8s / Docker', 'GPU Node Pool', 'Monitoring'], color: C.accent, y: 300 },
  ];
  layers.forEach(layer => {
    body += rect(40, layer.y, 640, 60, layer.color + '06', layer.color + '30', 8);
    body += text(70, layer.y + 20, layer.label, 12, layer.color, 'start', '700');
    layer.items.forEach((item, i) => {
      const x = 200 + i * 190;
      body += rect(x - 75, layer.y + 12, 150, 36, layer.color + '12', layer.color, 6);
      body += text(x, layer.y + 35, item, 11, layer.color, 'middle', '500');
    });
    if (layer.y < 300) arrow(360, layer.y + 60, 360, layer.y + 85, C.divider);
  });
  // Cache layer between inference and gateway
  body += rect(620, 170, 80, 30, C.cyan + '12', C.cyan, 6);
  body += text(660, 190, 'Redis Cache', 10, C.cyan, 'middle', '500');
  body += `<line x1="620" y1="185" x2="560" y2="185" stroke="${C.cyan}40" stroke-width="1" stroke-dasharray="4,3"/>`;
  return svg(w, h, body);
}

// Generate all
const generators = {
  'gantt.svg': genGantt,
  'transformer-arch.svg': genTransformer,
  'finetune-evolution.svg': genFinetune,
  'rag-pipeline.svg': genRagPipeline,
  'agent-arch.svg': genAgentArch,
  'react-loop.svg': genReactLoop,
  'domestic-models.svg': genDomesticModels,
  'multi-agent.svg': genMultiAgent,
  'security-layers.svg': genSecurityLayers,
  'distributed-deploy.svg': genDistributedDeploy,
};

for (const [name, gen] of Object.entries(generators)) {
  const content = gen();
  fs.writeFileSync(path.join(dir, name), content);
  console.log(`✓ Generated ${name} (${content.length} bytes)`);
}
