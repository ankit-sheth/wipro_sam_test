// Load Module Dependencies
let express = require("express");
let app = require("express")();
let cors = require("cors");
let bodyParser = require("body-parser");
let helmet = require("helmet");

// Config, Routes and Models
let config = require("./config/config.js");
let routes = require("./routes");

// Middleware
let middlewareSetRequestId = require("./middlewares/set_request_id");

// for logger helper
const LoggerHelper = require("./helpers/logger_helper");

//app.use(middlewareLogEachRequest.setEachResponseLog);

// Add Headers to all Request
app.all("/*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST"); // for cors, change as per requirement
	res.removeHeader("X-Powered-By");

	next();
});

// Middleware
// Helmet secure your Express apps by setting various HTTP headers
app.use(helmet());  // for security

// Cross-origin resource sharing
app.use(cors());    // to enable cors, in case of called from third party urls

// Parse incoming request bodies
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json({limit:"50mb"})); // for json parsing - post requests


// Set the request id for each request - for uniform of logs through one request
app.use(middlewareSetRequestId.setRequestId);

// for routes
routes.registerRoutes(app); //register all routes, in case of more

// Models - if orm
//models.registerModels();

// Start Application.
app.listen(config.serverConfig.port, function () {
	console.log("Server is running on port: ", config.serverConfig.port);
});

//app.use(middlewareLogEachRequest.setEachRequestLog);


// for errors
process.on("exit", (code) => {
	console.log(`About to exit with code: ${code}`);
});

process.on("unhandledRejection", (ex) => {
	console.log("unhandledRejection", ex);

	new LoggerHelper().log("error", null, ex, ex.message);
	if (!ex.isOperational) {
		console.log(ex);
		// process.exit(1);
		// @ToDO : to log in diff. file of winston
		//throw ex;
	}
});

/* for any uncaught exception.. last call to this, can put in logs or some event and trigger mail */
process.on("uncaughtException", function (err) {
	console.error((new Date).toUTCString() + " uncaughtException:", err.message);
	console.error(err.stack);
	process.exit(1);
});
