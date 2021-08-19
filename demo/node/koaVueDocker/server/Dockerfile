FROM node:10

WORKDIR /app

COPY . .

RUN yarn install --registry=https://registry.npm.taobao.org

EXPOSE 3000

CMD ["node" ,"src/app.js"]