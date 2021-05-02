module.exports = {
  markdown: {
    lineNumbers: true,
  },
  title: "前端知识集锦",
  description: "前端炼金术计划",
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
      { text: "vuepress", link: "https://www.vuepress.cn/" },
      {
        text: "github",
        link: "https://github.com/zhenyulei/based-knowledge.git",
      },
    ],
    smoothScroll: false,
    sidebar: {
      "/pages/vue/": [
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
          children: [["", "聊聊 React Hook 容易踩的坑"]],
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
      "/pages/readfiles/": [
        {
          title: "把书读薄系列",
          children: [],
        },
      ],
      "/pages/interview/": [
        {
          title: "基础知识点梳理",
          children: [["", "从url输入到返回请求的过程"]],
        },
        {
          title: "Vue",
          children: [["Vue", "vue知识点"]],
        },
        {
          title: "JavaScript",
          children: [["JavaScript", "JavaScript知识汇总"]],
        },
        {
          title: "React",
          children: [["React", "React知识汇总"]],
        },
      ],
    },
  },
};
