---
title: 9.3 分布式部署与高可用
---

## 9.3 分布式部署与高可用 

> [!] 大厂 JD 高频要求："熟悉 Docker、Kubernetes、服务化、高可用"

**核心架构：**

<img src="/diagrams/distributed-deploy.svg" alt="分布式部署架构" style="max-width:100%;height:auto;" />

**成本优化策略：**
- 模型路由：简单任务用小模型，复杂任务用大模型
- 语义缓存：相似问题命中缓存
- Prompt 压缩：减少 Token 消耗
- Batch 推理：非实时场景批量处理
