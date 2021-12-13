const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { create, edit, detail, del, list } = require("./article.controller");

const router = new Router({
    prefix: "/article",
});

router.post("/create", verifyAuth, create);
router.post("/edit", verifyAuth, edit);
router.post("/detail/:id", verifyAuth, detail);
router.post("/del", verifyAuth, del);
router.post("/", verifyAuth, list);

module.exports = router;
