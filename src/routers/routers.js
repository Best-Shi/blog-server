const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const dirList = fs.readdirSync(path.resolve(cwd, "./src/modules"));

function router(app) {
    dirList.forEach((dir) => {
        const model = require(path.resolve(cwd, `./src/modules/${dir}/router`));
        app.use(model.routes());
        app.use(model.allowedMethods());
    });
}

module.exports = router;
