---
sidebarDepth: 1
---

NestJS 官方中文文档： https://docs.nestjs.cn/

### 1、安装

```js
$ npm i -g @nestjs/cli
$ nest new project-name
```

### 2、获取请求参数

#### 2.1 获取 Get 请求的入参

```js
import { Controller, Get, Query } from "@nestjs/common";
@Controller()
export class AppController {
  //...
  @Get()
  getHello(@Query() request: Request): string {
    return this.appService.getHello(request);
  }
}
```

#### 2.2 获取 Post 请求的入参

```js
import { Controller, Post, Body } from "@nestjs/common";
@Controller()
export class AppController {
  //...
  @Post()
  getHello(@Body() body: IFileUrl): string {
    return this.appService.getHello(body);
  }
}
```

### 2.3 使用 @Ip 获取用户访问 ip

### 2.4 使用 @Param 获取动态路由参数

访问网址： `http://localhost:3002/cats/api/getHello/563`

```js
@Get('getHello/:id')
getHello(
    @Param() parmas: Record<string,any>,
): string {
    return parmas.id;
}
```

再或者

```js
@Get('getHello/:id')
getHello(
    @Param('id') id: string,
): string {
    return id;
}
```

### 3、@Controller('cats') 装饰器中使用路径前缀可以使我们轻松地对一组相关的路由进行分组

如下需要访问 `http://localhost:3002/cats/api/getHello?name=xiaoli`

```js
@Controller('cats/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  getHello(@Query() request: Request): string {
    console.log(request);
    return this.appService.getHello(request);
  }
}
```

### 4、使用 session

**4.1 安装**

```js
$ npm i express-session
$ npm i -D @types/express-session
```

**4.2 在 main 入口文件中初始化**

```js
import * as session from "express-session";
// somewhere in your initialization file
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);
```

**4.3 调用**

```js
@Get('getSeesion')
getSession(@Session() session: Record<string, any>): string {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log(session.visits);
    return session.visits;
}
```

### 5、@Res 公开底层响应对象接口

> 注意，在方法处理程序中注入 @Res()或 @Response() 时，将 Nest 置于该处理程序的特定于库的模式中，并负责管理响应。这样做时，必须通过调用响应对象(例如，res.json(…)或 res.send(…))发出某种响应，否则 HTTP 服务器将挂起。

```js
  @Get('getSeesion')
  getSession(@Session() session: Record<string, any>, @Res() res) {
    session.visits = session.visits ? session.visits + 1 : 1;
    res.status(200).json({ success: true });
  }
```

### 7、重定向

访问 `http://localhost:3002/cats/api/docs/version=5` 跳转到 `https://docs.nestjs.com/v5/`
访问 `http://localhost:3002/cats/api/docs/version=1` 跳转到 `https://www.baidu.com`

```js
  @Get('docs')
  @Redirect('https://www.baidu.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
```

### 8、Module 配置文件的含义

mudule 文件需要使用一个@Module() 装饰器的类，装饰器可以理解成一个封装好的函数，其实是一个语法糖
导入的时候是导入 module 文件而不是 service 文件。

> 注意：providers 是用来注入对应的 service 的，比如 SourceMap 模块自己的 SourceMapService，exports 是导出 service 的让其他模块使用

```js
@Module({
    imports: [DatabaseModule, IssueModule],//导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
    providers: [SourceMapService],//Nest注入器实例化的提供者（服务提供者），处理具体的业务逻辑[操作数据库]，各个模块之间可以共享
    exports: [SourceMapService],//导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；
    controllers: [SourceMapController],//处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理；
})
```

NestJS 就为我们提供了这么一个控制反转器（IoC），我们不需要关注类之间的依赖顺序，只需要将依赖实例化的任务委派给控制反转器，它就会自动分析好依赖关系图，按需进行实例化。这个实例化的委托过程我们称之为“依赖注入”。

比如 dogs 模块中要使用 cats 模块中 CatsService 定义的方法

