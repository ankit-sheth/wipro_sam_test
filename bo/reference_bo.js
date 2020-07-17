/**
 *  @File : to apply all business logic for reference module
 *
 *  @Created ON : 16/07/2020
 *  @Author : Ankit Sheth
*/

// all required files
const LoggerHelper = require("../helpers/logger_helper");
const constant = require("../helpers/constant");

//config
const config = require("../config/config");



/**
 * Module code starts
 */
function ReferenceBO() { }

/**
 * @Function : to convert the reference data
 * @param {*} requestId
 * @return : converted payload / payload / null
 *
 * IMP Point :: May be not required to create protoype method as not any other methods here...
 * 			.. created as considering common structure if multiple methods here then the object created of this module
 * 			.. should not occupy much space with all methods
 */
ReferenceBO.prototype.transformData = async (reqData, requestId) => {

	new LoggerHelper().log("debug", requestId, constant.INSIDE_BO);

	return new Promise(async (resolve, reject) => {
		try {
			let payload = reqData.payload;
			let referenceData = reqData.referenceData;

			if (Object.keys(referenceData).length > 0 && Object.keys(payload).length > 0) {

				const strData = JSON.stringify(payload);

				/* as business requirement, so need to convert the keys with surrounding braces */
				let replacedWithBraces = {};
				Object.keys(referenceData).forEach(key => {
					replacedWithBraces[`{${key}}`] = referenceData[key];
				});

				// actualy replace the payload with ref. data
				const replacedData = JSON.parse(strData.replaceAll(replacedWithBraces));

				resolve(replacedData);

			} else {
				resolve(payload);
			}

		} catch (error) {
			new LoggerHelper().log("error", requestId, constant.INSIDE_CATCH_BLOCK, error);

			reject(error);
		}
	}).catch(function(err) {
		return err;
	});
};

/* create prototype method of string so can use anywhere...for use anywhere in project if required */
String.prototype.replaceAll = function(objReplacements) {
	// create regx with in-casesensitive and globally replacy
	var re = new RegExp(Object.keys(objReplacements).join("|"), "gi");

	return this.replace(re, function(matched) {
		return objReplacements[matched];
	});
};

/* create prototype method of string so can use anywhere...for use anywhere in project if required */
ReferenceBO.prototype.replaceAllLoop = async (reqData, requestId) => {

	new LoggerHelper().log("debug", requestId, constant.INSIDE_BO);

	return new Promise(async (resolve, reject) => {
		try {
			let payload = reqData.payload;
			let referenceData = reqData.referenceData;

			if (Object.keys(referenceData).length > 0 && Object.keys(payload).length > 0) {

				let replacedData = replaceAllLoop(payload, referenceData);

				resolve(payload);

			} else {
				resolve(payload);
			}

		} catch (error) {
			new LoggerHelper().log("error", requestId, constant.INSIDE_CATCH_BLOCK, error);

			reject(error);
		}
	}).catch(function(err) {
		return err;
	});
};

function replaceAllLoop(payload, referenceData) {

	for (let prop in payload) {

		if (typeof (payload[prop]) === "object") {
			replaceAllLoop(payload[prop], referenceData);
		} else {
			let value = payload[prop];
			Object.keys(referenceData).forEach(key => {
				value = value.replace(`{${key}}`, referenceData[key]);
			});

			payload[prop] = value;
		}
	}

	return payload;
}

module.exports = ReferenceBO;