const { getUserByName } = require("./user.service");
const sha256Password = require("../../utils/password.handle");

const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    // 判断用户名或密码是否为空
    if (!username || !password || !username.trim() || !password.trim()) {
        return ctx.app.emit("error", "USERNAME_PASSWORD_IS_REQUIRED", ctx);
    }

    // 判断用户是否存在数据库中
    const user = await getUserByName(username);
    if (!user) {
        return ctx.app.emit("error", "USERNAME_DOES_NOT_EXISTS", ctx);
    }

    // 判断用户名和密码是否正确
    if (sha256Password(password) !== user.password) {
        return ctx.app.emit("error", "PASSWORD_IS_INCORRENT", ctx);
    }

    ctx.user = user;
    await next();
};

module.exports = {
    verifyLogin,
};
