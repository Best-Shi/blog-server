const responseDataHandle = require("../../utils/response.data.handle");
const service = require("./label.service");

class LabelController {
    // 新增标签
    async create(ctx, next) {
        const uid = ctx.user.id;
        const data = ctx.request.body;
        if (data.style) {
            data.style = JSON.stringify(data.style);
        }
        try {
            if (!data.label.trim()) {
                return ctx.app.emit("error", "CREATE_FAIL", ctx);
            }
            await service.create(uid, data);
            ctx.body = responseDataHandle("CREATE_SUCCESS");
        } catch (err) {
            ctx.app.emit("error", "CREATE_FAIL", ctx);
        }
    }
    // 编辑标签
    async edit(ctx, next) {
        const uid = ctx.user.id;
        const { id, ...data } = ctx.request.body;
        if (!id) {
            return ctx.app.emit("error", "ID_IS_REQUIRED", ctx);
        } else {
            try {
                const label = await service.getLabelById(id, uid);
                if (!label) {
                    return ctx.app.emit("error", "UPDATE_FAIL", ctx);
                }
            } catch (err) {
                return ctx.app.emit("error", "UPDATE_FAIL", ctx);
            }
        }
        if (data.style) {
            data.style = JSON.stringify(data.style);
        }
        try {
            if (!data.label.trim()) {
                return ctx.app.emit("error", "UPDATE_FAIL", ctx);
            }
            await service.edit(id, uid, data);
            ctx.body = responseDataHandle("UPDATE_SUCCESS");
        } catch (err) {
            ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
    }
}

module.exports = new LabelController();
