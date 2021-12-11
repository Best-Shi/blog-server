const connection = require("../../app/database");

class ClassIfyService {
    // 获取总条数
    async classifyCount(uid) {
        const statement = "SELECT COUNT(*) count FROM bs_classify WHERE uid = ?;";
        const result = await connection.execute(statement, [uid]);
        const { count } = result[0][0];
        return count;
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
}

module.exports = new ClassIfyService();
