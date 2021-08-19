const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("koa-router")();
const cors = require("@koa/cors");
const { User } = require("./dbconfig");

const app = new Koa();
app.use(bodyParser());
app.use(cors());

router.get("/", async (ctx, next) => {
  try {
    const body = ctx.query;
    var newUser = new User({
      name: body.name,
      gender: body.gender,
      email: body.email,
    });
    var result = await newUser.save();
    ctx.body = {
      code: 200,
      result: result,
      msg: "success",
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: error,
    };
  }
});
// app.use(async (ctx) => {
//   ctx.body = {
//     msg: "hello Koa",
//   };
// });
app.use(router.routes());
app.listen(3000);
