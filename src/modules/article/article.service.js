const connection = require("../../app/database");

class ArticleService {
    // 创建文章
    async create({ title = "", direction = "", content = "", cover = "", uid = "" }) {
        let statement = "INSERT INTO bs_article (title,direction,content,cover,uid) VALUES(?, ?, ?, ?, ?);";
        await connection.execute(statement, [title, direction, content, cover, uid]);
    }
}

module.exports = new ArticleService();
