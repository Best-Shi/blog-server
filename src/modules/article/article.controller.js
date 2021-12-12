const responseDataHandle = require("../../utils/response.data.handle");
const { create } = require("./article.service");

class ArticleController {
    // 创建文章
    async create(ctx, next) {
        const data = ctx.request.body;
        data.uid = ctx.user.id;
        try {
            await create(data);
            ctx.body = responseDataHandle("CREATE_SUCCESS");
        } catch (err) {
            ctx.app.emit("error", "CREATE_FAIL", ctx);
        }
    }
}

module.exports = new ArticleController();
