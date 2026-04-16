---
title: 1.3 国产模型生态
---

## 1.3 国产模型生态 

> [!] 大厂面试高频考点：了解国产模型的特点和适配方式是加分项，尤其是面试对应公司时

<img src="/diagrams/domestic-models.svg" alt="国产大模型生态" style="max-width:100%;height:auto;" />

| 模型 | 厂商 | 参数量 | 特点 | API/开源 |
|------|------|--------|------|---------|
| **DeepSeek V3/R1** | DeepSeek | 671B MoE | 开源最强，性价比极高，GRPO 算法 | 开源+API |
| **通义千问 Qwen 2.5** | 阿里 | 0.5B-72B | 中文能力好，开源可商用 | 开源+API |
| **文心一言 ERNIE** | 百度 | 未公开 | 百度生态深度集成 | API 为主 |
| **混元 Hunyuan** | 腾讯 | 未公开 | 多模态能力强，微信/QQ 生态 | API 为主 |
| **盘古 Pangu 5.5** | 华为 | 7B+ | 企业级，昇腾芯片适配 | 华为云 |
| **豆包 Doubao** | 字节跳动 | 未公开 | 字节全系产品底层模型 | API 为主 |
| **GLM-4** | 智谱 | 9B | 中文开源标杆 | 开源+API |

**国产模型适配要点：**

```python
# DeepSeek API（兼容 OpenAI 格式）
from openai import OpenAI
client = OpenAI(base_url="https://api.deepseek.com", api_key="your-key")
response = client.chat.completions.create(
    model="deepseek-chat",  # 或 deepseek-reasoner
    messages=[{"role": "user", "content": "你好"}]
)

# 通义千问 API
client = OpenAI(base_url="https://dashscope.aliyuncs.com/compatible-mode/v1", api_key="your-key")
response = client.chat.completions.create(model="qwen-plus", messages=...)

# 百度文心一言（使用原生 SDK）
import qianfan
client = qianfan.ChatCompletion()
response = client.do(model="ernie-4.0-8k", messages=[...])
```

**大厂面试常问：**
- "DeepSeek V3 的 MoE 架构和普通 Dense 模型有什么区别？" → MoE 只激活部分参数，671B 参数每次只激活 37B，推理成本低
- "国产模型和 GPT-4 的差距在哪？" → 中文场景差距缩小，复杂推理仍有差距
- "如何评估不同模型在业务场景的效果？" → 看第六阶段评估体系
