const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { list, create } = require("./classify.controller");

const router = new Router({
    prefix: "/classify",
});

router.get("/", verifyAuth, list);
router.post("/create", verifyAuth, create);

module.exports = router;
