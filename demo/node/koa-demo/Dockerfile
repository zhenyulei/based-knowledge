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
