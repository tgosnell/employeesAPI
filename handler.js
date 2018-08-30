'use strict';
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;
const uuid = require('uuid');
const auth = require('./auth');
const employee = require('./employee');

module.exports.get = async (event, context) => {

  console.log(JSON.stringify(event, null, '  '));
  console.log(tableName)
  
  let statusCode = 200;
  let message = 'Go Serverless v1.0! Your function executed successfully!';
  let getData = { place: 'holder'};

  if(auth.checkAuth(event.headers.key)){
      getData = await employee.getEmployee(event.queryStringParameters.id);
  }
  else {
    message = 'Please check your crendentials';
    statusCode = 401;
  }
  // check auth
  // get id from the event, query dynamo for active, return result 
  // or
  // if no id is present in the query string, return all active employees
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      data: getData
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.create = async (event, context) => {

  // check auth
  // get user data from the event
  //pass data to employee service layer
  let statusCode = 201; 
  let message = 'Go Serverless v1.0! Your function executed successfully!'
  if(auth.checkAuth(event.headers.key)){
    if(event.body){
      await employee.addEmployees(event.body)
    }
  }
  else {
    message = 'Please check your crendentials';
    statusCode = 401;
  }
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.update = async (event, context) => {

  // check auth
  // get the employee resource from dynamo, update values, send it back to dynamo
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.delete = async (event, context) => {

  // check auth
  // get the employee by id, change their status to inactive
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};