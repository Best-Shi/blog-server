const connection = require("../../app/database");

class LabelService {
    async getLabelById(id, uid) {
        const statement = `
            SELECT id, label, direction, style, icon, 
                DATE_FORMAT(createTime,'%Y-%m-%d %H:%i:%s') createTime,
                DATE_FORMAT(updateTime,'%Y-%m-%d %H:%i:%s') updateTime
            FROM bs_label
            WHERE id = ? && uid = ?;
        `;
        const result = await connection.execute(statement, [id, uid]);
        return result[0][0];
    }

    // 新增标签
    async create(uid, data) {
        const { label = "", direction = "", style = "", icon = "" } = data;
        const statement = "INSERT INTO bs_label (label, direction, style, icon, uid) VALUES (?, ?, ?, ?, ?);";
        await connection.execute(statement, [label, direction, style, icon, uid]);
    }
    // 编辑标签
    async edit(id, uid, data) {
        const { label = "", direction = "", style = "", icon = "" } = data;
        const statement = "UPDATE bs_label SET label = ?, direction = ?, style = ?, icon = ? WHERE uid = ? && id = ?;";
        await connection.execute(statement, [label, direction, style, icon, uid, id]);
    }
    // 删除标签
    async del(id, uid) {
        const statement = "DELETE FROM bs_label WHERE id = ? && uid = ?;";
        await connection.execute(statement, [id, uid]);
    }
}

module.exports = new LabelService();
