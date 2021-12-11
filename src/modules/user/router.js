const Router = require("@koa/router");
const { verifyLogin } = require("./user.verify");

const router = new Router({
    prefix: "/user",
});

const { login } = require("./user.controller");

router.post("/login", verifyLogin, login);

module.exports = router;
