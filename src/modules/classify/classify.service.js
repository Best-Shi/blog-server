const connection = require("../../app/database");

class ClassIfyService {
    // 分类数据
    async list(uid) {
        const statement = "SELECT id, title, direction, icon, pid, createTime, updateTime FROM bs_classify WHERE uid = ?;";
        const result = await connection.execute(statement, [uid]);
        return result[0];
    }
}

module.exports = new ClassIfyService();
