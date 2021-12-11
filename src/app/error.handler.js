const errorTypes = require("../constants/error.types");

module.exports = (type = "NOT_FOUND", ctx) => {
    const body = errorTypes[type];
    const status = body.code;
    ctx.status = status;
    ctx.body = body;
};
