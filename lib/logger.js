const winston = require("winston");
require("winston-daily-rotate-file");

const logConfig = require("../config/config.js").logConfig;



var transport = new (winston.transports.DailyRotateFile)({
	filename: logConfig.logFolder + logConfig.logFile,
	datePattern: "yyyy-MM-DD_h-m-s",
	prepend: true,
	level:logConfig.logLevel
});


var logger = winston.createLogger({
	transports: [
	  transport
	]
});


module.exports = logger;