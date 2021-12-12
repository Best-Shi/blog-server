const responseDataHandle = require("../../utils/response.data.handle");
const { create, getArticleById, edit, detail } = require("./article.service");

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
    // 修改文章
    async edit(ctx, next) {
        const { id, ...data } = ctx.request.body;
        // 校验是否有要修改的内容
        if (Object.keys(data).length < 1) {
            return ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
        // 校验是否有 id 文章是否存在
        if (!id) {
            return ctx.app.emit("error", "ID_IS_REQUIRED", ctx);
        } else {
            const article = await getArticleById(id);
            if (!article || (article.uid !== ctx.user.id && article.isDel === 0)) {
                return ctx.app.emit("error", "ARTICLE_DOES_NOT_EXISTS", ctx);
            }
        }

        // 修改文章
        try {
            await edit(data, id);
            ctx.body = responseDataHandle("UPDATE_SUCCESS");
        } catch (err) {
            return ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
    }

    // 查看文章详情
    async detail(ctx, next) {
        const id = ctx.request.body;
        const uid = ctx.user.id;
        try {
            const article = await detail(id, uid);
            delete article.isDel;
            ctx.body = responseDataHandle("REQUEST_SUCCESS", { ...article });
        } catch (err) {
            console.log(err);
            return ctx.app.emit("error", "REQUEST_FAIL", ctx);
        }
    }
}

module.exports = new ArticleController();
