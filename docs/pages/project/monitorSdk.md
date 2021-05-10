---
sidebarDepth: 1
---

### 监控平台 SDK

**【v】**技术栈使用了 rollup 脚手架，入口文件为 src/index

**【v】**Beacon 接口用于将异步和非阻塞请求发送到服务器。信标（Beacon ）请求使用 HTTP 协议中的 POST 方法，请求通常不需要响应。这个请求被保证在，页面的 unload 状态从发起到完成之前，被发送。而并不需要一个阻塞请求，例如 XMLHttpRequest 。
[网址](https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API)

**【v】**
项目引入方式：

```html
<script
  src="https://misc.360buyimg.com/retail/watchtower/sdk.js"
  crossorigin="anonymous"
></script>
<script>
  Watchtower.init({
    project: "2a2fd07a8a58f4d0c5cfcb11842c802c",
  });
</script>
```

`sdk.js` 中导出了 init 函数，用户在使用的时候引入`sdk.js`之后，初始化了 Watchtower.init，并传入了 project 等参数；
所以看 src/index 入口文件：
入口文件有两个方法：
init 和 catchExp
其中 `new Sensor(options);`

- 1、初始化合并 options 参数`this.options = lodashMerge({}, defaultConfig, options);`
- 2、处理事件,比如增加采样率，连续事件通过判断 type、title 是否相等来去重等工作 `this.eventProcessors=[]`
- 3、初始化传输事件 this.transport,`BeaconTransport、XHRTransport`
- 4、实例化监控事件，比如：`new DomIntegration().install(this);`
- 5、提供定义几个方法

  - addEventProcessor（添加一个新的 event 处理函数）
  - addBreadcrumb （添加一条面包屑）
  - findTimeoutReq （根据面包屑信息查找超时接口）
  - captureEvent（利用 eventProcessors 中定义的处理函数处理该事件并最终决定是否要上报）

- 6、捕捉事件用的数据传输方式：`this.transport.send(processedEvent);`
  使用的是 `src/transports/beacon`和`xhr`两个方式，如果浏览器支持，优先使用 beacon 方式
  其中`beacon`只使用于发送异常事件，所以提供了 `send` 方法
  而`xhr`方式既支持发送异常事件`send`,又提供了 xhr 方式请求接口`new XHRTransport().wtAjax()`
