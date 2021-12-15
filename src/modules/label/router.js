const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { create, edit, detail, del } = require("./label.controller");

const router = new Router({
    prefix: "/label",
});

router.post("/create", verifyAuth, create);
router.post("/edit", verifyAuth, edit);
router.post("/:id", verifyAuth, detail);
router.post("/del/:id", verifyAuth, del);

module.exports = router;
