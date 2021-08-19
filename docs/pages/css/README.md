---
sidebarDepth: 1
---

## 如何实现 1px 像素线

**方法一：使用 伪元素 + 缩放 的方式**

原理：把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位。

```css
.box20 {
  width: 300px;
  height: 200px;
  border: none; /*这里*/
  position: relative;
}
/*边框*/
.box20:after {
  content: "";
  position: absolute;
  box-sizing: border-box; /* 为了与原元素等大*/
  left: 0;
  top: 0;
  border: 1px solid green;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: 0 0;
}
/*细线*/
.box20:before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 200%;
  height: 1px;
  background-color: red;
  transform: scale(0.5);
  transform-origin: 0 0;
}
```

**方法二：使用 动态 viewport + rem 布局 的方式**

首先根据 dpr （物理像素点/手机的实际视口大小(1px)）来动态修改 meta 标签中 viewport 中的 initial-scale 的值，以此来动态改变 viewport 的大小；然后页面上统一使用 rem 来布局，viewport 宽度变化会动态影响 html 中的 font-size 值，以此来实现适配。

```html
<head>
  <meta
    name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1,minimum-scale=1,maximum-scale=1,viewport-fit=cover"
  />
  <script type="text/javascript">
    // 动态设置 viewport 的 initial-scale
    var viewport = document.querySelector("meta[name=viewport]");
    var dpr = window.devicePixelRatio || 1;
    var scale = 1 / dpr;
    viewport.setAttribute(
      "content",
      "width=device-width," +
        "initial-scale=" +
        scale +
        ", maximum-scale=" +
        scale +
        ", minimum-scale=" +
        scale +
        ", user-scalable=no"
    );
    // 计算 rem font-size
    var clientWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    clientWidth > 750 && (clientWidth = 750);
    var ft = (clientWidth / 7.5).toFixed(2); // 以750设计稿为例
    document.documentElement.style.fontSize = ft + "px";
  </script>
</head>
```

## 盒子模型

在 CSS 中任何元素都可以看成是一个盒子，而一个盒子是由 4 部分组成的：
内容（content）、内边距（padding）、边框（border）和外边距（margin）。

盒模型有 2 种：标准盒模型和 IE 盒模型，本别是由 W3C 和 IExplore 制定的标准。

比如

```css
.box {
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid #eee;
  margin: 10px;
}
```

- 标准盒模型认为：盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框；//增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。
  盒子的实际尺寸 = 200+10*2+1*2 =222
- IE 盒模型认为：盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框；//IE 盒子，增加内边距、边框不会影响整体的宽度，（不包括外边距）
  盒子的实际尺寸 = 200 = 178+10*2+1*2（也就是内部宽度变成了 178）
  【实际上我们使用 IE 的盒子模型比较好，这样改变内边距不会影响整体盒子】

在 CSS3 中新增了一个属性 box-sizing，允许开发者来指定盒子使用什么标准，它有 2 个值：

content-box：标准盒模型；

border-box：IE 盒模型；【V】

### 垂直居中的方法

```html
<div class="outer">
  <div class="inner"></div>
</div>
```

**方法一：flex**

```css
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**方法二： position + transform, inner 宽高未知**

```css
.outer {
  position: relative;
}
.inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

**方法三：position + 负 margin, inner 宽高已知**

```css
.outer {
  position: relative;
}
.inner {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

**方法四：设置各个方向的距离都是 0，再将 margin 设为 auto，也可以实现，前提是 inner 宽高已知**

```css
.outer {
  position: relative;
}
.inner {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

### 如何实现三栏布局

左右固定，中间自适应

#### 2、逻辑像素,物理像素的概念

- 写一个三列等距布局，越多越好
- 移动端适配，响应式布局的
- css 的伪类和伪元素有哪些？有什么区别？
- 在一个未知宽度的父元素内如何创建一个等边正方形
- input type 都有哪些类型，还记得其他 attrs 呢
- 假如让你设计一个适配 PC、手机和平板的项目，你有哪些布局方案？(首先是 vh、vw，然后用淘宝出品的 lib-flexible 库进行 rem 适配，还有一种 flex + px 的适配方式)
- CSS 当中以 @ 开头的属性有哪些？（@media, @keyframes，@import）
- rem, 计算出 375 的屏幕，1rem,单位出现小数怎么处理
- 触发 BFC 的方式
- rem 和 vw 的使用场景
- 子元素水平垂直居中
- css flex 的各个属性值；
- css 动画 animation 各个时间值含义；
- css 如何实现让一个元素旋转并横向移动，如果只用一个 css 属性；
- less 与 sass 区别，技术选型时如何取舍；
- 说一下 css 盒模型，border-box 和 content-box 区别；
- 说一说 flex 布局，有了解 Grid 么；
- 如何在移动端实现 1 px 的线;
- 为什么说用 css 实现动画比 js 动画性能好；
- 什么是 合成层

## 相关链接

- [浏览器基础（5）-谈谈层合成（Composite）](https://blog.csdn.net/weixin_42370640/article/details/105690386)
- [CSS 垂直居中的七个方法](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247487117&idx=2&sn=bc9182426b0d42b116d7ed26502885e4&scene=19#wechat_redirect)
