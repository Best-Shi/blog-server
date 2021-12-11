const errorTypes = require("../constants/error.types");

module.exports = (type = "NOT_FOUND", ctx) => {
    console.log("错误类型:", type);
    const body = errorTypes[type];
    const status = body.code;
    ctx.status = status;
    ctx.body = body;
};
