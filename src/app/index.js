const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const router = require("../routers/routers");

const app = new Koa();

app.use(bodyParser());
router(app);

module.exports = app;
