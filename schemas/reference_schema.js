
/* @File : to put validation of reference request schema */

let joi = require("joi");

let transformSchema = joi.object().keys({
	payload: joi.object().required(),
	referenceData: joi.object().required()
});



module.exports = {
	transformSchema: transformSchema
};