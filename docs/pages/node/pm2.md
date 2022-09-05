## pm2 开机自启动

1、首先在项目根目录使用 pm2 启动项目

```js
pm2 start ./dist/main.js
```

2、生成开机启动 pm2 服务的配置文件

运行：pm2 startup 命令，会生成以下命令

```js
To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/home/user1/.nvm/versions/node/v8.8.1/bin /home/user1/.nvm/versions/node/v8.8.1/lib/node_modules/pm2/bin/pm2
 startup systemd -u user1 --hp /home/user1
```

3、粘贴上面的命令到终端

```js
sudo env PATH=$PATH:/home/user1/.nvm/versions/node/v8.8.1/bin /home/user1/.nvm/versions/node/v8.8.1/lib/node_modules/pm2/bin/pm2
 startup systemd -u user1 --hp /home/user1
```

4、输入密码后自动配置

5、执行 `pm2 save` 保存当前 pm2 运行的各个应用保存到 /home/user1/.pm2/dump.pm2 下，开机重启时读取该文件中的内容启动相关应用
