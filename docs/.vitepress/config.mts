import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Learning Path',
  description: 'AI Agent 开发学习路线 · 大厂冲刺版',
  lang: 'zh-CN',
  appearance: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap', media: 'print', onload: "this.media='all'" }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '学习路线', link: '/guide/' },
      { text: '面试专题', link: '/guide/interview' },
      { text: '资源汇总', link: '/guide/resources' },
      { text: '📈', link: '/portfolio/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '前言',
          items: [
            { text: '前言与总览', link: '/guide/preface' }
          ]
        },
        {
          text: '第一阶段：AI 基础理论',
          collapsed: false,
          items: [
            { text: '1.1 Transformer 架构', link: '/guide/stage1-transformer' },
            { text: '1.2 LLM 原理', link: '/guide/stage1-llm' },
            { text: '1.3 国产模型生态', link: '/guide/stage1-domestic-models' }
          ]
        },
        {
          text: '第二阶段：Prompt 与 FC',
          collapsed: true,
          items: [
            { text: '2.1 Prompt Engineering', link: '/guide/stage2-prompt' },
            { text: '2.2 Function Calling', link: '/guide/stage2-function-calling' }
          ]
        },
        {
          text: '第三阶段：工程基建',
          collapsed: true,
          items: [
            { text: '3.1 Python 异步与 Pydantic', link: '/guide/stage3-python' },
            { text: '3.2 分布式基础', link: '/guide/stage3-fastapi' }
          ]
        },
        {
          text: '第四阶段：RAG 深度攻坚',
          collapsed: true,
          items: [
            { text: '4.1 RAG 核心链路', link: '/guide/stage4-rag-core' },
            { text: '4.2 进阶架构', link: '/guide/stage4-rag-advanced' }
          ]
        },
        {
          text: '第五阶段：Agent 架构',
          collapsed: true,
          items: [
            { text: '5.1 核心架构模式', link: '/guide/stage5-agent-arch' },
            { text: '5.2 评估与 Multi-Agent', link: '/guide/stage5-multi-agent' }
          ]
        },
        {
          text: '第六阶段：框架实战',
          collapsed: true,
          items: [
            { text: '6.1 框架对比与选型', link: '/guide/stage6-frameworks' },
            { text: '6.2 LangGraph 实战', link: '/guide/stage6-langgraph' },
            { text: '6.3 OpenAI Agents SDK', link: '/guide/stage6-openai-sdk' },
            { text: '6.4 CrewAI & AutoGen', link: '/guide/stage6-crewai-autogen' }
          ]
        },
        {
          text: '第七阶段：MCP 与 A2A',
          collapsed: true,
          items: [
            { text: '7.1 MCP 协议', link: '/guide/stage7-mcp' },
            { text: '7.2 A2A 协议', link: '/guide/stage7-a2a' }
          ]
        },
        {
          text: '第八阶段：多模态',
          collapsed: true,
          items: [
            { text: '8.1 视觉与音频', link: '/guide/stage8-multimodal' }
          ]
        },
        {
          text: '第九阶段：部署优化',
          collapsed: true,
          items: [
            { text: '9.1 推理框架与量化', link: '/guide/stage9-deployment' },
            { text: '9.2 分布式部署', link: '/guide/stage9-quantization' }
          ]
        },
        {
          text: '第十阶段：安全与可观测',
          collapsed: true,
          items: [
            { text: '10.1 安全防御', link: '/guide/stage10-security' },
            { text: '10.2 可观测性', link: '/guide/stage10-observability' }
          ]
        },
        {
          text: '第十一阶段：实战与面试',
          collapsed: true,
          items: [
            { text: '11.1 项目实战', link: '/guide/stage11-projects' },
            { text: '11.2 面试题集', link: '/guide/interview' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { translations: { button: { buttonText: '搜索文档' } } }
        }
      }
    },
    outline: {
      label: '页面导航',
      level: [2, 3]
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
