---
title: 1.1 Transformer 架构 + 1.4 开源vs闭源选型
---

> [日期] 预计学习时间：30-40 小时

## 1.1 Transformer 架构 

Transformer 是现代大语言模型的基础架构，2017 年由 Google 在论文《Attention Is All You Need》中提出。你不需要从头推导数学公式，但需要理解以下核心概念：

**自注意力机制（Self-Attention）：** 模型在处理一个词时，会"关注"输入序列中的其他词，计算它们之间的相关性。

**核心组件：**
- **Tokenization（分词）：** BPE 是主流方法，GPT 系列使用 tiktoken 库。中文字符约 1-3 个 token
- **Embedding（词嵌入）：** 将 token 转换为高维向量（如 4096 维）
- **多头注意力（Multi-Head Attention）：** 同时从多个"视角"关注输入
- **位置编码（Positional Encoding）：** 告诉模型词的位置信息
- **FFN（前馈网络）：** 每一层中的全连接网络

**编码器 vs 解码器架构对比：**

<img src="/diagrams/transformer-arch.svg" alt="Transformer三大架构分支" style="max-width:100%;height:auto;" />

| 架构 | 代表模型 | 适用任务 | 大厂考察重点 |
|------|---------|---------|-------------|
| Encoder-only | BERT | 分类、NER、相似度 | 理解原理即可 |
| Decoder-only | GPT、DeepSeek、Qwen | 生成、对话、Agent | **重点掌握** |
| Encoder-Decoder | T5、BART | 翻译、摘要 | 了解即可 |

## 1.4 开源 vs 闭源模型选型 

| 维度 | 闭源 API | 开源自部署 |
|------|---------|-----------|
| 成本 | 按量付费，初期低 | GPU 硬件成本高 |
| 延迟 | 网络依赖 | 可控 |
| 数据安全 | 数据出域 | 数据不出域 |
| 定制化 | 有限 | 完全可控 |
| 大厂偏好 | 原型开发、快速验证 | 生产部署、成本敏感 |

**建议：** 开发阶段用闭源 API，面试准备了解国产模型生态，生产部署评估开源模型。

### 学习资料清单

**视频课程：**
- 3Blue1Brown《But what is a GPT?》系列（B站有中文字幕）：https://www.youtube.com/watch?v=wjZofJX0v4M
- Andrej Karpathy《Let's build GPT: from scratch》（YouTube，B站有搬运）：https://www.youtube.com/watch?v=kCc8FmEb1nY
- 李沐《Transformer 论文逐行精读》（B站有中文字幕）：https://www.bilibili.com/video/BV1pu411o7BE

**论文：**
- "Attention Is All You Need"（Transformer 原始论文）：https://arxiv.org/abs/1706.03762
- "The Illustrated Transformer" by Jay Alammar（图解版）：https://jalammar.github.io/illustrated-transformer/

**GitHub：**
- `karpathy/nanoGPT` — 最小化 GPT 训练代码：https://github.com/karpathy/nanoGPT
- `deepseek-ai/DeepSeek-V3` — DeepSeek 官方仓库：https://github.com/deepseek-ai/DeepSeek-V3
- `QwenLM/Qwen2.5` — 通义千问官方仓库：https://github.com/QwenLM/Qwen2.5

**书籍：**
- 《动手学深度学习》（李沐）：https://zh.d2l.ai — 在线免费，中文版，PyTorch 代码配套
- 《Build a Large Language Model (From Scratch)》by Sebastian Raschka
