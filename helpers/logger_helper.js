const logger = require("../lib/logger");
const stackTrace = require("stack-trace");
const path = require("path");

function LoggerHelper() {}

/* to format each log in same format - used by ELK - logstach */
function formatMessage(requestId, fileName, method, line, message, data) {

	requestId = (!requestId) ? null : requestId;
	message = (!message) ? null : message;
	data = (!data) ? null : data;

	let token = "requestID=" + requestId + ", fileName=" + fileName + ", method=" + method + ", line=" + line + ", message=" + message + ", data= " + data;

	return token;
}

/* to log as per the lib - logger included */
LoggerHelper.prototype.log = (level, requestId, message, data) => {

	if (typeof message === undefined) {
		message = null;
	}

	if (typeof data === undefined) {
		data = null;
	} else if (typeof data === "object") {
		data = JSON.stringify(data);
	}

	level = level.toString().toLowerCase();

	try {
		let frame, fileName, method, line, loggerMessage;
		frame = stackTrace.get()[1];
		fileName = path.basename(frame.getFileName());
		method = frame.getFunctionName();
		line = frame.getLineNumber();

		loggerMessage = formatMessage(requestId, fileName, method, line, message, data);

		switch (level) {
		case "info":
			logger.info(loggerMessage);
			break;

		case "debug":
			logger.debug(loggerMessage);
			break;

		case "error":
			logger.error(loggerMessage);
			break;

		default:
			logger.info(loggerMessage);
		}
	} catch (error) {
		logger.error("Some error in logging", error);
	}
};


module.exports = LoggerHelper;