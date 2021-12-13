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
}

module.exports = new LabelController();
