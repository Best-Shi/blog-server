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
            console.log(err);
        }
    }
}

module.exports = new ClassifyController();
