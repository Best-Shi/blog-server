const okTypes = require("../constants/ok.types");

const responseDataHandle = (type, data = {}) => {
    return {
        data,
        ...okTypes[type],
    };
};

module.exports = responseDataHandle;
