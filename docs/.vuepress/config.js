module.exports = {
  markdown: {
    lineNumbers: true,
  },
  base: "/",
  title: "前端知识集锦",
  description: "目录",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/favicon.ico`,
      },
    ],
  ],
  dest: "./docs/.vuepress/dist",
  evergreen: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "links", link: "/pages/links" },
      { text: "手写代码", link: "/pages/practice" },
      { text: "vuepress", link: "https://www.vuepress.cn/" },
      {
        text: "github",
        link: "https://github.com/zhenyulei/based-knowledge.git",
      },
    ],
    smoothScroll: false,
    sidebar: {
      "/pages/vueBase/": [
        {
          title: "Vue",
          children: [
            ["", "配置环境"],
            ["vueBased", "应用实例"],
            ["methodsComputedWatch", "方法&计算属性&侦听器"],
            ["conditionList", "条件&列表渲染&事件处理"],
            ["formTable", "表单绑定"],
            ["styleCss", "样式class和style"],
            ["component", "组件基础"],
            ["vueSlots", "插槽slot"],
            ["vueAdvance", "进阶知识"],
            ["jsxVue", "用jsx开发vue"],
            ["links", "参考链接"],
          ],
        },
        {
          title: "vue3新特性",
          children: [
            "setup",
            "proxy",
            "asyncComponent",
            "cssinjs",
            "forKey",
            "slot",
            "model",
            "scoped",
            "teleport",
            "refs",
            "global",
            "directive",
            "render",
            "other",
          ],
        },
        {
          title: "TS支持",
          children: ["tsVue"],
        },
        {
          title: "vuex",
          children: ["vuex"],
        },
        {
          title: "vue-router路由",
          children: ["vueRouter"],
        },
      ],
      "/pages/react/": [
        {
          title: "React",
          children: [
            ["", "目录"],
            ["reactHook", "聊聊 React Hook 容易踩的坑"],
            ["reactLife", "React生命周期"],
            ["reactRouter", "React路由"],
          ],
        },
      ],
      "/pages/miniprogram/": [
        {
          title: "微信小程序知识汇总",
          children: [["", "配置环境"]],
        },
      ],
      "/pages/typescript/": [
        {
          title: "TypeScript",
          children: [
            ["", "安装TS"],
            ["tsInReact.md", "TS 在 React 中的应用"],
          ],
        },
      ],
      "/pages/network/": [
        {
          title: "网络知识汇总",
          children: [
            ["", "目录"],
            ["inputUrl", "从url输入到返回请求的过程"],
          ],
        },
      ],
      "/pages/algorithm/": [
        {
          title: "算法",
          children: [["", "目录"]],
        },
      ],
      "/pages/css/": [
        {
          title: "样式布局",
          children: [
            ["", "目录"],
            ["cssBased", "css基础知识"],
          ],
        },
      ],
      "/pages/designMode/": [
        {
          title: "设计模式",
          children: [["", "目录"]],
        },
      ],
      "/pages/javascript/": [
        {
          title: "ES6",
          children: [
            ["", "目录"],
            ["object", "面向对象编程"],
            ["writing", "手写js方法"],
            ["executionContext", "执行上下文"],
            ["objectChain", "作用域链"],
          ],
        },
      ],
      "/pages/mysql/": [
        {
          title: "mysql",
          children: [["", "目录"]],
        },
      ],
      "/pages/nestjs/": [
        {
          title: "nestjs",
          children: [
            ["", "目录"],
            ["based", "nestjs基础知识汇总"],
          ],
        },
      ],
      "/pages/network/": [
        {
          title: "网络",
          children: [["", "目录"]],
        },
      ],
      "/pages/nginx/": [["", "目录"]],
      "/pages/node/": [
        {
          title: "node",
          children: [["", "目录"]],
        },
      ],
      "/pages/other/": [
        {
          title: "其他1",
          children: [["", "目录"]],
        },
      ],
      "/pages/performance/": [
        {
          title: "性能方面",
          children: [["", "目录"]],
        },
      ],
      "/pages/project/": [
        {
          title: "移动端兼容性",
          children: [["", "目录"]],
        },
        {
          title: "监控平台",
          children: [
            ["monitor", "监控平台"],
            ["monitorSdk", "监控平台SDK"],
          ],
        },
      ],
      "/pages/security/": [
        {
          title: "安全方面",
          children: [["", "目录"]],
        },
      ],
      "/pages/typescript/": [
        {
          title: "TS",
          children: [["", "目录"]],
        },
      ],
      "/pages/vue/": [
        {
          title: "vue2.0",
          children: [["", "目录"]],
        },
      ],
      "/pages/webpack/": [
        {
          title: "webpack",
          children: [
            ["", "目录"],
            ["sourceMap", "sourceMap原理解析"],
          ],
        },
      ],
      "/pages/browser/": [
        {
          title: "浏览器",
          children: [["", "目录"]],
        },
      ],
      "/pages/elasticsearch/": [
        {
          title: "elasticsearch搜索",
          children: [["", "ES知识"]],
        },
      ],
      "/pages/docker/": [
        {
          title: "docker基础知识",
          children: [["", "docker基础知识"]],
        },
      ],
      "/pages/server/": [
        {
          title: "server相关知识",
          children: [["", "server基础知识"]],
        },
      ],
    },
  },
};
