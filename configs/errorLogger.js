const path = require("path");
const log4js = require("log4js");

log4js.configure({
    appenders: {
        file: { type: "file", filename: path.join(__dirname, "../public/error.txt") },
    },
    categories: { default: { appenders: ["file"], level: "info" } },
});
const logger = log4js.getLogger("file");

exports.handleLogError = (error, location = "") => {
    try {
        logger.error({ location, message: error.stack || error.message || error });
    } catch (error) {
        //ignore
    }
};