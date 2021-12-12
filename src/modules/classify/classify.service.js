const connection = require("../../app/database");

class ClassIfyService {
    // 分类数据
    async list(uid) {
        const statement = "SELECT id, title, direction, icon, pid, createTime, updateTime FROM bs_classify WHERE uid = ?;";
        const result = await connection.execute(statement, [uid]);
        return result[0];
    }
    // 新增分类
    async create(uid, data) {
        const { title = "", direction = "", icon = "", pid = "" } = data;
        let statement = "";
        if (pid) {
            statement = "INSERT INTO bs_classify (title, direction, icon, pid, uid) VALUES (?, ?, ?, ?, ?);";
            await connection.execute(statement, [title, direction, icon, pid, uid]);
        } else {
            statement = "INSERT INTO bs_classify (title, direction, icon, uid) VALUES (?, ?, ?, ?);";
            await connection.execute(statement, [title, direction, icon, uid]);
        }
    }
}

module.exports = new ClassIfyService();
