const errorTypes = {
    NOT_FOUND: {
        code: 404,
        message: "NOT FOUND",
    },
    USERNAME_PASSWORD_IS_REQUIRED: {
        code: 400,
        message: "用户名或密码不能为空",
    },
    USER_DOES_NOT_EXISTS: {
        code: 400,
        message: "用户不存在",
    },
    PASSWORD_IS_INCORRENT: {
        code: 400,
        message: "密码不正确",
    },
    UNAUTHORIZED: {
        code: 401,
        message: "token无效",
    },
    ID_IS_REQUIRED: {
        code: 400,
        message: "id不能为空",
    },
    USERNAME_REPEAT: {
        code: 400,
        message: "用户名重复",
    },
    ID_AND_USERID_MISMATCH: {
        code: 400,
        message: "id与登录用户不匹配",
    },
    PASSWORD_IS_REQUIRED: {
        code: 400,
        message: "密码不能为空",
    },
    PASSWORD_EDIT_FAIL: {
        code: 400,
        message: "密码修改失败",
    },
    USER_INFO_UPDATE_FAIL: {
        code: 400,
        message: "用户信息更新失败",
    },
    CREATE_FAIL: {
        code: 400,
        message: "创建失败",
    },
    UPDATE_FAIL: {
        code: 400,
        message: "更新失败",
    },
    CLASSIFY_DOES_NOT_EXISTS: {
        code: 400,
        message: "分类不存在",
    },
    DEL_FAIL: {
        code: 400,
        message: "删除失败",
    },
    ARTICLE_DOES_NOT_EXISTS: {
        code: 400,
        message: "文章不存在",
    },
};

module.exports = errorTypes;
