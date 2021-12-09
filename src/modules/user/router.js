const Router = require("@koa/router");
const router = new Router({
    prefix: "/user",
});

const { create } = require("./user.controller");

router.post("/create", create);

module.exports = router;
