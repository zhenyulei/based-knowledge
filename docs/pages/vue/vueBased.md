---
sidebarDepth: 1
---

## esbuild 知道么介绍下

### 实现一个小而美的 Bundler 打包

1.初始化项目和安装「esbuild」：`npm init -y & npm i esbuild`
1 2.目录结构：

```js
|——— src
    |—— main.js //项目入口文件
|——— index.js   //bundler 实现核心文件
```

3.index.js：

```js
(async () => {
  const { startService, build } = require("esbuild");
  const service = await startService();

  try {
    const res = await service.build({
      entryPoints: ["./src/main.js"],
      outfile: "./dist/main.js",
      minify: true,
      bundle: true,
    });
  } finally {
    service.stop();
  }
})();
```

4.运行一下 node index 即可体验一下闪电般的 bundler 打包！
