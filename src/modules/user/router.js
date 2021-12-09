const Router = require("@koa/router");
const router = new Router({
    prefix: "/user",
});

router.post("/", (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = "Hello World";
});

module.exports = router;
