---
sidebarDepth: 1
---

### docker 基础知识汇总

### docker 常见命令

1、docker ps -a 查看当前所有 docker 容器
2、docker run xxx 创建 xxx
3、start 启动/停止 stop/重启 restart/删除已停止容器 rm【先停止再删除】
4、登陆仓库 login/拉取镜像 pull/推送 push/提交镜像 commit/给指定的容器标签‘tag’
5、查看所有本地镜像 images/删除本地镜像 rmi
6、查看容器服务打印的日志 logs/检阅容器 inspect/进入容器 exec
7、查看版本 version/docker 进程信息 info

`docker stop $(docker ps -aq)`停止所有容器
`docker rm $(docker ps -aq)` 删除所有容器

### 示例

`≈`，-it 是交互终端的意思
使用 docker 创建 ubuntu 然后在其中执行交互命令 `ls -la`

同下面的命令：

-d 在后台运行
-name 指定名称
-e 设置环境变量
-v 挂载一个文件

`docker run -it -d -name test ubuntu`

`docker exec -it test /bin/bash`

则可以进入到 test 容器的 /bin/bash 中

使用 exit 退出该容器

`docker run -p 8080:3306 mysql`

-p 把容器中的端口映射到外面宿主机来，这里是把容器 mysql 中的默认端口 3306 映射到宿主机的 8080 来

再如执行
`docker run -p 8000:3306 -e MySQL_ROOT_PASSWORD=123456 -itd --name mysql-4 mysql`
含义是使用 docker 运行 mysql，把镜像中的端口 3306 映射到宿主机端口 8000 上，并且在后台交互式运行，设置该镜像的名字为 mysql-4，密码是 123456

`docker run -it online-server:1.0 /bin/bash` 进入 docker 进行交互

### docker run -v

把宿主机上的一些文件系统挂载到容器上
例如：`docker run -v ~/Downloads/:/home -itd --name test1 ubuntu`

### 指定拉取镜像的版本号

`docker pull tomcat:8`

### 登陆 docker 帐号

首先登陆网站： https://hub.docker.com
进行注册：帐号：xiaozhumaopao；密码：axxxxx
在命令行中登陆： `docker login`
给已有的镜像打标：`docker commit id xiaozhumaopao/hello:1.0`
**容器 = 镜像 + 读写层**也就是容器是在镜像的基础上实例化出来的，
使用`docker images`可以查看当前的镜像
`docker rmi id`删除镜像  
使用`docker push xiaozhumaopao/hello:1.0`到注册的 docker 平台上
使用`docker pull xiaozhumaopao/hello:1.0`就可以拉取远端的镜像了【注意更改的阿里云镜像和官网有 10 分钟的延迟】
如果设置了私有的镜像，就要先登陆 docker

`docker logs id`或者`docker logs name` 使用 -f 命令 可以一直打印日志
`docker inspect`可以查看容器的初始化信息
`docker info`

### 制作 docker 镜像

Dockerfile 是一个由一堆命令+参数构成的脚本，使用 docker build 即可执行脚本构建镜像，自动的去做一些事，主要用于持续集成；

#### koa 代码

```js
const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  ctx.body = "hello Koa";
});
app.listen(3000);
```

#### DockerFile 示例

```DockerFile
FROM node:10

LABEL maintainer = yulei20080106@126.com

# 创建 app 目录
WORKDIR /app

# 把package.json,package-lok.json 或者 yarn.lock 复制到工作目录（相对路径）/app

# COPY ["package.json","*.lock","./"]

# 打包 app 源码
# 注意：要指定工作目录的文件名
# COPY src ./src

# 使用 .dockerignore 文件，上面两个COPY合并成一个
COPY . .

RUN ls -la /app
# 使用yarn安装app依赖
# 如果你需要构建生产环境下的代码，使用 --prod参数

RUN yarn -prod --registry=https://registry.npm.taobao.org

# 对外暴露的端口

EXPOSE 3000

CMD ["node","src/index.js"]

```

