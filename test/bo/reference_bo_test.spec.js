const sinon = require("sinon");
const expect  = require("chai").expect;
const request = require("request");
const uuid = require("uuid");

const referenceBO = require("../../bo/reference_bo"); // for business logic test cases
const referenceService = require("../../services/reference_service"); // for validation test cases


describe("ReferenceData Test", function(done) {
	const requestId = uuid.v1();

	var referenceData = {
		"REF_MSISDN": "0406679321",
		"REF_IMSI": "50002312344314",
		"REF_SERVPROFID": "2"
	};

	var payloadData =  {
		  "name": "subscriber",
		  "valueType": "array",
		  "value": [
			{
			  "name": "MN",
			  "valueType": "string",
			  "value": "{REF_MSISDN}"
			},
			{
			  "name": "IM",
			  "valueType": "string",
			  "value": "{REF_IMSI}"
			},
			{
			  "name": "NT",
			  "valueType": "string",
			  "value": "G"
			},
			{
			  "name": "privateUser",
			  "valueType": "array",
			  "value": [
					{
				  "name": "privateUserId",
				  "valueType": "string",
				  "value": "{REF_IMSI}@ims.mnc001.mcc505.3gppnetwork.org"
					},
					{
				  "name": "roamingAllowed",
				  "valueType": "string",
				  "value": "false"
					},
					{
				  "name": "publicUser",
				  "valueType": "array",
				  "value": [
							{
					  "name": "publicIdValue",
					  "valueType": "string",
					  "value": "sip:{REF_IMSI}@ims.mnc001.mcc505.3gppnetwork.org"
							},
							{
					  "name": "implicitRegSet",
					  "valueType": "string",
					  "value": "1"
							},
							{
					  "name": "serviceProfileId",
					  "valueType": "string",
					  "value": "{REF_SERVPROFID}"
							},
							{
					  "name": "testUser",
					  "valueType": "array",
					  "value": [
									{
						  "name": "testIdValue",
						  "valueType": "string",
						  "value": "sip:{REF_IMSI}@ims.mod-connect.com"
									},
									{
						  "name": "implicitRegSet",
						  "valueType": "string",
						  "value": "2"
									}
					  ]
							}
				  ]
					},
					{
				  "name": "userImsi",
				  "valueType": "string",
				  "value": "{REF_IMSI}"
					}
			  ]
			},
			{
			  "name": "PO",
			  "valueType": "string",
			  "value": "0"
			}
		  ]
	};

	let resultData = {
		"name": "subscriber",
		"valueType": "array",
		"value": [
			{
				"name": "MN",
				"valueType": "string",
				"value": "0406679321"
			},
			{
				"name": "IM",
				"valueType": "string",
				"value": "50002312344314"
			},
			{
				"name": "NT",
				"valueType": "string",
				"value": "G"
			},
			{
				"name": "privateUser",
				"valueType": "array",
				"value": [
					{
						"name": "privateUserId",
						"valueType": "string",
						"value": "50002312344314@ims.mnc001.mcc505.3gppnetwork.org"
					},
					{
						"name": "roamingAllowed",
						"valueType": "string",
						"value": "false"
					},
					{
						"name": "publicUser",
						"valueType": "array",
						"value": [
							{
								"name": "publicIdValue",
								"valueType": "string",
								"value": "sip:50002312344314@ims.mnc001.mcc505.3gppnetwork.org"
							},
							{
								"name": "implicitRegSet",
								"valueType": "string",
								"value": "1"
							},
							{
								"name": "serviceProfileId",
								"valueType": "string",
								"value": "2"
							},
							{
								"name": "testUser",
								"valueType": "array",
								"value": [
									{
										"name": "testIdValue",
										"valueType": "string",
										"value": "sip:50002312344314@ims.mod-connect.com"
									},
									{
										"name": "implicitRegSet",
										"valueType": "string",
										"value": "2"
									}
								]
							}
						]
					},
					{
						"name": "userImsi",
						"valueType": "string",
						"value": "50002312344314"
					}
				]
			},
			{
				"name": "PO",
				"valueType": "string",
				"value": "0"
			}
		]
	};

	////////////////////////////////////////////////////////////

	// Prepare sandbox
	var sandbox;

	before(function() {
		sandbox = sinon.createSandbox();
	});

	beforeEach(function () {

	});


	it("Get replaced payload data with reference data", function(done) {

		let testPayload = {"payload": payloadData, "referenceData":referenceData};

		new referenceBO()
			.transformData(testPayload, requestId)
			.then((response) => {
				expect(JSON.stringify(response)).to.equal(JSON.stringify(resultData));
				done();
			});
	});

	it("Get same payload data without reference data", function(done) {

		let testPayload = {"payload": payloadData, "referenceData":{}};

		new referenceBO()
			.transformData(testPayload, requestId)
			.then((response) => {
				expect(JSON.stringify(response)).to.equal(JSON.stringify(payloadData));
				done();
			});
	});

	it("Get blank object data without payload data but with reference data", function(done) {

		let testPayload = {"payload": {}, "referenceData":referenceData};


		new referenceBO()
			.transformData(testPayload, requestId)
			.then((response) => {
				expect(JSON.stringify(response)).to.equal(JSON.stringify({}));
				done();
			});
	});

	it("Get blank object data without payload data and without reference data", function(done) {

		let testPayload = {"payload": {}, "referenceData":{}};

		new referenceBO()
			.transformData(testPayload, requestId)
			.then((response) => {
				expect(JSON.stringify(response)).to.equal(JSON.stringify({}));
				done();
			});
	});

	it("Get replaced using second method, recursive loop - time complexity high", function(done) {

		let testPayload = {"payload": payloadData, "referenceData":referenceData};

		new referenceBO()
			.replaceAllLoop(testPayload, requestId)
			.then((response) => {
				expect(JSON.stringify(response)).to.equal(JSON.stringify(resultData));
				done();
			});
	});


	afterEach(function () {
		sandbox.restore();
	});


});