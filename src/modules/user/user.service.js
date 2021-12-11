const connection = require("../../app/database");

class UserService {
    // 通过 username 获取用户信息
    async getUserByName(username) {
        const statement = "SELECT * FROM bs_users WHERE username = ?;";
        const result = await connection.execute(statement, [username]);
        const [data] = result[0];
        return data;
    }
    // 通过 id 获取用户信息
    async getUserById(id) {
        const statement = "SELECT * FROM bs_users WHERE id = ?;";
        const result = await connection.execute(statement, [id]);
        const [data] = result[0];
        return data;
    }
    // 修改用户信息
    async updateUserInfo(data = {}, id) {
        // const { username = "", avatar = "", nickName = "", introduce = "", birthday = "2020-01-01" } = data;
        // const statement = "UPDATE bs_users SET username=?,avatar=?,nickName=?,introduce=?,birthday=? WHERE id=?;";
        const statement = "UPDATE bs_users SET ? WHERE id=?;";
        await connection.query(statement, [data, id]);
    }
    // 修改用户密码
    async updateUserPassword(id, password) {
        const statement = "UPDATE bs_users SET password=? WHERE id=?;";
        await connection.execute(statement, [password, id]);
    }
}

module.exports = new UserService();
