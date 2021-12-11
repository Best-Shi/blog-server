/**
 * token 授权验证
 */

const jwt = require("jsonwebtoken");

const { PUBLIC_KEY } = require("../../config/index");

const verifyAuth = async (ctx, next) => {
    // 获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        return ctx.app.emit("error", "UNAUTHORIZED", ctx);
    }
    const token = authorization.replace("Bearer ", "");
    // 验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"],
        });
        ctx.user = result;
        await next();
    } catch (err) {
        ctx.app.emit("error", "UNAUTHORIZED", ctx);
    }
};

module.exports = verifyAuth;
