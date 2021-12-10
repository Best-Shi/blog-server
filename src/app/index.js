const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const router = require("../routers/routers");
const handlerError = require("./error.handler");

const app = new Koa();

app.use(bodyParser());

// 路由处理
app.router = router;
app.router();

// 错误处理
app.on("error", handlerError);

module.exports = app;
