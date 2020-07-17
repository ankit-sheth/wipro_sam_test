/**
 *  @File : to combine/initialize all routes , for this to work, naming convention _routes.js - must be followed
 *  @Created ON : 15/07/2020
 *  @Author : Ankit Sheth
*/

const fs = require("fs");
const routeFolder = __dirname;

function registerRoutes(app) {
	const routeFiles = fs.readdirSync(routeFolder);
	routeFiles.forEach(function(routeFile) {
		if(routeFile.endsWith("_routes.js")) {
			require("./"+routeFile)(app);
		}
	});
}

module.exports.registerRoutes = registerRoutes;