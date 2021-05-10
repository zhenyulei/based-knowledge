---
sidebarDepth: 1
---

### 问题

- 两个请求并行发送，如果其中一个请求出错，就用默认值代替，怎么实现
- AMD 和 commonjs 和 es module 区别，commonJS 与 ES6 模块化区别；
- 防抖和节流区别，大概实现
- 垃圾回收机制了解么，介绍一下
- 实现函数异步请求成功后就返回，失败后重试 max 次
- 异步加载 js 会阻塞什么
- 数组所有方法都有哪些？findIndex 的参数说明
- weakMap 和 Map 的区别，weakMap 原理，为什么能被 GC？
- 微任务后面还有哪些？requestAnimationFrame 是怎么调用的？requestAnimationFrame 帧内总是有任务吗？分情况说下。
- 实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF' 的多种思路。
- ES5 写一个数组去重
- 讲讲 JS 和 node 的 eventloop
- requestAnimationFrame 在 EventLoop 中是一个什么位置？
- 箭头函数和普通函数的区别（写法，原型，this，声明时确定还是运行时确定？）
- 箭头函数可以 new 吗 ？ 说一说 new 的原理。
- 常用的 DOM API
- WeakMap 和 Map 的性能有什么差别?
- async await 经过编译后和 generator 有啥联系？
- 你对 babel 了解吗？能不能说说几个 stage 代表什么意思？
- javascript 精度问题的原因
- AST 作用 or babel 实现原理
- ES6 symbol 如何使用以及使用场景；
- ES6 Proxy 如何使用以及使用场景，说说 Reflect；
- generator 有什么应用场景;
- async await 如何实现的；
- call、apply、bind 三者的区别，如何实现 bind；
- js 有哪些基本类型，说说 typeof 与 instanceof；
- 说说 new 操作符；
- 什么是 event loop；
- Promise 的用法？了解 allSettled 方法么，怎么实现？
- 说说闭包；
- ES5 实现继承的方法;
- 实现一个方块的拖拽；
- js 的严格模式
- 说说 Iterator 的使用；
- this 指向问题，说出输出内容；

---

### 手写函数

- 手写一个单例模式
- 手写一个发布订阅模式
- 手写一个 redux 的 compose 函数
- 手写一个组合继承
- 手写一个 promise 函数
- 写一个 Promise.all 函数
- 实现一下 promise.race
- 手写手机号中间部分隐藏`****`，显示前三位和后四位[链接](https://blog.csdn.net/chengjiqiang1/article/details/103921724)
- 数组去重方法越多越好
- 写一个匹配邮箱的正则
- 实现一个深拷贝
- 实现函数统计字符串里面出现次数最多的字符
- 实现防抖节流
- 实现 sum(1)(2, 3)(4)柯里化
- 实现一个 String.prototype.\_trim 函数
- 实现一个多个请求，并行和串行的函数
- 快速实现 [1, 2, ...100]，所有你能想到的解
- 实现一下 some, every
- JS 扁平化（flatten） 数组
- generate 函数和 async 区别
- 最大字符串数， “abcdabcda” 求最长的不重复字符串
- 实现一下「模版字符串」功能；

### 相关文章链接

- [图解 Promise 实现原理](https://zhuanlan.zhihu.com/p/58428287)
- [JS 数字精度丢失的一些典型问题](https://www.cnblogs.com/snandy/p/4943138.html)
- [这次彻底搞懂 Promise(手写源码多注释篇)](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247487219&idx=1&sn=5322b8225a0c8d8fdeb13df150c8e5ea&scene=19#wechat_redirect)
- [从 4 个面试题了解「浏览器的垃圾回收」](https://juejin.im/post/6861967094318284814)
- [从一道面试题谈谈对 EventLoop 的理解](https://juejin.im/post/6868849475008331783)
- [字节跳动最爱考的前端面试题：JavaScript 基础](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247490517&idx=2&sn=79396ec9aff5385e93df1ed1551c3c5f&scene=19#wechat_redirect)
