const errorTypes = {
    NOT_FOUND: {
        code: 404,
        message: "NOT FOUND",
    },
    USERNAME_PASSWORD_IS_REQUIRED: {
        code: 400,
        message: "用户名或密码不能为空",
    },
    USERNAME_DOES_NOT_EXISTS: {
        code: 400,
        message: "用户不存在",
    },
    PASSWORD_IS_INCORRENT: {
        code: 400,
        message: "密码不正确",
    },
};

module.exports = errorTypes;
