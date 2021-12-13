const connection = require("../../app/database");

class ArticleService {
    // 通过 id 获取文章
    async getArticleById(id, uid) {
        const statement = "SELECT * FROM bs_article WHERE id = ? && uid = ? && isDel = 0;";
        const result = await connection.execute(statement, [id, uid]);
        return result[0][0];
    }

    // 创建文章
    async create(uid, { title = "", direction = "", content = "", cover = "", classifyId: cid = "" }) {
        const statement = "INSERT INTO bs_article (title, direction, content ,cover, cid, uid) VALUES(?, ?, ?, ?, ?, ?);";
        const result = await connection.execute(statement, [title, direction, content, cover, cid, uid]);
        return result[0];
    }

    // 修改文章
    async edit(id, uid, { title = "", direction = "", content = "", cover = "", classifyId: cid = "" }) {
        if (cid) {
            const statement = "UPDATE bs_article SET title = ?, direction = ?, content = ?, cover = ?, cid = ? WHERE id = ? && uid = ? && isDel = 0;";
            await connection.execute(statement, [title, direction, content, cover, cid, id, uid]);
        } else {
            const statement = "UPDATE bs_article SET title = ?, direction = ?, content = ?, cover = ? WHERE id = ? && uid = ? && isDel = 0;";
            await connection.execute(statement, [title, direction, content, cover, id, uid]);
        }
    }

    // 删除文章
    async del(id, uid) {
        const statement = "UPDATE bs_article SET isDel = 1 WHERE id = ? && uid = ?;";
        await connection.execute(statement, [id, uid]);
    }

    // 文章与标签关联
    async articleRelLabel(articleId, labelId) {
        const statement = "INSERT INTO bs_article_label (aid, lid) VALUES (?, ?);";
        await connection.execute(statement, [articleId, labelId]);
    }
    // 删除文章与标签关联关系
    async delArticleLabel(articleId) {
        const statement = "DELETE FROM bs_article_label WHERE aid = ?;";
        await connection.execute(statement, [articleId]);
    }

    // 查看文章详情
    async detail(id, uid) {
        const statement = `
        SELECT 
            bsa.id id, bsa.title title, bsa.content content, bsa.direction direction, bsa.cover cover, 
            DATE_FORMAT(bsa.createTime,'%Y-%m-%d %H:%i:%s') createTime,
            DATE_FORMAT(bsa.updateTime,'%Y-%m-%d %H:%i:%s') updateTime, 
            JSON_ARRAYAGG(JSON_OBJECT(
                'id', bsl.id, 'label', bsl.label, 'direction', bsl.direction, 'icon', bsl.icon, 'style', bsl.style,
                'createTime', DATE_FORMAT(bsl.createTime,'%Y-%m-%d %H:%i:%s'), 
                'updateTime', DATE_FORMAT(bsl.updateTime,'%Y-%m-%d %H:%i:%s')
            )) labels,
            JSON_OBJECT(
                'id',bsc.id, 'title',bsc.title, 'direction', bsc.direction, 'pid', bsc.pid, 
                'createTime', DATE_FORMAT(bsc.createTime,'%Y-%m-%d %H:%i:%s'), 
                'updateTime', DATE_FORMAT(bsc.updateTime,'%Y-%m-%d %H:%i:%s')
            ) classify
        FROM bs_article bsa
        LEFT JOIN bs_article_label bsal ON bsal.aid = bsa.id
        LEFT JOIN bs_label bsl ON bsal.lid = bsl.id
        LEFT JOIN bs_classify bsc ON bsa.cid = bsc.id
        WHERE bsa.id = ? && bsa.uid = ? && isDel = 0
        GROUP BY id;
        `;
        const result = await connection.query(statement, [id, uid]);
        return result[0][0];
    }

    // 文章列表
    // TODO: 需要查询与文章关联的所有信息
    async articleList(uid, current, size, filterText) {
        let statement = "";
        let result = [[]];
        if (filterText) {
            statement = "SELECT * FROM bs_article WHERE title LIKE '%?%' && uid = ? && isDel = 0 ORDER BY id DESC LIMIT ?, ?;";
            result = await connection.execute(statement, [filterText, uid, current, size]);
        } else {
            statement = "SELECT * FROM bs_article WHERE uid = ? && isDel = 0 ORDER BY id DESC LIMIT ?, ?;";
            result = await connection.execute(statement, [uid, current, size]);
        }

        return result[0];
    }

    // 获取总条数
    async articleCount(uid) {
        const statement = "SELECT COUNT(*) count FROM bs_article WHERE uid = ? && isDel = 0;";
        const result = await connection.execute(statement, [uid]);
        const { count } = result[0][0];
        return count;
    }
}

module.exports = new ArticleService();
