/* @File : used to create unique id for each request, apply to each logs, easy to trace */

const uuid = require("uuid");

const LoggerHelper = require("../helpers/logger_helper");

module.exports.setRequestId = async (req, res, next) => {
	new LoggerHelper().log("info", null, "to set request id");

	let requestId = uuid.v1();
	res.requestId = requestId;
	res.requestStartTime = new Date();

	//let data =  {"mobile" : md.mobile(), "userAgent":md.userAgent(), "os": md.os(), "version": md.versionStr('Build') };
	//console.log(data);
	let data = {};

	new LoggerHelper().log("info", requestId, "set request mobile info", data);

	next();
};