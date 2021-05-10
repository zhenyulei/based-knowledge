---
sidebarDepth: 2
---

### 安装 TS

1、 全局安装 TS： `npm install -g typescript`

安装完成之后，我们就可以在任何地方执行 tsc 命令了。

我们约定使用 TypeScript 编写的文件以 .ts 为后缀，用 TypeScript 编写 React 时，以 .tsx 为后缀。

TypeScript 编译的时候即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。

如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。

### 参考链接

[TypeScript 入门教程](https://ts.xcatliu.com/)

### 问题

- 你 ts 用的多么，说几个高级用法
- 介绍下 interface 和 type 的区别
