const { getClassifyById } = require("./classify.service");

// 校验是否存在
const verifyExist = async (ctx, next) => {
    const { id } = ctx.request.body;
    if (!id) {
        return ctx.app.emit("error", "ID_IS_REQUIRED", ctx);
    } else {
        const classify = await getClassifyById(id);
        if (!classify) {
            return ctx.app.emit("error", "CLASSIFY_DOES_NOT_EXISTS", ctx);
        }
    }
    await next();
};

module.exports = {
    verifyExist,
};
