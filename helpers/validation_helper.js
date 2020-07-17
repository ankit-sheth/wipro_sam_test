const HTTPStatus = require("http-status");
const LoggerHelper = require("../helpers/logger_helper");
const constant = require("./constant");
const ResponseHandler = require("../helpers/response_handler");

function ValidationHelper() { }

ValidationHelper.prototype.validate = (req, res, schema, value, requestId) => {
	new LoggerHelper().log("info", requestId);

	return new Promise((resolve, reject) => {
		schema.validate(value, { abortEarly: false }, (error, success) => {
			if (error) {
				new LoggerHelper().log("error", requestId, constant.INSIDE_CATCH_BLOCK, error);

				let errMsg = error.details[0].message;

				let statusCode = HTTPStatus.BAD_REQUEST;

				let schemaValidationException = {
					"customStatusCode":400,
		            "customMessage": "PROVIDE_VALID_DATA"
				};

				new ResponseHandler().successHandler(req, res, statusCode, errMsg, schemaValidationException);

				return false;
			} else {
				new LoggerHelper().log("info", requestId, constant.BEFORE_RETURNING_RESULT);
				resolve(success);
			}
		});
	});

};


module.exports = ValidationHelper;