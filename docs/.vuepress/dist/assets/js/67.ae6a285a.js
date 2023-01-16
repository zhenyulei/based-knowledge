(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{315:function(t,s,a){"use strict";a.r(s);var e=a(6),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"拿什么拯救你的线上问题-watchtower-前端异常监控平台"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拿什么拯救你的线上问题-watchtower-前端异常监控平台"}},[t._v("#")]),t._v(" 拿什么拯救你的线上问题————Watchtower 前端异常监控平台")]),t._v(" "),a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),a("blockquote",[a("p",[t._v("作为研发，你做过的噩梦是什么？辛辛苦苦开发好几个月的项目，通过测试、产品同学的精心验收后，部署到线上了，然而好景不长，突然某天收到用户投诉电话，线上图片不展示了、页面白屏了、点击按钮无反应等异常了，于是赶紧打开线上项目却又无法复现！一脸惊恐的猛然坐起，擦了擦额头的虚汗，原来是一场噩梦！这时身边的手机突然响起：“喂，研发吗？我们接到线上用户投诉了。。。”")])]),t._v(" "),a("p",[t._v("好了，停！祝各位研发同学线上项目永远运转正常，零客诉，大吉大利～")]),t._v(" "),a("p",[t._v("不过话又说回来，为了让大家安安稳稳的睡个好觉，前端异常监控应该引起每位研发的重视，项目上线后，通过及时关注异常监控的异常上报情况，能够将异常扼杀在用户投诉之前，降低客诉率；还可以在用户投诉后，根据监控平台收集的异常详情，快速定位异常问题，降低负面影响。于是 Watchtower 前端异常监控平台正是为了解决这种棘手的问题，从而诞生了！")]),t._v(" "),a("h2",{attrs:{id:"watchtower-平台简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#watchtower-平台简介"}},[t._v("#")]),t._v(" Watchtower 平台简介")]),t._v(" "),a("p",[t._v("Watchtower: "),a("a",{attrs:{href:"http://watchtower.jd.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://watchtower.jd.com"),a("OutboundLink")],1),t._v(" 是一个前端异常监控平台，孵化自京东零售-平台业务中心，是一款线上项目的质量保证工具，Watchtower 即指瞭望塔，它目及远方，风吹草动，尽收眼底~~")]),t._v(" "),a("p",[a("strong",[t._v("1、Watchtower 平台适用性")])]),t._v(" "),a("p",[t._v("Watchtower 目前适用于 PC 端、移动端 web 具有线上异常监控需求的项目，无论是 React、Vue、Angular 还是 jQuery 都可以接入。")]),t._v(" "),a("p",[a("strong",[t._v("2、Watchtower 平台监控异常类型")])]),t._v(" "),a("p",[t._v("平台支持前端常见异常捕获类型，如下图所示：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img13.360buyimg.com/imagetools/jfs/t1/202020/34/27601/99869/6328116aE517d25dc/167d988ace7e1505.png",alt:"img"}})]),t._v(" "),a("ul",[a("li",[t._v("1、JSONP 异常")])]),t._v(" "),a("p",[t._v("通过使用 "),a("code",[t._v('window.addEventListener("error")')]),t._v(" 监听客户端抛出的错误异常，获取异常的目标 DOM 类型，如果是 script 标签，则判断其 src 路径是否满足 JSONP 的请求类型：\n除去查询字符串(？及其之后内容)后的部分是否以 .js 结尾。如果是则为普通脚本资源；如果不是 则为一个 JSONP 请求。")]),t._v(" "),a("ul",[a("li",[t._v("2、资源加载异常")])]),t._v(" "),a("p",[t._v("同监听 JSONP 异常一样，我们使用的 "),a("code",[t._v('window.addEventListener("error")')]),t._v(" 监听客户端抛出的错误异常，判断抛出的异常目标 DOM 元素标签的名字，如果是 Script 或者 Link 样式标签，则可以断定是资源加载异常；")]),t._v(" "),a("ul",[a("li",[t._v("3&4、Fetch 请求异常 & XHR 请求异常")])]),t._v(" "),a("p",[t._v("客户端的请求接口，无外乎 Fetch 或者 XHR 请求（Axios 底层封装的也是 XHR 请求），所以我们需要重写 Fetch 请求和 XHR 请求，如果返回的响应码不在 2XX 区间，则说明发生了异常。")]),t._v(" "),a("ul",[a("li",[t._v("5、脚本异常")])]),t._v(" "),a("p",[t._v("通过绑定 "),a("code",[t._v("window.onerror")]),t._v("事件，拦截客户端发生的异常，可以获取到目标元素以及错误栈等相关信息，在进行数据清洗将所需的字段上报。")]),t._v(" "),a("ul",[a("li",[t._v("6、未处理的 Promise 异常")])]),t._v(" "),a("p",[t._v("常规的监听"),a("code",[t._v('window.addEventListener("error")')]),t._v("和监听"),a("code",[t._v('window.addEventListener("error")')]),t._v(" 无法监听到因为异步 Promise 发生的未 catch 异常，而 Promise 异步函数对于前端来说几乎不可或缺，所以如果本身没有做好 catch 处理，这类异常就会发生，然后捕获后上报异常。")]),t._v(" "),a("ul",[a("li",[t._v("7、Low FPS 异常")])]),t._v(" "),a("p",[t._v("Low FPS 异常指的是页面是否卡顿的异常，那么如何判断页面是否卡顿呢？我们可以使用 requestAnimationFrame ，它会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。我们通过 requestAnimationFrame API 来定时执行一些 js 代码，如果浏览器卡顿，则无法很好地保证渲染的频率，从而上报页面卡顿异常。")]),t._v(" "),a("ul",[a("li",[t._v("8、自定义异常")])]),t._v(" "),a("p",[t._v("这类异常无需多言，通过 sdk 提供的上报异常函数，用户可以在关键步骤去上报一些自定义的异常，相当于数据的收集。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Watchtower"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catchExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"测试自定义异常信息"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  errorDetail"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    numProp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1245")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    booleanProp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    strProp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2020-08-12 12:21:22"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    objProp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      prop1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      prop2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key2"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    arrProp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"嘻嘻"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"哈哈"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"嘿嘿"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("ul",[a("li",[t._v("9、页面崩溃异常")])]),t._v(" "),a("p",[t._v("该类异常其实就是我们日常所畏的页面白屏风险上报，实现思路是通过 "),a("code",[t._v("new MutationObserver")]),t._v(" 来监听页面 DOM 元素的变化，待 DOM 结束变化后 5S 左右，去检测页面 DOM 中是否包含除去“加载中”或者“loading”等字段后，页面仍旧没有文案元素，然后给页面截屏，通过分析色彩值，来判断是否有单色的骨架屏元素，如果色彩值小于阈值，则判断为有白屏风险，之所以是风险，有可能页面渲染时间超过了 DOM 元素结束后 5s，嗯～渲染时间过长，用户等待时间也过长，也是个优化点～")]),t._v(" "),a("ul",[a("li",[t._v("10、接口响应超时异常")])]),t._v(" "),a("p",[t._v("此类异常需要用户在平台设置关注的接口，以及自定义接口超时的时间。通过上述介绍的重新 XHR 方法和 Fetch 方法可以拦截到用户关注的接口以及响应的时间，如果超过设置的阈值后，则进行异常上报。")]),t._v(" "),a("p",[t._v("以上简要介绍了监控平台对异常的监控上报处理逻辑，这些逻辑都集中打包在了 sdk 文件中，需要用户在页面 Html 中引入，其实监控异常的方法细节很是复杂，任何一类异常都可以扩展很多知识，这里我们只是简要的了解一下 "),a("code",[t._v("Watchtower")]),t._v(" 的监听异常逻辑。")]),t._v(" "),a("h2",{attrs:{id:"如何接入监控"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何接入监控"}},[t._v("#")]),t._v(" 如何接入监控")]),t._v(" "),a("p",[t._v("接入监控平台非常简单，只需要两步即可，在平台导航的右上角，点击接入项目按钮：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img11.360buyimg.com/imagetools/jfs/t1/68116/5/22063/36842/632bfbbcE2c0d069e/709a24d9db93245b.jpg",alt:"img"}})]),t._v(" "),a("ul",[a("li",[t._v("步骤一：")])]),t._v(" "),a("p",[t._v("新建项目后，会分配一个项目 slug，将代码引入 html 的 header 标签中")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://static-fe.360buyimg.com/jdos-ls_watchtower-sdk/sdk.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("crossorigin")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("anonymous"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}}),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  Watchtower"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    project"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123456789012345"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])]),a("ul",[a("li",[t._v("步骤二：")])]),t._v(" "),a("p",[t._v("给 Html 中的 "),a("code",[t._v("<Script>")]),t._v(" 标签，尤其是业务"),a("code",[t._v("<Script>")]),t._v(" 标签，增加跨域属"),a("code",[t._v('crossorigin="anonymous"')]),t._v("，避免出现"),a("a",{attrs:{href:"https://joyspace.jd.com/page/91nqsoHoM18eDPo1A4OA",target:"_blank",rel:"noopener noreferrer"}},[t._v("异常跨域错误"),a("OutboundLink")],1),t._v("："),a("code",[t._v("Script error")])]),t._v(" "),a("h2",{attrs:{id:"异常统计信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异常统计信息"}},[t._v("#")]),t._v(" 异常统计信息")]),t._v(" "),a("p",[t._v("进入到平台首页，首先映入眼帘的是异常数据统计信息，包括七天内的总异常数以及当前选择异常的数据量，同时提供了环比时间异常数量的对比，根据这两条环比时间对比折线图，可以看出如果平台稳定的话发生的异常数量是类似的，若短时间内发生了大量异常，从对比的曲线就可以看出出现了波动：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img12.360buyimg.com/imagetools/jfs/t1/122914/38/31541/39589/63298698Efba13beb/835a07fae025eb95.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("异常折线图下面就是选择条件下异常列表，这里的异常数量列表是无限滚动加载的，可以看到异常发生的名称，该段时间内的异常分布以及发生的时间和次数，对于脚本异常类型还可以获取到异常发生的文件、以及位置：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img10.360buyimg.com/imagetools/jfs/t1/9874/26/20238/29507/6329aa2fEdd142cc3/7e6a09f88ac9ca3d.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("此外，异常统计信息页面还提供了 Top 的地域位置，尤其是在静态资源发生失败的时候，可以根据这些地域分布来进一步联系运维同学排查所属城市的网络是否发生了抖动或者异常。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img12.360buyimg.com/imagetools/jfs/t1/26978/7/19789/13113/6329ae3eE72cf7d1f/fdb503342c4251eb.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("排查异常还可以根据这些异常所在的平台和系统分布，点击切换运行系统和运行环境平台可以查看对应的数据：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img14.360buyimg.com/imagetools/jfs/t1/43194/12/19470/70033/6329aec6E477c6496/dce9f147f1d851ba.png",alt:"img"}})]),t._v(" "),a("p",[t._v("当然，针对某一条异常，由于在某段时间内，有可能发生了多次，该条异常按照时间分布和所在的城市分布，以及运行系统和运行环境平台的数据分布这些信息，在点击某条异常后，在右侧进行显示。以上数据统计是截止到目前的数据，接下来我们还会继续提供供应商的信息、用户所使用的网络类型等等。")]),t._v(" "),a("h2",{attrs:{id:"异常详情页"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异常详情页"}},[t._v("#")]),t._v(" 异常详情页")]),t._v(" "),a("p",[t._v("上面介绍了选择条件下的异常列表，每条异常如果想看其详细信息，点击查看详情按钮即可进入该条异常的详细页面：")]),t._v(" "),a("p",[t._v("对于脚本异常类型，首先映入眼帘的是异常的错误栈信息，由于线上代码往往都是被压缩后的文件，所以获取到的异常文件来源和异常位置都是压缩后的，无法据此获取真实的信息，因此平台提供 sourceMap 文件上传进行解析源码位置功能，若解析位置不正确还可以选择其他异常栈的位置：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img10.360buyimg.com/imagetools/jfs/t1/158134/12/30691/95320/632bfeecE562b86d9/82a158fae98124e3.png",alt:"img"}})]),t._v(" "),a("p",[t._v("经过服务端的异常 sourceMap 文件解析之后的，可以得到源代码中对应文件名称以及具体的代码和位置：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img13.360buyimg.com/imagetools/jfs/t1/71820/28/20936/133514/6329ab36E3781e825/b394422eba3f0ca5.png",alt:"img"}})]),t._v(" "),a("p",[t._v("如果对于监控平台的 sourceMap 文件解析感兴趣的同学，请看这里："),a("a",{attrs:{href:"https://jelly.jd.com/article/613600837377210179ea863a",target:"_blank",rel:"noopener noreferrer"}},[t._v("《前端异常监控平台之 SourceMap 异常定位原理解析》"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("接下来就是异常详情，不同的异常类型展示的异常详情信息不同，比如资源加载失败包含了"),a("code",[t._v("元素 HTML")]),t._v("，"),a("code",[t._v("DOM 位置")]),t._v(","),a("code",[t._v("resource")]),t._v(","),a("code",[t._v("用户pin")]),t._v("等信息，而 XHR 请求异常往往包含了请求的响应头等信息，如下图所示：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img11.360buyimg.com/imagetools/jfs/t1/179489/11/28821/15193/632bcf47Ef2a431ad/696fbd9362f64f52.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("研发根据这些信息可以更加了解该异常的信息，就好像在用户浏览器的控制台上看到了异常信息一样方便。")]),t._v(" "),a("p",[t._v("除此以外，异常的基本环境信息也是排查定位异常的重要条件，比如某些兼容性的异常只发生低版本浏览器中，有的异常只发生在 JDAPP 中，有的只发生在微信小程序环境中，这些都会为我们进一步判断定位异常给了丰富的信息，而异常所处的城市信息，则可以判断一些资源加载异常是否是该地区的网络发生抖动导致：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img14.360buyimg.com/imagetools/jfs/t1/175961/9/27284/19196/632bd039Ee547361b/832b684ab90698d1.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("当前上述信息大部分来自于上报的客户端的 "),a("code",[t._v("User-Agent")]),t._v(" 和 "),a("code",[t._v("cookie")]),t._v("，但是有的时候我们可能提前的字段有限，若想要更多的信息，平台也贴心的展示了该异常的 "),a("code",[t._v("URL")]),t._v(","),a("code",[t._v("User-Agent")]),t._v(" 和 "),a("code",[t._v("cookie")]),t._v("，便于研发获取更多的字段信息：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img13.360buyimg.com/imagetools/jfs/t1/116828/4/29280/27690/632bd0f9Ef2284e2b/f73178dc9ed14949.jpg",alt:"img"}})]),t._v(" "),a("p",[t._v("当然异常详情远远不止这些，记录用户的时间线，包含打开页面后每个时刻请求了哪些接口？点击了哪些元素？跳转了哪些路由？这些都以时间线的形式在平台展示出来：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img11.360buyimg.com/imagetools/jfs/t1/25558/16/19632/40750/632bd2ccE1e281871/611319ce2e37f206.png",alt:"img"}}),t._v(" "),a("img",{attrs:{src:"https://img10.360buyimg.com/imagetools/jfs/t1/193832/24/29338/43701/632bd2d0E9e28337a/092af368385e1e08.png",alt:"img"}})]),t._v(" "),a("p",[t._v("考虑到上报数据量大小受限，并且往往发生异常时和最后一个异常接口的返回数据有关系，所以平台只保留了最后一个请求的接口返回数据供研发参考，用于判断是否由于接口返回的数据导致异常的发生：\n"),a("img",{attrs:{src:"https://img11.360buyimg.com/imagetools/jfs/t1/140324/30/29428/56011/632bd2d3E0cfa7e68/aa5d3328fa7ff693.png",alt:"img"}})]),t._v(" "),a("p",[t._v("如果仅仅是文字和数据冷冰冰的展示，无法更加直观的了解到异常对用户的影响，我们不知道发生异常时用户的界面时什么样子的？是弹窗了还是白屏了？为了更好的展示用户的操作行为以及最终页面的展示情况，平台提供了视频回溯功能：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img12.360buyimg.com/imagetools/jfs/t1/121658/32/29688/1686402/632c0535E2228305e/2d382ba48eafb673.gif",alt:"img"}})]),t._v(" "),a("p",[t._v("不过视频回溯功能的底层原理是根据截取用户页面 DOM 元素快照生成的 JSON 数据上报到服务端的，这就会导致所涉及到的请求资源链接以字符串的形式上报到数据中，例如用户访问的时候网络波动，请求的图片是加载失败的，但是在监控平台回放视频的时候，会重新请求这些资源，这时候又会请求到图片，所以对于加载静态资源这里并无法完美的展示用户当时的状态，于是我们做了改动，对于开启了视频回溯功能的项目，如果是加载静态资源失败的异常，就会截图上报来替换视频上报，这样能够更好的还原用户当时的页面情况。")]),t._v(" "),a("h2",{attrs:{id:"咚咚告警"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#咚咚告警"}},[t._v("#")]),t._v(" 咚咚告警")]),t._v(" "),a("p",[t._v("告警服务是异常监控必不可少的一项功能，目前平台提供了咚咚告警信息，计划中未来会支持邮箱告警。现在先介绍一下咚咚告警吧。\n新建立项目后，每个成员的异常咚咚告警信息是默认打开的，每个项目拥有多个成员，每个成员只能设置自己的咚咚告警规则，成员之间是相互独立的。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img10.360buyimg.com/imagetools/jfs/t1/211174/31/26695/60693/632c17bbEf58f33b0/2f74faeb59d47c7e.png",alt:"img"}})]),t._v(" "),a("p",[t._v("除了默认的系统告警规则外，还可以自定义每种类型的告警规则，方便更加关注自己需要的异常类型：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img10.360buyimg.com/imagetools/jfs/t1/34175/8/18688/69136/632c17b6Ebce1e590/a1d06c3f0f8ad987.png",alt:"img"}})]),t._v(" "),a("p",[t._v("对于自定义异常类型，由于研发往往需要设置多个自定义异常类型，如果将所有的自定义异常统一告警，无法更好的分辨具体是哪里出的问题，所以平台还提供了自定义异常类型按照设的 customKey 分类的告警规则")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img14.360buyimg.com/imagetools/jfs/t1/120037/32/26422/39002/632c17b2E3e22cc74/ef924a89316703d9.png",alt:"img"}})]),t._v(" "),a("p",[t._v("然后在自定义异常类型的时候，可以将刚刚设置的 customeKey 放进去：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Watchtower"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catchExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"测试自定义异常信息"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  customKey"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"custom_key"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  errorDetail"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    numProp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1245")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])]),a("h2",{attrs:{id:"pv-数据统计"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pv-数据统计"}},[t._v("#")]),t._v(" PV 数据统计")]),t._v(" "),a("p",[t._v("除了异常信息统计外，还有一个指标相信大家也很感兴趣，就是反应了项目的访问量，也就是 PV 数据，该数据既可以反应该项目的用户访问量，也可以作为异常占比的参考指标，比如有的异常数量虽然很多但是占比访问量很小，有的异常绝对数量很少，但是占比访问量很大，对于占比量很大的异常就要多多关注了。规划中后期 PV 访问量还会增加访问地域的分布，便于分析异常地域和访问量 pv 的数据占比统计分析。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img14.360buyimg.com/imagetools/jfs/t1/116802/9/27758/27751/632c22c0Ed421962a/0b2126c88376fe22.jpg",alt:"img"}})]),t._v(" "),a("h2",{attrs:{id:"我的项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#我的项目"}},[t._v("#")]),t._v(" 我的项目")]),t._v(" "),a("p",[t._v("当接入了很多项目，如何便捷的进行管理呢？平台提供了可以查看自己名下所参与到的所有项目，点击右上角自己头像的下拉菜单即可看到，可以选择日期查看项目的创建日期，项目成员，计划中后期会把所有操作项目成员的操作都集成到该页面，方便对自己名下的项目做进一步的管理：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img14.360buyimg.com/imagetools/jfs/t1/208435/2/26133/36989/632c20a1Ea595256c/b1a9fc28f9560c45.jpg",alt:"img"}})]),t._v(" "),a("h2",{attrs:{id:"结尾"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结尾"}},[t._v("#")]),t._v(" 结尾")]),t._v(" "),a("p",[t._v("本篇文章介绍了 "),a("a",{attrs:{href:"http://watchtower.jd.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("Watchtower 前端异常监控平台"),a("OutboundLink")],1),t._v("目前主要功能，在开发过程中我们也收到了很多用户反馈的建议，在此对广大用户表示深深的感谢，正式有你们的反馈和使用，才是我们不断前进的动力。在不断优化迭代和逐渐推出新增功能的过程中，我们也相信可以把平台从单一的功能逐步做的更加完善，功能更加丰富。\n最后再次欢迎大家使用 "),a("a",{attrs:{href:"http://watchtower.jd.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("Watchtower 前端异常监控平台"),a("OutboundLink")],1),t._v("，咚咚群号：82075599，期待你的加入哦～")])])}),[],!1,null,null,null);s.default=n.exports}}]);