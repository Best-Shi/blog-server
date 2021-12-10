const service = require("./user.service");

class UserController {
    async create(ctx, next) {
        return ctx.app.emit("error", "404", ctx);
        // 获取请求参数
        const user = ctx.request.body;
        // TODO: 需要校验传入的参数是否正确
        // 查询数据库
        const result = await service.create(user);
        // 返回数据
        ctx.body = result;
    }
}

module.exports = new UserController();
