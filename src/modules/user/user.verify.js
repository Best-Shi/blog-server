const { getUserByName, getUserById } = require("./user.service");
const sha256Password = require("../../utils/password.handle");

const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    // 判断用户名或密码是否为空
    if ((!username && !username.trim()) || (!password && !password.trim())) {
        return ctx.app.emit("error", "USERNAME_PASSWORD_IS_REQUIRED", ctx);
    }

    // 判断用户是否存在数据库中
    const user = await getUserByName(username);
    if (!user) {
        return ctx.app.emit("error", "USER_DOES_NOT_EXISTS", ctx);
    }

    // 判断用户名和密码是否正确
    if (sha256Password(password) !== user.password) {
        return ctx.app.emit("error", "PASSWORD_IS_INCORRENT", ctx);
    }

    ctx.user = user;
    await next();
};

const verifyEdit = async (ctx, next) => {
    const { id, username } = ctx.request.body;

    // 判断有没有id
    if (!id) {
        return ctx.app.emit("error", "ID_IS_REQUIRED", ctx);
    } else {
        if (id !== ctx.user.id) {
            return ctx.app.emit("error", "ID_AND_USERID_MISMATCH", ctx);
        }
        const user = await getUserById(id);
        if (!user) {
            return ctx.app.emit("error", "USER_DOES_NOT_EXISTS", ctx);
        }
    }

    // 有用户名，判断用户名是否重复
    if (username && username.trim()) {
        const user = await getUserByName(username);
        if (!user) {
            return ctx.app.emit("error", "USERNAME_REPEAT", ctx);
        }
    }

    await next();
};

const verifyPassword = async (ctx, next) => {
    const { id, password } = ctx.request.body;

    // 判断有没有id
    if (!id) {
        return ctx.app.emit("error", "ID_IS_REQUIRED", ctx);
    } else {
        if (id !== ctx.user.id) {
            return ctx.app.emit("error", "ID_AND_USERID_MISMATCH", ctx);
        }
        const user = await getUserById(id);
        if (!user) {
            return ctx.app.emit("error", "USER_DOES_NOT_EXISTS", ctx);
        }
    }

    // 有密码，判断密码是否为空
    if (password && !password.trim()) {
        return ctx.app.emit("error", "PASSWORD_IS_REQUIRED", ctx);
    }
    await next();
};

module.exports = {
    verifyLogin,
    verifyEdit,
    verifyPassword,
};
