---
sidebarDepth: 1
---

## ES6

### 异步问题

**问题：两个请求并行发送，如果其中一个请求出错，就用默认值代替，怎么实现**
**回答：**
使用 Promise.allSettled()方法：https://es6.ruanyifeng.com/#docs/promise#Promise-all
