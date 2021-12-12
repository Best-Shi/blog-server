const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { classifyList, create, edit, del } = require("./classify.controller");

const { verifyExist } = require("./classify.verify");

const router = new Router({
    prefix: "/classify",
});

router.post("/", verifyAuth, classifyList);
router.post("/create", verifyAuth, create);
router.post("/edit", verifyAuth, verifyExist, edit);
router.post("/del", verifyAuth, del);

module.exports = router;
