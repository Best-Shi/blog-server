const responseDataHandle = require("../../utils/response.data.handle");
const service = require("./classify.service");

class ClassifyController {
    // 获取分类数据
    async list(ctx, next) {
        const uid = ctx.user.id;
        try {
            const data = await service.list(uid);
            ctx.body = responseDataHandle("REQUEST_SUCCESS", { list: data });
        } catch (err) {
            ctx.app.emit("error", "REQUEST_FAIL", ctx);
        }
    }
    // 新增分类
    async create(ctx, next) {
        const uid = ctx.user.id;
        const data = ctx.request.body;
        try {
            await service.create(uid, data);
            ctx.body = responseDataHandle("CREATE_SUCCESS");
        } catch (err) {
            ctx.app.emit("error", "CREATE_FAIL", ctx);
        }
    }
}

module.exports = new ClassifyController();
