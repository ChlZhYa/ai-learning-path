---
title: 11.2 大厂常考面试题清单
---

## 基础理论题

**Q1: Transformer 的自注意力机制是如何工作的？**
> 答：输入序列通过 Q、K、V 三个线性变换得到查询、键、值矩阵。注意力分数 = softmax(QK^T / √d_k) × V。每个位置通过注意力分数加权聚合所有位置的值，实现全局依赖建模。多头注意力通过多组 QKV 并行计算，捕捉不同类型的语义关系。

**Q2: GPT 和 BERT 的核心区别是什么？**
> 答：GPT 是 Decoder-only（自回归生成），适合生成任务；BERT 是 Encoder-only（双向编码），适合理解任务。当前 Agent 场景主要用 Decoder-only 架构（GPT、DeepSeek、Qwen）。

**Q3: 什么是 LoRA？为什么它能高效微调？**
> 答：LoRA（Low-Rank Adaptation）冻结原始权重，在每层旁路添加低秩矩阵 A×B（rank 远小于原始维度）。只训练 A 和 B，参数量减少 90%+。原理是模型微调时的权重变化具有低秩特性。

**Q4: DeepSeek V3 的 MoE 架构是什么？**
> 答：Mixture of Experts，671B 总参数但每次推理只激活 37B（约 5.5%）。通过 Router 网络为每个 token 选择 top-K 个专家。优点：大模型的效果 + 小模型的推理成本。使用 Auxiliary-Loss-Free 负载均衡策略。

**Q5: RLHF 和 DPO 的区别？**
> 答：RLHF 需要训练奖励模型 + PPO 策略优化，流程复杂；DPO 直接用偏好数据对优化，省去奖励模型训练，更稳定便宜。GRPO 是 DeepSeek 提出的改进，无需 Critic 模型。

## RAG 相关题

**Q6: RAG 的完整流程是什么？**
> 答：文档加载 → 分块（Chunking）→ Embedding → 存入向量数据库 → 用户查询 → Query 改写 → 向量检索（+ 关键词检索 BM25）→ Reranking → 构建 Prompt → LLM 生成 → 输出（含引用）。

**Q7: 如何解决 RAG 检索不准确的问题？**
> 答：(1) Query 改写：用 LLM 改写用户查询 (2) 混合检索：向量 + BM25 (3) Reranking：Cross-Encoder 精排 (4) 优化 Chunk 策略：语义完整性优先 (5) 父文档检索 (6) HyDE：假设性文档嵌入。

**Q8: Reranking 的原理？**
> 答：粗检索（双编码器，向量相似度）拿到 Top-K → 精排（交叉编码器，将 query 和 doc 拼接输入，计算相关性分数）→ 取 Top-N。交叉编码器精度高但慢，所以只用于精排。

**Q9: RAG 和微调的区别？什么时候用哪个？**
> 答：RAG 适合知识频繁更新、需要溯源的场景；微调适合调整模型风格/格式/领域语言。很多场景两者结合效果最好。

## Agent 相关题

**Q10: ReAct 模式的工作原理？**
> 答：Agent 交替进行 Thought（推理）和 Action（行动）。每一步先思考下一步该做什么，然后调用工具执行，观察结果后再思考，直到得出最终答案。实现了推理和行动的深度交织。

**Q11: 如何防止 Agent 死循环？**
> 答：(1) 设置最大步数限制（max_steps）(2) 超时机制 (3) 重复检测：检测是否陷入循环 (4) 代价惩罚：每步消耗 token 预算 (5) 人工介入：检测到异常时触发 Human-in-the-loop。

**Q12: 多 Agent 协作的挑战？**
> 答：(1) 通信开销 (2) 任务分配策略 (3) 冲突解决 (4) 状态一致性 (5) 错误传播。解决方案：共享状态、明确角色分工、异步通信、投票机制。

**Q13: Agent 的记忆系统如何设计？**
> 答：短期记忆：当前对话上下文（context window 内），用摘要压缩长对话。长期记忆：向量数据库存储历史交互，检索时注入相关记忆。工作记忆：当前任务的中间状态（如 ReAct 推理链）。

## 系统设计题

**Q14: 设计一个智能客服系统**
> 答：
> **架构分层：**
> 1. **接入层**：API Gateway，限流、鉴权
> 2. **意图识别层**：分类器判断用户意图（咨询/投诉/转人工）
> 3. **Agent 层**：
>    - FAQ Agent：检索知识库回答常见问题
>    - 工单 Agent：创建和查询工单
>    - 人工转接 Agent：复杂问题升级
> 4. **知识库**：Milvus + ES 混合检索
> 5. **监控层**：Langfuse 追踪，Prometheus 监控
>
> **关键技术点：**
> - 多轮对话管理：Redis 存储会话状态
> - 意图识别：Few-shot 分类 + 规则兜底
> - 人工转接：满意度低/连续失败自动触发
> - 数据飞轮：收集 Bad Case → 人工标注 → SFT 优化
> - 高可用：K8s 部署，自动扩缩容

