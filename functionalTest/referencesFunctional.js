let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../server");

var expect  = require("chai").expect;
var request = require("request");

const serverUrl = "http://localhost:3000/api/v1";

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

var testPayload = {"payload": payloadData, "referenceData": referenceData};

describe("References Test", function(done) {

	it("Post references, not valid payload, should give error", function(done) {

		let payloadData = JSON.parse(JSON.stringify(testPayload)); //cloning with deep

		payloadData.payload = "";

		request({url:serverUrl+"/reference", method:"POST", json:payloadData}, function(error, response, body) {
			expect(response.statusCode).to.equal(400);
			done();
		});
	});

	it("Post references, not valid reference data, should give error", function(done) {

		let payloadData = JSON.parse(JSON.stringify(testPayload)); //cloning with deep

		payloadData.referenceData = "";

		request({url:serverUrl+"/reference", method:"POST", json:payloadData}, function(error, response, body) {
			expect(response.statusCode).to.equal(400);
			done();
		});
	});

	it("Post references, transform data, give statuscode 200 on success", function(done) {

		request({url:serverUrl+"/reference", method:"POST", json:testPayload}, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});


});