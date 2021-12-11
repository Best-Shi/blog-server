const crypto = require("crypto");

const sha256Password = (password) => {
    const sha256 = crypto.createHash("sha256");
    return sha256.update(password).digest("hex");
};

module.exports = sha256Password;
