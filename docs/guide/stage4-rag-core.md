---
title: 4.1-4.3 RAG 演进路线 + 向量数据库 + Reranking
---

> [日期] 预计学习时间：35-40 小时

## 4.1 RAG 演进路线 

> [!] 大厂 JD 高频要求："精通 RAG 技术栈与工程实践"、"有 RAG 方案落地能力"

```
Naive RAG → Advanced RAG → Agentic RAG → Modular RAG
```

<img src="/diagrams/rag-pipeline.svg" alt="RAG全链路流程" style="max-width:100%;height:auto;" />

**Naive RAG：** 文档 → 切片 → 向量化 → 存入向量库 → 检索 → 拼入 prompt → LLM 生成

**Advanced RAG 优化手段：**

| 优化方向 | 难度 | 效果 | 大厂关注 |
|---------|------|------|---------|
| 查询改写（Query Rewriting） | ★★ | 高 | [OK] |
| 混合检索（Hybrid Search） | ★★ | 高 | [OK] |
| 重排序（Reranking） | ★★ | 很高 | [OK][OK] |
| 父文档检索（Parent Doc） | ★★ | 中 | [OK] |
| Chunk 优化策略 | ★★ | 高 | [OK] |

**Agentic RAG：** Agent 自主决定检索策略，多轮检索，判断结果是否充分。

<img src="/diagrams/rag-pipeline.svg" alt="RAG全链路流程" style="max-width:100%;height:auto;" />

## 4.2 向量数据库 

| 数据库 | 类型 | 大厂使用情况 |
|--------|------|-------------|
| **Milvus** | 分布式向量库 | [OK] 阿里、腾讯生产使用 |
| **Qdrant** | 专用向量库 | [OK] 性能高，推荐 |
| **pgvector** | PostgreSQL 扩展 | [OK] 已有 PG 基础设施首选 |
| **Elasticsearch 8.x** | 搜索引擎 | [OK] 大厂搜索团队常用 |
| ChromaDB | 嵌入式 | 开发测试用 |

**Embedding 模型选择：**
- OpenAI `text-embedding-3-small`（1536维，便宜）
- **BGE 系列**（智源，国产开源标杆）：https://github.com/FlagOpen/FlagEmbedding
- **GTE 系列**（阿里，中文效果好）：https://huggingface.co/Alibaba-NLP/gte-large-zh-v1.5

## 4.3 Reranking 

先粗检索 20 条，再用重排序模型精排到 5 条。**这是提升 RAG 准确率最有效的单点优化。**

```python
# 使用 Cohere Rerank API 或 BGE-Reranker（国产开源）
from sentence_transformers import CrossEncoder
model = CrossEncoder("BAAI/bge-reranker-v2-m3")
scores = model.predict([("查询文本", "文档1"), ("查询文本", "文档2")])
```

### 学习资料清单

**课程：**
- DeepLearning.AI《Building RAG Agents》（免费短课程）：https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/
- 极客时间《大模型应用开发实战》

**论文：**
- "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"：https://arxiv.org/abs/2005.11401
- "Dense Passage Retrieval for Open-Domain Question Answering"：https://arxiv.org/abs/2004.04906

**GitHub：**
- `milvus-io/milvus` — Milvus 官方仓库：https://github.com/milvus-io/milvus
- `FlagOpen/FlagEmbedding` — BGE Embedding 模型：https://github.com/FlagOpen/FlagEmbedding

**实践平台：**
- 百度智能体平台 AgentBuilder：https://agent.baidu.com
- 阿里云百炼平台：https://bailian.console.aliyun.com
