const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  ctx.body = "hello Koa";
});
app.listen(3000);
