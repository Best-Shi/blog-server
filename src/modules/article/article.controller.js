const responseDataHandle = require("../../utils/response.data.handle");
const { create, getArticleById, edit, detail, del, articleList, articleCount } = require("./article.service");
const service = require("./article.service");

class ArticleController {
    // 创建文章
    async create(ctx, next) {
        const data = ctx.request.body;
        const uid = ctx.user.id;
        const labels = data.labels;

        // 新增文章
        try {
            const result = await service.create(uid, data);
            // 文章与标签关联
            if (labels && Array.isArray(labels) && labels.length > 0 && result.insertId) {
                labels.forEach((item) => {
                    service.articleRelLabel(result.insertId, item);
                });
            }
            ctx.body = responseDataHandle("CREATE_SUCCESS", { id: result.insertId });
        } catch (err) {
            return ctx.app.emit("error", "CREATE_FAIL", ctx);
        }
    }
    // 修改文章
    async edit(ctx, next) {
        const { id, labels, ...data } = ctx.request.body;
        const uid = ctx.user.id;
        // 校验是否有要修改的内容
        if (Object.keys(data).length < 1) {
            return ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
        // 校验是否有 id 文章是否存在
        if (!id) {
            return ctx.app.emit("error", "ID_IS_REQUIRED", ctx);
        } else {
            try {
                const article = await service.getArticleById(id, uid);
                if (!article) {
                    return ctx.app.emit("error", "ARTICLE_DOES_NOT_EXISTS", ctx);
                }
            } catch (err) {
                return ctx.app.emit("error", "ARTICLE_DOES_NOT_EXISTS", ctx);
            }
        }

        // 修改文章
        try {
            await service.edit(id, uid, data);
            // 若果有标签字段，先删除原有标签关联关系，再关联标签
            if (labels && Array.isArray(labels)) {
                await service.delArticleLabel(id);
                if (labels.length > 0) {
                    labels.forEach((item) => {
                        service.articleRelLabel(id, item);
                    });
                }
            }
            ctx.body = responseDataHandle("UPDATE_SUCCESS");
        } catch (err) {
            console.log(err);
            return ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
    }

    // 查看文章详情
    async detail(ctx, next) {
        const { id } = ctx.params;
        const uid = ctx.user.id;
        try {
            const article = await service.detail(id, uid);
            if (article.labels) {
                article.labels = article.labels.map((item) => {
                    if (item.style) {
                        item.style = JSON.parse(item.style);
                    }
                    return item;
                });
            }
            ctx.body = responseDataHandle("REQUEST_SUCCESS", { ...article });
        } catch (err) {
            return ctx.app.emit("error", "REQUEST_FAIL", ctx);
        }
    }

    // 删除文章
    async del(ctx, next) {
        const { id } = ctx.request.body;
        const uid = ctx.user.id;
        try {
            await service.del(id, ui);
            ctx.body = responseDataHandle("DEL_SUCCESS");
        } catch (err) {
            return ctx.app.emit("error", "DEL_FAIL", ctx);
        }
    }

    // 文章列表
    async list(ctx, next) {
        const uid = ctx.user.id;
        const { currentpage = 1, pagesize = 10, filterText = "" } = ctx.request.body;

        // 计算分页
        const size = parseInt(pagesize);
        const current = (parseInt(currentpage) - 1) * size;

        try {
            let list = await articleList(uid, current, size, filterText);
            if (list.length > 0) {
                list = list.map((item) => {
                    if (item.labels) {
                        item.labels = item.labels.map((v) => {
                            if (v.style) {
                                v.style = JSON.parse(v.style);
                            }
                            return v;
                        });
                    }
                    return item;
                });
            }
            const count = await articleCount(uid);
            ctx.body = responseDataHandle("REQUEST_SUCCESS", { list, currentpage, pagesize, count });
        } catch (err) {
            ctx.app.emit("error", "REQUEST_FAIL", ctx);
        }
    }
}

module.exports = new ArticleController();
