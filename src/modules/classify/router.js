const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { classifyList } = require("./classify.controller");

const router = new Router({
    prefix: "/classify",
});

router.post("/", verifyAuth, classifyList);

module.exports = router;
