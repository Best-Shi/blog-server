const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { classifyList, create } = require("./classify.controller");

const router = new Router({
    prefix: "/classify",
});

router.post("/", verifyAuth, classifyList);
router.post("/create", verifyAuth, create);

module.exports = router;