**Q15: 设计一个支持 1000 并发的 Agent 系统**
> 答：
> - **LLM Gateway**：统一代理层，支持多模型路由
> - **语义缓存**：相似问题命中缓存（Redis + 向量相似度）
> - **异步处理**：流式输出，WebSocket 推送
> - **限流降级**：Token 配额管理，超配额降级到小模型
> - **模型路由**：简单任务 → DeepSeek/Qwen，复杂任务 → GPT-4o
> - **扩缩容**：K8s HPA 基于 GPU 利用率和请求队列长度

**Q16: 如何降低 LLM 推理成本？**
> 答：(1) 模型路由：简单任务用便宜模型 (2) 语义缓存 (3) Prompt 压缩 (4) 量化部署 (5) Batch 推理 (6) KV Cache 优化 (7) 推测解码（Speculative Decoding）(8) 自部署开源模型替代 API。

## 工程实践题

**Q17: 如何做 LLM 的 AB 测试？**
> 答：(1) 确定指标：完成率、满意度、成本、延迟 (2) 分流策略：按用户 ID hash (3) 样本量：至少 1000+，统计显著 (4) 控制变量：只改一个因素 (5) 持续监控：上线后观察 7-14 天 (6) 快速回滚：准备一键回滚方案。

**Q18: 如何监控生产环境中的 Agent？**
> 答：(1) LLM 调用：Token 消耗、延迟（TTFT/TPOT）、错误率 (2) Agent 行为：工具调用次数、完成率、轨迹分析 (3) 业务指标：用户满意度、转化率 (4) 异常告警：成本突增、延迟飙升、幻觉率上升 (5) Bad Case 自动收集。

**Q19: Prompt 注入如何防御？**
> 答：(1) 输入过滤：检测恶意模式 (2) 输入/输出分离标记 (3) 输出验证：Pydantic 结构校验 (4) 权限最小化：工具按需授权 (5) 沙箱执行：代码在 Docker 中 (6) Human-in-the-loop：高危操作人工确认 (7) 红队测试。

## 手撕代码题

**Q20: 实现一个简单的 ReAct 循环**

```python
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI()

async def react_agent(question: str, tools: list, max_steps: int = 5) -> str:
    """简单的 ReAct Agent 实现"""
    messages = [
        {"role": "system", "content": """你是一个智能助手，可以调用工具回答问题。
每次回复格式：
Thought: [分析当前情况和下一步]
Action: [工具名称](参数)
或者当有足够信息时：
Thought: [最终分析]
Answer: [最终答案]"""},
        {"role": "user", "content": question}
    ]
    
    for step in range(max_steps):
        response = await client.chat.completions.create(
            model="gpt-4o", messages=messages, tools=tools
        )
        msg = response.choices[0].message
        
        if not msg.tool_calls:
            return msg.content  # 最终答案
        
        messages.append(msg)
        for tool_call in msg.tool_calls:
            # 执行工具（模拟）
            result = await execute_tool(tool_call)
            messages.append({
                "role": "tool", 
                "tool_call_id": tool_call.id, 
                "content": str(result)
            })
    
    return "达到最大步数限制，无法完成任务"

async def execute_tool(tool_call):
    """执行工具调用（模拟实现）"""
    func_name = tool_call.function.name
    import json
    args = json.loads(tool_call.function.arguments)
    # 实际场景中这里调用真实工具
    return f"工具 {func_name} 返回结果: {args}"
```

**Q21: 实现一个 RAG 检索管道**

```python
from typing import List
import numpy as np

class SimpleRAG:
    """简单 RAG 检索管道"""
    
    def __init__(self, embedding_model, vector_db, llm_client):
        self.embedding_model = embedding_model
        self.vector_db = vector_db
        self.llm = llm_client
    
    def retrieve(self, query: str, top_k: int = 5) -> List[str]:
        """检索相关文档"""
        query_embedding = self.embedding_model.embed(query)
        results = self.vector_db.search(query_embedding, top_k=top_k)
        return [r.text for r in results]
    
    def generate(self, query: str, context: List[str]) -> str:
        """基于上下文生成回答"""
        context_text = "\n\n".join(context)
        prompt = f"""基于以下上下文回答问题。如果上下文中没有相关信息，说"我不知道"。

上下文：
{context_text}

问题：{query}"""
        
        response = self.llm.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1
        )
        return response.choices[0].message.content
    
    def query(self, question: str) -> str:
        """完整的 RAG 流程"""
        docs = self.retrieve(question)
        return self.generate(question, docs)
```
