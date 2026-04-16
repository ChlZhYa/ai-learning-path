---
title: 9.1 推理框架 + 9.2 量化
---

> [日期] 预计学习时间：20-25 小时

## 9.1 推理框架 

| 框架 | 特点 | 大厂使用 |
|------|------|---------|
| **vLLM** | PagedAttention，吞吐量最高 | [OK] 生产部署首选 |
| **SGLang** | RadixAttention，更快的推理 | [热门] 2025 新星 |
| **TGI** | HuggingFace 出品 | [OK] |
| **LMDeploy** | 商汤出品，国产优化 | [OK] |
| **Ollama** | 一键部署 | 开发测试 |
| **llama.cpp** | CPU/GPU 混合，量化友好 | 边缘设备 |

## 9.2 量化（Quantization）

| 方法 | 显存节省 | 效果损失 | 大厂使用 |
|------|---------|---------|---------|
| GPTQ | 50% | 小 | [OK] |
| AWQ | 50% | 更小 | [OK] |
| GGUF | 50-75% | 中 | 本地部署 |
| INT4/INT8 | 50-75% | 中 | [OK] |

### 学习资料清单

**GitHub：**
- `vllm-project/vllm`：https://github.com/vllm-project/vllm
- `sgl-project/sglang`：https://github.com/sgl-project/sglang
- `InternLM/lmdeploy`：https://github.com/InternLM/lmdeploy

**课程：**
- HuggingFace《Efficient LLM Deployment》：https://huggingface.co/learn/llm-course/chapter9/1
