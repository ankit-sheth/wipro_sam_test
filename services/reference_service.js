/**
 *  @File : to define all services/functions for reference module
 *  @Created ON : 17/07/2020
 *  @Author : Ankit Sheth
*/

// Modules
const HTTPStatus = require("http-status");

//config
const config = require("../config/config");

// Helpers
const constant = require("../helpers/constant");
const ResponseHandler = require("../helpers/response_handler");
const LoggerHelper = require("../helpers/logger_helper");
const validationHelper = require("../helpers/validation_helper");
const ReferenceBO = require("../bo/reference_bo");


// Others - success/exceptions
const refMessages = require("../custom_messages/success_messages");
const refSchemas = require("../schemas/reference_schema");


/* may be for some case this prototype is not required, added just considering all functions are not required at a time, so using prototype can save memory load */
function ReferenceService() { }


/**
 * @Function : to create the pet, whole record
 * @param {*} request object
 * @param {*} response object
 * @return : data/false
 *
 *  * IMP Point :: May be not required to create protoype method as not any other methods here...
 * 			.. created as considering common structure if multiple methods here then the object created of this module
 * 			.. should not occupy much space with all methods
 */
ReferenceService.prototype.transformData = async (req, res) => {
	new LoggerHelper().log("info", res.requestId, constant.START_OF_EXECUTION);
	try {

		// validate the schema
		await new validationHelper().validate(req, res, refSchemas.transformSchema, req.body, res.requestId);

		let result = {};

		let transformedData = await new ReferenceBO().transformData(req.body, res.requestId);

		new LoggerHelper().log("debug", res.requestId, constant.BFORE_CALLING_SUCCESS_HANDELER, transformedData);

		new ResponseHandler().successHandler(req, res, HTTPStatus.OK, transformedData, refMessages.transformSuccess);

	} catch (error) {
		new LoggerHelper().log("error", res.requestId, constant.INSIDE_CATCH_BLOCK, error);
		new ResponseHandler().errorHandler(req, res, error);
	}
};

module.exports = ReferenceService;