---
title: 1.2 LLM 原理
---

## 1.2 大语言模型（LLM）原理 

**预训练（Pre-training）：** 在海量文本上做"下一个词预测"。

**微调（Fine-tuning）方法对比：**

<img src="/diagrams/finetune-evolution.svg" alt="微调方法演进" style="max-width:100%;height:auto;" />

| 方法 | 原理 | 成本 | 大厂偏好 |
|------|------|------|---------|
| SFT | 问答对数据直接训练 | 中 | [OK] 最常用 |
| RLHF | 人类偏好训练奖励模型 → 优化 LLM | 高 | [OK] 腾讯/阿里明确要求 |
| DPO | RLHF 的简化替代，不需要奖励模型 | 中 | [OK] DeepSeek 验证有效 |
| GRPO | DeepSeek 提出，无需 Critic 模型 | 中 | [热门] 2025-2026 热点 |

**关键概念：**
- **上下文窗口：** GPT-4o 128K，Claude 3.5 200K，Gemini 2.0 1M，DeepSeek V3 128K，Qwen 2.5 128K
- **Temperature：** Agent 场景通常用 0-0.3
- **涌现能力（Emergent Abilities）：** 模型规模达到临界点后突然出现的能力（如 CoT 推理）
