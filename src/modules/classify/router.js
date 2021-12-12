const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { list } = require("./classify.controller");

const router = new Router({
    prefix: "/classify",
});

router.get("/", verifyAuth, list);

module.exports = router;