#### .dockerignore

```
node_modules
.DS_Store
dist

.lock-wscript

build/Release
.dockerignore
Dockerfile
*docker-compose*

logs
*.log

.idea
.vscode
```

使用`docker build -t xiaozhumaopao/mykoa:1.0 .`打包；
其中最后的 `.` 表示使用当前目录下的 dockerfile
docker build 之后，使用 docker images 可以查看当前的 docker 镜像
执行 `docker run -itd --name koa -p 4000:3000 xiaozhumaopao/mykoa:1.0`
使用 docker ps 可以查看当前容器
使用 `docker push xiaozhumaopao/mykoa:1.0`

### docker compose

1、安装

https://docs.docker.com/compose/install/

> 注意，mac 上安装了 docker 则自动的安装了 docker-compose

执行`docker-compose --version`可以查看其版本号

常见示例：

```yml
version: '3'
services:
  mysql:
    image:mysql
    container_name:test-mysql
    ports:
    - "8000:3306"
    enviroment:
    - MYSQL_ROOT_PASSWORD=123456
```

在该文件目录下，使用 `docker-compose up -d`执行,相当于执行了上面的 docker xxx 然后执行的-d
执行“docker-compose rm”删除刚刚建立的容器
生命周期管理：
创建： run/up
启动： start/stop/rm/restart
日志/检视：logs/ps

### 项目实战

使用 npm i koa 安装 koa 依赖后，创建 server 文件夹
使用 npx vue create front 创建 vue2 的前端项目
在 server 文件夹中，使用 docker 安装 mongo ，新建 docker-compose.yml 文件，执行`docker-compose up -d` 启动 mongo,使用 docker ps 查看启动的服务
安装 mongoose 操作 mongo，在 serve 文件夹下执行 npm i mongoose -S
新建 dbconfig.js 文件
使用`node src/dbconfig.js` 可以测试链接的数据库是否成功

开发完项目之后，在 front 文件夹中 执行 `npm run build` 新建 dockerfile 创建 nginx 命令

front 项目应为是打包了 所以不用设置 dockerignore

```dockerfile
FROM nginx

COPY ./dist /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

然后执行打包命令 `docker build -t web:1.0 .`

在 server 文件夹中新建 dockerfile

```dockerfile
FROM node:10

WORKDIR /app

COPY . .

RUN yarn install --registry==http://registry.m.jd.com/

EXPOSE 3000

CMD ["node" ,"src/app.js"]
```

修改 dbconfig.js 文件中的链接 `mongodb://root:example@db:27017/admin"`
打包 server `docker build -t server:1.0 .`

links: https://docs.docker.com/network/links/

在 front 和 server 外层编辑： docker-compose.yml
打包命令： `docker-compose up -d`

然后访问 `http://localhost:8080/`即可；

最后如果想上传 docker 到自己的 `https://hub.docker.com/u/xiaozhumaopao`上

（1）在 front 文件夹下新建 dockerfile，执行

- 使用`docker build -t xiaozhumaopao/vueweb:1.0 .`打包；
- 使用`docker push xiaozhumaopao/vueweb:1.0`上传；

（2）在 server 文件夹下新建 dockerfile，执行

- 使用`docker build -t xiaozhumaopao/koaweb:1.0 .`打包；
- 使用`docker push xiaozhumaopao/koaweb:1.0`上传；

（3）在任意一个地方新建 docker-compose.yml 文件，执行`docker-compose up -d`,然后访问 `http://localhost:8080/`即可；

```yml
version: "3"
services:
  web:
    image: xiaozhumaopao/vueweb:1.0
    restart: always
    ports:
      - "8080:80"

  server:
    image: xiaozhumaopao/koaweb:1.0
    restart: always
    ports:
      - "3000:3000"
    links:
      - mongodb:db

  mongodb:
    image: mongo
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
```
