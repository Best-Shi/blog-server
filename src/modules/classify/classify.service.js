const connection = require("../../app/database");

class ClassIfyService {
    // 获取总条数
    async classifyCount(uid) {
        const statement = "SELECT COUNT(*) count FROM bs_classify WHERE uid = ?;";
        const result = await connection.execute(statement, [uid]);
        const { count } = result[0][0];
        return count;
    }

    // 通过 id 获取数据
    async getClassifyById(id) {
        const statement = "SELECT * FROM bs_classify WHERE id = ?;";
        const result = await connection.execute(statement, [id]);
        return result[0][0];
    }

    // 获取列表
    async getClassifyList(uid, current, size, filterText) {
        let statement = "";
        let result = [[]];
        if (filterText) {
            statement = "SELECT * FROM bs_classify WHERE title LIKE '%?%' && uid = ? ORDER BY id DESC LIMIT ?, ?;";
            result = await connection.execute(statement, [filterText, uid, current, size]);
        } else {
            statement = "SELECT * FROM bs_classify WHERE uid = ? ORDER BY id DESC LIMIT ?, ?;";
            result = await connection.execute(statement, [uid, current, size]);
        }

        return result[0];
    }
    // 创建分类
    async createClassify(uid, title, direction) {
        const statement = "INSERT INTO bs_classify (title,direction,uid) VALUES(?,?,?);";
        connection.execute(statement, [title, direction, uid]);
    }
    // 编辑分类
    async update(id, title, direction) {
        const statement = "UPDATE bs_classify SET ? WHERE id=?;";
        await connection.query(statement, [{ title, direction }, id]);
    }
}

module.exports = new ClassIfyService();
