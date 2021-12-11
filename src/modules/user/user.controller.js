const responseDataHandle = require("../../utils/response.data.handle");
const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = require("../../../config");

class UserController {
    async login(ctx, next) {
        const { id, username } = ctx.user;
        const token = jwt.sign({ id, username }, PRIVATE_KEY, {
            expiresIn: 60 * 60,
            algorithm: "RS256",
        });
        ctx.body = responseDataHandle("LOGIN_SUCCESSFUL", { id, username, token });
    }
}

module.exports = new UserController();
