const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { create } = require("./label.controller");

const router = new Router({
    prefix: "/label",
});

router.post("/create", verifyAuth, create);

module.exports = router;
