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

---

报类似这样的错误： `Current process list running is not in sync with saved list. App BookStack differs. Type ‘pm2 save’ to synchronize.`

按先后顺序，执行如下操作：

```js
pm2 update
pm2 save
pm2 list
```

6、注意每次更新代码可以先使用其他端口开发，开发完后改为 6005 端口，重新执行 1-5 步骤，记得不要关闭 pm2 的进程
