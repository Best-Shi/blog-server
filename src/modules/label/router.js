const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");

const { create, edit } = require("./label.controller");

const router = new Router({
    prefix: "/label",
});

router.post("/create", verifyAuth, create);
router.post("/edit", verifyAuth, edit);

module.exports = router;
