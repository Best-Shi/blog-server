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
    // 修改分类
    async update(ctx, next) {
        const uid = ctx.user.id;
        const { id, ...data } = ctx.request.body;
        try {
            const clissify = await service.classifyById(id, uid);
            if (clissify) {
                await service.update(id, data);
                ctx.body = responseDataHandle("UPDATE_SUCCESS");
            } else {
                ctx.app.emit("error", "UPDATE_FAIL", ctx);
            }
        } catch (err) {
            ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
    }
    // 删除分类
    async del(ctx, next) {
        const uid = ctx.user.id;
        const { id } = ctx.params;
        try {
            const clissify = await service.classifyById(id, uid);
            if (clissify) {
                await service.del(id, uid);
                ctx.body = responseDataHandle("DEL_SUCCESS");
            } else {
                ctx.app.emit("error", "DEL_FAIL", ctx);
            }
        } catch (err) {
            ctx.app.emit("error", "DEL_FAIL", ctx);
        }
    }
}

module.exports = new ClassifyController();
