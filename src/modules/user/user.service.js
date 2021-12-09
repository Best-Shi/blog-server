const connection = require("../../app/database");

class UserService {
    async create(user) {
        const { username, password } = user;
        // TODO: 需要查看用户是否已经存在数据库中
        const statement = "INSERT INTO bs_users (username, `password`) VALUES (?, ?);";
        const result = await connection.execute(statement, [username, password]);
        return result;
    }
}

module.exports = new UserService();
