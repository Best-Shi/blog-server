const connection = require("../../app/database");

class ClassIfyService {
    // 根据 id 获取数据
    async classifyById(id, uid) {
        const statement = "SELECT id, title, direction, icon, pid, createTime, updateTime FROM bs_classify WHERE id = ? && uid = ?;";
        const result = await connection.execute(statement, [id, uid]);
        return result[0][0];
    }
    // 分类数据
    async list(uid) {
        const statement = `
        SELECT 
            id, title, direction, icon, pid,
            DATE_FORMAT(createTime,'%Y-%m-%d %H:%i:%s') createTime,
            DATE_FORMAT(updateTime,'%Y-%m-%d %H:%i:%s') updateTime 
        FROM bs_classify 
        WHERE uid = ?;
        `;
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
    // 更新分类
    async update(id, data) {
        const { title = "", direction = "", icon = "" } = data;
        const statement = "UPDATE bs_classify SET title = ?, direction = ?, icon = ? WHERE id = ?;";
        await connection.execute(statement, [title, direction, icon, id]);
    }
    // 删除分类
    async del(id, uid) {
        const statement = "DELETE FROM bs_classify WHERE id = ? && uid = ?;";
        await connection.execute(statement, [id, uid]);
    }
}

module.exports = new ClassIfyService();
