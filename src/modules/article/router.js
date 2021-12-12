const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { create, edit, detail } = require("./article.controller");

const router = new Router({
    prefix: "/article",
});

router.post("/create", verifyAuth, create);
router.post("/edit", verifyAuth, edit);
router.post("/detail", verifyAuth, detail);

module.exports = router;
