---
title: 推荐资源汇总
layout: page
---

<script setup>
const sections = [
  {
    icon: '📄',
    title: '必读论文',
    color: '#6366f1',
    items: [
      { name: 'Attention Is All You Need', desc: 'Transformer 原始论文', url: 'https://arxiv.org/abs/1706.03762' },
      { name: 'ReAct', desc: '推理+行动的经典范式', url: 'https://arxiv.org/abs/2210.03629' },
      { name: 'RAG', desc: '检索增强生成原始论文', url: 'https://arxiv.org/abs/2005.11401' },
      { name: 'LLM Powered Autonomous Agents', desc: 'Lilian Weng 经典综述', url: 'https://lilianweng.github.io/posts/2023-06-23-agent/' },
      { name: 'Toolformer', desc: '模型自主学习使用工具', url: 'https://arxiv.org/abs/2302.04761' },
      { name: 'Direct Preference Optimization (DPO)', desc: 'RLHF 的简化替代', url: 'https://arxiv.org/abs/2305.18290' },
      { name: 'DeepSeek-V3 Technical Report', desc: 'MoE 架构 + GRPO', url: 'https://arxiv.org/abs/2412.19437' },
    ]
  },
  {
    icon: '🎬',
    title: '必看课程',
    color: '#8b5cf6',
    items: [
      { name: '3Blue1Brown《But what is a GPT?》', desc: '可视化讲解，B站有中文字幕', url: 'https://www.youtube.com/watch?v=wjZofJX0v4M' },
      { name: 'Karpathy《Let\'s build GPT from scratch》', desc: '从零实现 GPT，YouTube/B站', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY' },
      { name: 'Andrew Ng《AI Agentic Design Patterns》', desc: 'DeepLearning.AI 免费课程', url: 'https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns/' },
      { name: 'DeepLearning.AI《Building RAG Agents》', desc: 'RAG 实战免费短课程', url: 'https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/' },
      { name: '李沐《Transformer 论文逐行精读》', desc: 'B站有中文字幕', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
    ]
  },
  {
    icon: '💻',
    title: '必关注 GitHub',
    color: '#06b6d4',
    items: [
      { name: 'deepseek-ai/DeepSeek-V3', desc: 'DeepSeek 官方', url: 'https://github.com/deepseek-ai/DeepSeek-V3' },
      { name: 'QwenLM/Qwen2.5', desc: '通义千问', url: 'https://github.com/QwenLM/Qwen2.5' },
      { name: 'langchain-ai/langgraph', desc: 'LangGraph', url: 'https://github.com/langchain-ai/langgraph' },
      { name: 'vllm-project/vllm', desc: '推理引擎', url: 'https://github.com/vllm-project/vllm' },
      { name: 'langgenius/dify', desc: 'Dify 开源平台', url: 'https://github.com/langgenius/dify' },
      { name: 'FlagOpen/FlagEmbedding', desc: 'BGE Embedding', url: 'https://github.com/FlagOpen/FlagEmbedding' },
      { name: 'langfuse/langfuse', desc: '可观测性', url: 'https://github.com/langfuse/langfuse' },
      { name: 'datawhalechina/hello-agents', desc: '中文 Agent 教程', url: 'https://github.com/datawhalechina/hello-agents' },
    ]
  },
  {
    icon: '🎯',
    title: '面试刷题',
    color: '#f59e0b',
    items: [
      { name: 'LLM Interview Questions', desc: 'GitHub 题库合集', url: 'https://github.com/llmgenai/LLMInterviewQuestions' },
      { name: 'LLM 面试笔记', desc: '中文面试笔记', url: 'https://github.com/wdndev/llm_interview_note' },
      { name: 'Datawhale Agent 面试题总结', desc: 'Agent 专题面试', url: 'https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra01-%E9%9D%A2%E8%AF%95%E9%97%AE%E9%A2%98%E6%80%BB%E7%BB%93.md' },
      { name: '小林 coding AI 专题', desc: '图文并茂的面试指南', url: 'https://xiaolincoding.com/other/ai.html' },
    ]
  },
  {
    icon: '📖',
    title: '文字学习资料（碎片时间适用）',
    color: '#ec4899',
    items: [
      { name: 'Anthropic Prompt Engineering 指南', desc: 'Claude 官方提示工程手册，结构化、可迭代', url: 'https://docs.anthropic.com/en/docs/build-with-clause/prompt-engineering/overview' },
      { name: 'Google Prompt Engineering Guide', desc: '68页 PDF，免费下载，含交互式 notebook', url: 'https://ai.google.dev/gemini-api/docs/prompting-intro' },
      { name: 'OpenAI Cookbook', desc: '生产级代码示例，含 RAG/Agent/FC', url: 'https://cookbook.openai.com/' },
      { name: 'dair-ai/Prompt-Engineering-Guide', desc: 'GitHub 开源指南，含 Function Calling notebook', url: 'https://github.com/dair-ai/Prompt-Engineering-Guide' },
      { name: 'LearnPrompting', desc: '交互式在线手册，覆盖基础到高级', url: 'https://learnprompting.org/' },
      { name: 'Lilian Weng 博客', desc: 'OpenAI 团队，高质量技术博客', url: 'https://lilianweng.github.io/' },
      { name: 'Chip Huyen《AI Engineering》', desc: '构建可靠 AI 系统的实践指南', url: 'https://huyenchip.com/ai-engineering-handbook/' },
      { name: 'RAG 技术深入指南', desc: 'Beyond Naive RAG，Agentic RAG 实战', url: 'https://www.genaiprotos.com/blog/8-rag-architecture' },
      { name: '生产级 RAG 设计原则', desc: '检索质量、分层架构、可观测性', url: 'https://medium.com/@dhruvingale1926/how-to-design-production-ready-rag-and-ai-agent-systems-in-2026-0ab5dcddee0b' },
      { name: 'LangGraph 官方文档', desc: '状态化多 Agent 工作流，含完整教程', url: 'https://langchain-ai.github.io/langgraph/' },
      { name: 'OpenAI Agents SDK 官方文档', desc: 'Agent/Tool/Handoff/Guardrail 一站式', url: 'https://openai.github.io/openai-agents-python/quickstart/' },
      { name: 'CrewAI 官方文档', desc: '角色驱动多 Agent 协作框架', url: 'https://docs.crewai.com/' },
      { name: 'MCP 协议官方文档', desc: 'Anthropic 发布，AI 连接外部工具标准', url: 'https://modelcontextprotocol.io/' },
      { name: 'A2A 协议官方文档', desc: 'Google 发布，Agent 间通信标准', url: 'https://a2aprotocol.ai/' },
      { name: 'DeepLearning.AI《A2A Protocol》', desc: '免费短课程，Andrew Ng 主讲', url: 'https://www.deeplearning.ai/short-courses/a2a-the-agent2agent-protocol/' },
      { name: 'MachineLearningMastery Agentic AI 路线图', desc: '从数学基础到 Agent 部署的完整路径', url: 'https://machinelearningmastery.com/the-roadmap-for-mastering-agentic-ai-in-2026/' },
      { name: '6 大 Agent 框架对比', desc: 'LangGraph vs CrewAI vs PydanticAI vs OpenAI SDK', url: 'https://pub.towardsai.net/i-compared-6-python-ai-agent-frameworks-so-you-dont-have-to-langgraph-vs-crewai-vs-pydanticai-vs-d8a5e6e43262' },
      { name: 'Google Codelabs Advanced RAG', desc: '分块策略、Reranker、HyDE、Step-back', url: 'https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/8-advanced-rag-methods/advanced-rag-methods' },
      { name: 'datawhalechina/hello-agents', desc: '中文 Agent 入门教程，GitHub 开源', url: 'https://github.com/datawhalechina/hello-agents' },
      { name: 'Hugging Face NLP Course', desc: '免费交互式课程，含 Transformer/RAG', url: 'https://huggingface.co/learn/nlp-course/chapter1/1' },
    ]
  },
  {
    icon: '🛠️',
    title: '实践平台',
    color: '#10b981',
    items: [
      { name: 'Coze（扣子）', desc: '字节跳动低代码 Agent 平台', url: 'https://www.coze.cn' },
      { name: 'Dify', desc: '开源 LLM 应用平台', url: 'https://dify.ai' },
      { name: '阿里云百炼', desc: '全链路 LLM 开发', url: 'https://bailian.console.aliyun.com' },
      { name: '百度 AgentBuilder', desc: '智能体构建平台', url: 'https://agent.baidu.com' },
      { name: '华为 ModelArts Studio', desc: '一站式大模型开发', url: 'https://www.huaweicloud.com/product/modelarts.html' },
    ]
  }
]
</script>

<div class="resources-page">
  <div class="resources-hero">
    <h1>推荐资源汇总</h1>
    <p class="hero-desc">精选论文、课程、工具与平台，助你高效学习 AI Agent 开发</p>
  </div>

  <div class="resources-grid">
    <div v-for="section in sections" :key="section.title" class="resource-card">
      <div class="card-header" :style="{ borderColor: section.color }">
        <span class="card-icon">{{ section.icon }}</span>
        <h2 :style="{ color: section.color }">{{ section.title }}</h2>
        <span class="card-count">{{ section.items.length }}</span>
      </div>
      <div class="card-body">
        <a v-for="item in section.items" :key="item.name"
           :href="item.url || '#'" :target="item.url ? '_blank' : undefined"
           class="resource-item">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-desc">{{ item.desc }}</span>
          <svg v-if="item.url" class="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

<style scoped>
.resources-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.resources-hero {
  text-align: center;
  margin-bottom: 48px;
}

.resources-hero h1 {
  font-size: 2.2em;
  font-weight: 800;
  color: #6366f1;
  margin: 0 0 12px;
  line-height: 1.4;
}

.hero-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.resource-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 2px solid;
  background: var(--vp-c-bg);
}

.card-header h2 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  white-space: nowrap;
}

.card-icon {
  font-size: 22px;
}

.card-count {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
}

.card-body {
  padding: 8px 12px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s ease;
  cursor: pointer;
  flex-wrap: wrap;
}

.resource-item:hover {
  background: var(--vp-c-bg-mute);
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  flex-shrink: 0;
}

.item-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.external-icon {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.15s;
}

.resource-item:hover .external-icon {
  opacity: 1;
  color: var(--vp-c-brand-1);
}

@media (max-width: 720px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }
  .resources-hero h1 {
    font-size: 1.6em;
  }
  .resources-page {
    padding: 20px 12px 40px;
  }
  .card-header {
    padding: 12px 14px;
  }
  .card-header h2 {
    font-size: 14px;
  }
  .item-desc {
    display: none;
  }
  .resource-item {
    padding: 8px 10px;
  }
  .item-name {
    font-size: 13px;
  }
}
</style>
