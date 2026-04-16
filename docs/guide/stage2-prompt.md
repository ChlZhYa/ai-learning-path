---
title: 2.1 Prompt Engineering 深度
---

> [日期] 预计学习时间：30-35 小时

## 2.1 Prompt Engineering 深度 

> [!] 大厂 JD 几乎 100% 提到"熟悉 Prompt Engineering"，这是 Agent 开发的核心技能

**System Prompt 设计原则：**

```python
# 好的 system prompt 结构
system_prompt = """## 身份
你是一名有 10 年经验的高级软件工程师，专精 Python、Go 和分布式系统。

## 行为规则
1. 先分析代码意图，再指出问题
2. 每条建议必须说明：问题是什么、为什么是问题、如何修复
3. 按严重程度排序：🔴 致命 → 🟡 建议 → 🟢 风格
4. 不要说废话，直接给出结论

## 输出格式
使用 Markdown，每个问题一个段落。

## 禁止
- 不要过度解释基础概念
- 不要给出未经请求的完整重写
"""
```

**关键技术：**

| 技术 | 难度 | 优先级 | 说明 |
|------|------|--------|------|
| Few-Shot Prompting | 
| Chain-of-Thought (CoT) | 
| Self-Consistency | 
| Tree-of-Thought (ToT) | 
| Directional Stimulus Prompting | 
| LangGPT | 

**国产模型的 Prompt 特殊性：**
- 中文 Prompt 通常比英文效果略差，建议关键指令用英文
- DeepSeek 对 CoT 格式有特殊优化，建议使用 `<think...</think`> 标签
- 通义千问对 XML 标签格式的遵循度较好

### 学习资料清单

**官方文档：**
- OpenAI Prompt Engineering Guide：https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic Prompt Engineering：https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering
- DeepSeek API 文档：https://platform.deepseek.com/api-docs

**论文：**
- "ReAct: Synergizing Reasoning and Acting in Language Models"：https://arxiv.org/abs/2210.03629
- "Toolformer: Language Models Can Teach Themselves to Use Tools"：https://arxiv.org/abs/2302.04761

**GitHub：**
- `openai/openai-cookbook` — 官方示例集合：https://github.com/openai/openai-cookbook
- `langgenius/dify` — 开源 LLM 应用开发平台（国内活跃）：https://github.com/langgenius/dify

**实践平台：**
- Coze（字节跳动扣子）：https://www.coze.cn — 低代码 Agent 构建平台，适合快速验证
- Dify：https://dify.ai — 开源 LLM 应用开发平台
