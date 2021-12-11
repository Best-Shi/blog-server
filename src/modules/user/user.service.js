const connection = require("../../app/database");

class UserService {
    async getUserByName(username) {
        const statement = "SELECT * FROM bs_users WHERE username = ?;";
        const result = await connection.execute(statement, [username]);
        const [data] = result[0];
        return data;
    }
}

module.exports = new UserService();
