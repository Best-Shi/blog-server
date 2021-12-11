const Router = require("@koa/router");
const verifyAuth = require("../../middleware/auth.middleware");
const { verifyLogin, verifyEdit, verifyPassword } = require("./user.verify");

const router = new Router({
    prefix: "/user",
});

const { login, edit, editPassword } = require("./user.controller");

router.post("/login", verifyLogin, login);
router.post("/edit", verifyAuth, verifyEdit, edit);
router.post("/password", verifyAuth, verifyPassword, editPassword);

module.exports = router;
