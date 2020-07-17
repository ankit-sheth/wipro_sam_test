/**
 *  @File : to define all routes, for refs
 *  @Created ON : 15/07/2020
 *  @Author : Ankit Sheth
*/

const serverConfig = require("../config/config.js").serverConfig;
const ReferenceService = require("../services/reference_service");

module.exports = function (app) {
	// for post all refs
	app.post(serverConfig.baseURL + serverConfig.version + "/reference", new ReferenceService().transformData);
};