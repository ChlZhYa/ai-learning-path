---
title: 2.2 Function Calling
---

## 2.2 Function Calling 

Function Calling 是 Agent 调用外部工具的标准方式。**这是大厂面试必考点。**

**工作流程：**
1. 告诉模型有哪些函数可用（函数名、参数 schema、描述）
2. 模型根据用户问题，决定是否需要调用函数
3. 模型输出函数调用请求（JSON 格式）
4. 代码执行函数，把结果返回模型
5. 模型基于结果生成最终回答

**完整代码示例：**

```python
from openai import OpenAI
import json

client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["city"]
            }
        }
    }
]

messages = [{"role": "user", "content": "北京今天多少度？"}]
response = client.chat.completions.create(
    model="gpt-4o", messages=messages, tools=tools, tool_choice="auto"
)
assistant_message = response.choices[0].message

# 执行工具
tool_call = assistant_message.tool_calls[0]
args = json.loads(tool_call.function.arguments)
result = {"city": args["city"], "temperature": 22, "condition": "晴"}

# 返回结果
messages.append(assistant_message)
messages.append({"role": "tool", "tool_call_id": tool_call.id, "content": json.dumps(result, ensure_ascii=False)})

final = client.chat.completions.create(model="gpt-4o", messages=messages, tools=tools)
print(final.choices[0].message.content)
```

**大厂面试常问：**
- "Function Calling 的原理是什么？模型如何'决定'调用哪个工具？" → 模型在训练时学习了工具调用的格式，通过特殊 token 输出结构化调用
- "如何处理工具调用失败？" → 重试机制、fallback 策略、向用户报错
- "如何限制模型的工具使用？" → tool_choice 参数控制、权限最小化
