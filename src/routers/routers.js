const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const dirList = fs.readdirSync(path.resolve(cwd, "./src/modules"));
const verifyAuth = require("../middleware/auth.middleware");

function router() {
    dirList.forEach((dir) => {
        const model = require(path.resolve(cwd, `./src/modules/${dir}/router`));
        if (dir !== "user") {
            this.use(verifyAuth);
        }
        this.use(model.routes());
        this.use(model.allowedMethods());
    });
}

module.exports = router;
