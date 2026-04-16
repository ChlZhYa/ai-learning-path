---
title: 5.1-5.3 Agent 核心概念与设计模式
---

> [日期] 预计学习时间：40-50 小时

## 5.1 AI Agent 核心概念 

AI Agent 是能**自主感知环境、做出决策、使用工具、完成目标**的 AI 系统。

**Agent 的核心循环：**
```
感知 → 推理 → 行动 → 观察 → 感知 → ...
```

## 5.2 Agent 核心组件 

<img src="/diagrams/agent-arch.svg" alt="Agent核心架构" style="max-width:100%;height:auto;" />

| 组件 | 说明 | 大厂关注点 |
|------|------|-----------|
| LLM（大脑） | 推理和决策 | 模型选型、成本控制 |
| Memory（记忆） | 短期/长期记忆 | 记忆管理架构、上下文窗口优化 |
| Tools（工具） | 与外部系统交互 | MCP 标准化、权限控制 |
| Planning（规划） | 分解复杂任务 | CoT、ReAct、多步推理 |

## 5.3 经典设计模式 

<img src="/diagrams/react-loop.svg" alt="ReAct循环" style="max-width:100%;height:auto;" />

**模式一：ReAct（Reasoning + Acting）** — 最经典，交替推理和行动

**模式二：Plan-and-Execute** — 先规划后执行，适合复杂任务

**模式三：多 Agent 协作（Multi-Agent）**
- **主从模式（Orchestrator-Worker）：** 字节跳动 Coze 的核心模式
- **辩论模式（Debate）：** 多 Agent 讨论，达成共识
- **流水线模式（Pipeline）：** 串行处理

**模式四：Reflection（自我反思）** — Agent 检查输出，发现问题后修正

**大厂面试常问：**
- "ReAct 和 Plan-and-Execute 的区别？" → ReAct 是逐步推理执行，Plan-and-Execute 是先完整规划再执行
- "如何防止 Agent 死循环？" → 设置最大步数、超时机制、重复检测
- "多 Agent 协作的通信机制？" → 共享状态、消息队列、MCP/A2A 协议

### 学习资料清单

**论文：**
- "ReAct: Synergizing Reasoning and Acting in Language Models"：https://arxiv.org/abs/2210.03629
- "LLM Powered Autonomous Agents" (Lilian Weng)：https://lilianweng.github.io/posts/2023-06-23-agent/
- "A Survey on Large Language Model based Autonomous Agents"：https://arxiv.org/abs/2308.11432
- "Reflexion: Language Agents with Verbal Reinforcement Learning"：https://arxiv.org/abs/2303.11366

**GitHub：**
- `langchain-ai/langgraph` — LangGraph 官方仓库：https://github.com/langchain-ai/langgraph
- `datawhalechina/hello-agents` — Datawhale Agent 教程（中文）：https://github.com/datawhalechina/hello-agents

**课程：**
- Andrew Ng《AI Agentic Design Patterns》（DeepLearning.AI，免费）：https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns/
