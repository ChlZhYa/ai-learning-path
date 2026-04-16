---
title: 4.x 高级 RAG（Agentic RAG / CRAG / GraphRAG）
---

> 原文档中未单独展开 CRAG/GraphRAG 章节，以下为 4.1 中提到的高级 RAG 内容延伸。

## Agentic RAG

Agent 自主决定检索策略，多轮检索，判断结果是否充分。这是 RAG 演进的最新方向，Agent 不再被动等待检索结果，而是主动规划和调整检索策略。

**与 Naive/Advanced RAG 的区别：**
- Naive RAG：固定流程，一次检索
- Advanced RAG：优化检索质量（改写、混合检索、Reranking）
- Agentic RAG：Agent 自主决策，可多轮检索、动态调整
