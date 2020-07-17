/* @File for loading the config from env */
"use strict";

// let envVars = process.env; // get env variables

// set the config with env values
const config = {
	"serverConfig":
		{
			"port": 3000,
			"baseURL": "/api/",
			"version": "v1",
		},
	"logConfig": {
		"logFolder": ".//logs//appLogs//",
		"logFile": "application-%DATE%.log",
		"logLevel": "debug"		// hierarchy level debug, info, error - can change as required as per environment
	}
};

module.exports = config;