const connection = require("../../app/database");

class LabelService {
    // 新增标签
    async create(uid, data) {
        const { label = "", direction = "", style = "", icon = "" } = data;
        const statement = "INSERT INTO bs_label (label, direction, style, icon, uid) VALUES (?, ?, ?, ?);";
        await connection.execute(statement, [label, direction, style, icon, uid]);
    }
}

module.exports = new LabelService();
