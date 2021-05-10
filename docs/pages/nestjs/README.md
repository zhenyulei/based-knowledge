---
sidebarDepth: 1
---

### 1、执行时机

myDemo.modules.ts 文件

```js
import { Module } from "@nestjs/common";
import { MyDemoController } from "./myDemo.controller";
import { MyDemoService } from "./myDemo.service";

@Module({
  providers: [MyDemoService], //这里引入了 MyDemoService
  controllers: [MyDemoController], //这里引入了 MyDemoController
})
export class MyDemoModule {}
```

只有在 modules.ts 文件中引入了 Service 和 Controller ，才会执行实例化对应的 Service 和 Controller 中的 class 类，比如 MyDemoService 文件中，，才会执行`初始化22222`和`初始化MyDemoService`

```js
import { Injectable, Inject } from "@nestjs/common";
console.log("初始化22222");
@Injectable()
export class MyDemoService {
  constructor() {
    console.log("初始化MyDemoService");
  }
}
```

2、验证登录
[NestJs 安全验证](https://docs.nestjs.cn/7/security?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89)

#### 配置策略

在 vanilla Passport 中，您可以通过提供以下两项配置策略:

- 组特定于该策略的选项。例如，在 JWT 策略中，您可以提供一个秘令来对令牌进行签名。

- “验证回调”，在这里您可以告诉 Passport 如何与您的用户存储交互(在这里您可以管理用户帐户)。在这里，验证用户是否存在(或创建一个新用户)，以及他们的凭据是否有效。Passport 库期望这个回调在验证成功时返回完整的用户消息，在验证失败时返回 null(失败定义为用户没有找到，或者在使用 Passport-local 的情况下，密码不匹配)。

#### 命名策略

在实现策略时，可以通过向 PassportStrategy 函数传递第二个参数来为其提供名称。如果你不这样做，每个策略将有一个默认的名称(例如，”jwt”的 jwt 策略 ):

`export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt')`

然后，通过一个像 @AuthGuard('myjwt') 这样的装饰器来引用它。
