const connection = require("../../app/database");

class ArticleService {
    // 通过 id 获取文章
    async getArticleById(id) {
        const statement = "SELECT * FROM bs_article WHERE id = ?;";
        const result = await connection.execute(statement, [id]);
        return result[0][0];
    }

    // 创建文章
    async create({ title = "", direction = "", content = "", cover = "", uid = "" }) {
        const statement = "INSERT INTO bs_article (title,direction,content,cover,uid) VALUES(?, ?, ?, ?, ?);";
        await connection.execute(statement, [title, direction, content, cover, uid]);
    }

    // 修改文章
    async edit(data, id) {
        const statement = "UPDATE bs_article SET ? WHERE id = ?;";
        await connection.query(statement, [data, id]);
    }

    // 查看文章详情
    async detail(id, uid) {
        // TODO: 需要查询与文章关联的所有信息
        const statement = "SELECT * FROM bs_article WHERE id = ? && uid = ? && isDel = 0;";
        const result = await connection.query(statement, [id, uid]);
        return result[0][0];
    }
}

module.exports = new ArticleService();
