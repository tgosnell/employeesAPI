const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

const handler = require('./handler');

describe("The handler function", () => {
    it("returns a message", () => {
        handler.get(undefined, undefined, function(error, response){
            let body = JSON.parse(response.body);
            body.message.should.be.equal('Go Serverless v1.0! Your function executed successfully!');
        });
    });
});

describe("The handler function", () => {
    it("returns a message", () => {
        handler.create(undefined, undefined, function(error, response){
            let body = JSON.parse(response.body);
            body.message.should.be.equal('Go Serverless v1.0! Your function executed successfully!');
        });
    });
});

describe("The handler function", () => {
    it("returns a message", () => {
        handler.update(undefined, undefined, function(error, response){
            let body = JSON.parse(response.body);
            body.message.should.be.equal('Go Serverless v1.0! Your function executed successfully!');
        });
    });
});

describe("The handler function", () => {
    it("returns a message", () => {
        handler.delete(undefined, undefined, function(error, response){
            let body = JSON.parse(response.body);
            body.message.should.be.equal('Go Serverless v1.0! Your function executed successfully!');
        });
    });
});