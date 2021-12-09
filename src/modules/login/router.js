const Router = require("@koa/router");
const router = new Router({
    prefix: "/login",
});

router.post("/", (ctx, next) => {
    ctx.body = "Hello World";
});

module.exports = router;
