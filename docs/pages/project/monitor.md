---
sidebarDepth: 1
---

### 监控平台

- 通常在发送数据埋点请求的时候使用的是 1x1 像素的图片？
  不存在跨域问题 执行过程无阻塞 体积较小 不占用 ajax 的请求限额

命名策略
在实现策略时，可以通过向 PassportStrategy 函数传递第二个参数来为其提供名称。如果你不这样做，每个策略将有一个默认的名称(例如，”jwt”的 jwt 策略 ):

export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt')
Copy to clipboardErrorCopied
然后，通过一个像 @AuthGuard('myjwt') 这样的装饰器来引用它。
