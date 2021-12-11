const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = require("../../../config");

const responseDataHandle = require("../../utils/response.data.handle");
const sha256Password = require("../../utils/password.handle");
const { getUserById, updateUserInfo, updateUserPassword } = require("./user.service");

class UserController {
    // 用户登录
    async login(ctx, next) {
        const { id, username } = ctx.user;
        const token = jwt.sign({ id, username }, PRIVATE_KEY, {
            expiresIn: "2h",
            algorithm: "RS256",
        });

        const user = await getUserById(id);
        delete user.password;
        ctx.body = responseDataHandle("LOGIN_SUCCESSFUL", { user, token });
    }
    // 修改用户信息
    async edit(ctx, next) {
        const { id, ...data } = ctx.request.body;
        try {
            await updateUserInfo(data, id);
            const user = await getUserById(id);
            delete user.password;
            ctx.body = responseDataHandle("USER_INFO_UPDATE_SUCCESS", { user, token });
        } catch (error) {
            ctx.app.emit("error", "USER_INFO_UPDATE_FAIL", ctx);
        }
    }
    // 修改用户密码
    async editPassword(ctx, next) {
        const { id, password } = ctx.request.body;
        try {
            await updateUserPassword(id, sha256Password(password));
            ctx.body = responseDataHandle("PASSWORD_EDIT_SUCCESS", { id });
        } catch (error) {
            ctx.app.emit("error", "PASSWORD_EDIT_FAIL", ctx);
        }
    }
}

module.exports = new UserController();