**步骤一：** CatsService 使用 `@Injectable()` 进行依赖注入，声明该类是一个可供注入的类

```js
//cats.service.ts
@Injectable()
export class CatsService {
  getCatsName(request) {
    return "this cat‘s name is " + request.name;
  }
}
```

**步骤二：** 在 CatsModule 中提供出去（模块文件中配置 Nest 注入器服务提供程序）

```js
//cats.module.ts
@Module({
  controllers: [CatsController],//cats模块使用到的Controller
  providers: [CatsService],//cats模块使用的service
  exports: [CatsService],//cats模块导出的service
})
```

**步骤三** 在 DogsModule 中 imports 引入 CatsService，并且提供给该模块的是 DogsService, CatsService 两个 service

```js
//dogs.module.ts
@Module({
  imports: [CatsService],
  controllers: [DogsController],
  providers: [DogsService, CatsService],
})
```

**步骤四** 在 DogsService 中调用 CatsService 的方法

基于构造函数的注入，即通过构造函数方法注入 providers。

```js
//dogs.service.ts
@Injectable()
export class DogsService {
  constructor(private catsService: CatsService) {}//需要在constructor中设置属性，其TS类型是class类，后面调用该service
  getDogsName(request) {
    return this.catsService.getCatsName(request);
  }
}
```

### 9、给 service 的类添加属性

```js
@Injectable()
export class CatsService {
  name: string; //先要声明属性
  constructor(parmas: string) {
    //初始化class传入的参数
    this.name = "xioahu" + parmas; //这里才能赋值属性
  }
  getCatsName(request) {
    return "this cat‘s name is " + request.name;
  }
}
```

### 10、基于属性的注入

例如 dogs 的 service 中要调用 cats 的 service 中类的属性

```js
//cats.service.ts
import { Injectable } from '@nestjs/common';
@Injectable()
export class CatsService {
  public readonly name: string; //声明属性
  constructor() {
    //初始化class传入的参数
    this.name = 'xioahu';
  }
  getCatsName(request) {
    return 'this cat‘s name is ' + request.name;
  }
}
```

在 dogs.service.ts 中调用

```js
@Injectable()
export class DogsService {
  constructor(@Inject('CatsService') private catsService: CatsService) {}
  getDogsName(request) {
    console.log(this.catsService.name);//这里可以访问到cats中的属性
    return this.catsService.getCatsName(request);//这里访问cats中的方法
  }
}
```

### 11、全局模块

提供者是在全局范围内注册的。一旦定义，他们到处可用。helper，数据库连接等等。

比如有 fishes 模块想要全局使用，

```js
//fishes.module.ts
@Global()
@Module({
  controllers: [FishesController],
  providers: [FishesService],
  exports: [FishesService], //要导出
})
export class FishesModule {}
```

在根结点上引入

```js
import { FishesModule } from './fishes/fishes.module';
@Module({
  imports: [DogsModule, CatsModule, FishesModule],
})
```

然后在 dogs 模块上使用

```js
import { FishesService } from '../fishes/fishes.service';//需要引入FishesService
@Injectable()
export class DogsService {
  constructor(
    @Inject('CatsService') private catsService: CatsService,
    private fishesService: FishesService,//需要在constructor中设置属性
  ) {}
  getDogsName(request) {
    return this.fishesService.getFishesName(request);//调用全局模块FishesService
  }
}
```

### 12、中间件

中间件代码：

```js
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
  }
}
```

在入口文件

```js
@Module({
  imports: [DogsModule, CatsModule, FishesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "cats/getName", method: RequestMethod.GET }); //path规定了具体的url路径，method规定了请求方法
  }
}
//forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
//forRoutes(CatsController);传入一个控制器类
```

匹配通用路径：

```js
configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats'); //匹配路径上带有cats的url
  }
}
```

多个中间件

```js
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      .forRoutes({ path: "cats/getName", method: RequestMethod.GET });
  }
}
```
