(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{188:function(t,a,s){t.exports=s.p+"assets/img/cache-pic.615b2803.png"},189:function(t,a,s){t.exports=s.p+"assets/img/render-html.fbd13f69.png"},190:function(t,a,s){t.exports=s.p+"assets/img/youhua.cf450d9c.png"},286:function(t,a,s){"use strict";s.r(a);var r=s(6),e=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"_1、进行-url-解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、进行-url-解析"}},[t._v("#")]),t._v(" 1、进行 URL 解析")]),t._v(" "),a("ul",[a("li",[t._v("1、网络标准定义 URL 只能使用字母和数字以及其他特殊符号，若不转义可能会出现歧义，如出现其他语言。")]),t._v(" "),a("li",[t._v("2、浏览器 URL 编码，用的是操作系统的默认编码。如 GB2312 编码(Firefox/IE)和 utf-8 编码(Firefox/chrome)")]),t._v(" "),a("li",[t._v("3、为了保证客户端只用一种编码方法向服务器发出请求，就是使用 Javascript 先对 URL 编码，然后再向服务器提交，不要给浏览器插手的机会。因为 Javascript 的输出总是一致的，所以就保证了服务器得到的数据是格式统一的。")]),t._v(" "),a("li",[t._v("4、两种对 URL 编码：\n"),a("ul",[a("li",[t._v("4.1 encodeURI()：对整个 URL 进行编码，有特殊含义的符号"),a("code",[t._v("; / ? : @ & = + $ , #")]),t._v("，不进行编码(要保证整个 URL 的含义正确)，解码函数是 decodeURI()。")]),t._v(" "),a("li",[t._v("4.2 encodeURIComponent()，用于对 URL 的组成部分进行个别编码，而不用于对整个 URL 进行编码。因此，"),a("code",[t._v("; / ? : @ & = + $ , #")]),t._v("会被编码，它对应的解码函数是 decodeURIComponent()。")]),t._v(" "),a("li",[t._v("4.3 URI 包括 URL 和 URN 两个类别，URL 是 URI 的子集，所以 URL 一定是 URI，而 URI 不一定是 URL；\n"),a("ul",[a("li",[t._v("4.3.1 URI：统一资源标志符，用来标识抽象或物理资源的一个紧凑字符串；")]),t._v(" "),a("li",[t._v("4.3.2 URL：统一资源定位符，一种定位资源的主要访问机制的字符串")])])])])])]),t._v(" "),a("h4",{attrs:{id:"各种编码的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#各种编码的区别"}},[t._v("#")]),t._v(" 各种编码的区别")]),t._v(" "),a("ul",[a("li",[t._v("Unicode 英文编码，包含 ASCII 字母、数字、标点符号")]),t._v(" "),a("li",[t._v("GB2312 是对 ASCII 的中文扩展。[GB 表示国标]")]),t._v(" "),a("li",[t._v("GBK 对 GB2312 的扩展：一个汉字=两个英文字符")]),t._v(" "),a("li",[t._v("UNICODE 编码 IOS 组织包括地球上所有字符，一个汉字=一个英文字符=两个字节")]),t._v(" "),a("li",[t._v("UTF-8 网络上传输标准，UTF8 就是每次 8 个位传输数据，而 UTF16 就是每次 16 个位，")]),t._v(" "),a("li",[t._v("UTF-8 是世界性通用代码，也完美的支持中文编码，如果我们做的网站能让国外用户正常的访问，就最好用 UTF-8。")]),t._v(" "),a("li",[t._v("GB2312 属于中文编码，主要针对国内用户使用，如果国外用户访问 GB2312 编码的网站就会变乱码。")])]),t._v(" "),a("h3",{attrs:{id:"_2、dns-解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、dns-解析"}},[t._v("#")]),t._v(" 2、DNS 解析")]),t._v(" "),a("ul",[a("li",[t._v("浏览器输入 URL，先查浏览器缓存的域名否有对应 IP 记录")]),t._v(" "),a("li",[t._v("若无，再去查本地 host 文件对应 IP 地址")]),t._v(" "),a("li",[t._v("若无，则去找 DNS 服务器，包括路由缓存和互联网 DNS 服务器, 以及 13 台根服务器")])]),t._v(" "),a("p",[t._v("前端的 DNS 优化，可以在 html 页面头部写入 DNS 缓存地址，比如")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("x-dns-prefetch-control"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://www/xxx.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h3",{attrs:{id:"_3、http-协议的三次握手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、http-协议的三次握手"}},[t._v("#")]),t._v(" 3、http 协议的三次握手")]),t._v(" "),a("ul",[a("li",[t._v("1、第一次握手：主机 A 给服务器发送 TCP 包，包含确认码 seq；")]),t._v(" "),a("li",[t._v("2、第二次握手：主机 B 收到请求后，向主机 A 放确认码 seq+1；")]),t._v(" "),a("li",[t._v("3、第三次握手：主机 A 确认确认码正确后，向主机 B 发送确认码 seq+2，主机 B 接受后确认连接成功；")])]),t._v(" "),a("h4",{attrs:{id:"为什么两次握手不行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么两次握手不行"}},[t._v("#")]),t._v(" 为什么两次握手不行？")]),t._v(" "),a("ul",[a("li",[t._v("第二次握手，主机 B 无法确认主机 A 是否收到确认码，导致主机 B 一旦收到请求就发送数据，服务器很容易受到攻击。")])]),t._v(" "),a("h3",{attrs:{id:"_4、浏览器缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、浏览器缓存"}},[t._v("#")]),t._v(" 4、浏览器缓存")]),t._v(" "),a("h4",{attrs:{id:"_4-1-html-meta-标签控制缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-html-meta-标签控制缓存"}},[t._v("#")]),t._v(" 4.1 HTML Meta 标签控制缓存")]),t._v(" "),a("p",[t._v("虽然 mate 标签可以设置缓存策略："),a("code",[t._v('<META HTTP-EQUIV="Pragma" CONTENT="no-cache">')]),t._v("，但是由于兼容性问题，该方法不实用；")]),t._v(" "),a("h4",{attrs:{id:"_4-2-浏览器缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-浏览器缓存"}},[t._v("#")]),t._v(" 4.2 浏览器缓存")]),t._v(" "),a("p",[t._v("在浏览器本地缓存失效后,浏览器会向 CDN 边缘节点发起请求,遵循 http 标准协议:")]),t._v(" "),a("p",[a("img",{attrs:{src:s(188),alt:"img"}})]),t._v(" "),a("h3",{attrs:{id:"_5、解析-html"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、解析-html"}},[t._v("#")]),t._v(" 5、解析 Html")]),t._v(" "),a("ul",[a("li",[t._v("1、从上到下解析 Html 标签生成 DOM 树；")]),t._v(" "),a("li",[t._v("2、遇见外链的 CSS 和内联 JS，会暂停解析，请求下载并执行脚本；")]),t._v(" "),a("li",[t._v("4、遇见 img 标签，下载请求对应的图片（该过程不会阻塞 HTML 解析）")]),t._v(" "),a("li",[t._v("5、根据生成的 DOM 树和 解析的 CSS 树，生成布局渲染树(render tree)")]),t._v(" "),a("li",[t._v("6、计算每一个元素的大小、位置等，给出每个节点所应该在屏幕上出现的精确坐标")]),t._v(" "),a("li",[t._v("7、绘制渲染树，根据布局渲染树进行绘制；")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(189),alt:"img"}})]),t._v(" "),a("h4",{attrs:{id:"_5-1-重绘和重排的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-重绘和重排的区别"}},[t._v("#")]),t._v(" 5.1 重绘和重排的区别")]),t._v(" "),a("ul",[a("li",[t._v("重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。如颜色的改变；")]),t._v(" "),a("li",[t._v("重排（回流）当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流；")]),t._v(" "),a("li",[t._v("『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』")])]),t._v(" "),a("h4",{attrs:{id:"_5-2-如何避免重绘或者重排"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-如何避免重绘或者重排"}},[t._v("#")]),t._v(" 5.2 如何避免重绘或者重排？")]),t._v(" "),a("p",[a("img",{attrs:{src:s(190),alt:"img"}})]),t._v(" "),a("h3",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://juejin.cn/post/6928677404332425223",target:"_blank",rel:"noopener noreferrer"}},[t._v("阿里面试官的”说一下从 url 输入到返回请求的过程“问的难度就是不一样！"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/shanwater/p/5616589.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("编码方式的比较，以及 UTF-8，gb2312 的选择"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/xiaozhumaopao/p/14724802.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("彻底理解浏览器的缓存机制"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/xiaozhumaopao/p/14724819.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("浏览器的渲染/重绘原理"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000017962411",target:"_blank",rel:"noopener noreferrer"}},[t._v("实践这一次，彻底搞懂浏览器缓存机制"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/",target:"_blank",rel:"noopener noreferrer"}},[t._v("浏览器的工作原理：新式网络浏览器幕后揭秘"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/22181897",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何减少 HTML 页面回流与重绘"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.imooc.com/article/269665",target:"_blank",rel:"noopener noreferrer"}},[t._v("重排与重绘"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);