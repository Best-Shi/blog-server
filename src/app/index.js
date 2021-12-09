const Koa = require("koa");

const router = require("../routers/routers");

const app = new Koa();

router(app);

module.exports = app;
