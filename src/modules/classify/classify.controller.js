const { getClassifyList, classifyCount, createClassify, update } = require("./classify.service");
const responseDataHandle = require("../../utils/response.data.handle");

class ClassifyController {
    // 获取文章分类列表
    async classifyList(ctx, next) {
        const uid = ctx.user.id;
        const { currentpage = 1, pagesize = 10, filterText = "" } = ctx.request.body;

        // 计算分页
        const size = parseInt(pagesize);
        const current = (parseInt(currentpage) - 1) * size;

        const list = await getClassifyList(uid, current, size, filterText);
        const count = await classifyCount(uid);
        ctx.body = responseDataHandle("REQUEST_SUCCESS", { list, currentpage, pagesize, count });
    }
    // 创建文章分类
    async create(ctx, next) {
        const uid = ctx.user.id;
        const { title, direction } = ctx.request.body;
        try {
            await createClassify(uid, title, direction);
            ctx.body = responseDataHandle("CREATE_SUCCESS");
        } catch (err) {
            ctx.app.emit("error", "CREATE_FAIL", ctx);
        }
    }
    // 编辑文章分类
    async edit(ctx, next) {
        const { id, title, direction } = ctx.request.body;
        try {
            await update(id, title, direction);
            ctx.body = responseDataHandle("UPDATE_SUCCESS");
        } catch (err) {
            ctx.app.emit("error", "UPDATE_FAIL", ctx);
        }
    }
}

module.exports = new ClassifyController();
