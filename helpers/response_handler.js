
/* @File : to give all type of responses */
const stackTrace = require("stack-trace");
const path = require("path");

function ResponseHandler () {}

/**
 * @Function : to give success response
 * @param {*} res
 * @param {*} statusCode
 * @param {*} data
 * @param {*} message
 */
ResponseHandler.prototype.successHandler = async (req, res, statusCode, data, message)=>{
	let customStatusCode = statusCode;

	if (typeof message === "undefined") {
		message = null;
	} else if (typeof message === "object") {
		if (typeof message.customStatusCode !== "undefined") {
			customStatusCode = message.customStatusCode;
		}

		if (typeof message.customMessage !== "undefined") {
			message = message.customMessage;
		}
	}

	if (typeof data === "undefined") {
		data = null;
	}

	let responseObject = {
		statusCode:customStatusCode,
		success:true,
		data:data,
		requestId: res.requestId,
		message : message
	};

	res.status(statusCode).send(responseObject);

};


/**
 * @Function : to give error
 * @param {*} res
 * @param {*} error
 */
ResponseHandler.prototype.errorHandler = (req, res, error)=>{

	let frame, fileName, method;
	frame = stackTrace.get()[1];
	fileName = path.basename(frame.getFileName());
	method = frame.getFunctionName();

	let fileInfo = {"controller": fileName, "action": method};

	if (error && typeof error === "object" && error.statusCode ) {
		error.success = false;

		if (error.errorCode) {
			let responseObject = {
				statusCode:error.statusCode,
				message:error.errorCode,
				success:false,
				requestID:res.requestId
			};
			// to set response log
			middlewareLogEachRequest.setEachResponseLog(req, res, responseObject, fileInfo);

			res.status(error.statusCode).send(responseObject);
		} else {
			let responseObject = {
				statusCode:error.statusCode,
				message: error.message || "SERVER_ERROR",
				success:false,
				requestID:res.requestId
			};
			// to set response log
			//middlewareLogEachRequest.setEachResponseLog(req, res, responseObject, fileInfo);

			res.status(error.statusCode).send(responseObject);
		}
	} else {
		let responseObject = {
			statusCode:500,
			message:"INTERNAL_SERVER_ERROR",
			success:false,
			requestID:res.requestId
		};
		// to set response log
		//middlewareLogEachRequest.setEachResponseLog(req, res, responseObject, fileInfo);

		res.status(500).send(responseObject);
	}

};


module.exports = ResponseHandler;