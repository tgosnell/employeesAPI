'use strict';
const aws = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const tableName = process.env.TABLE_NAME;

module.exports.get = async (event, context) => {

  console.log(JSON.stringify(event, null, '  '));
  console.log(tableName)
  
  // if(auth()){

  // }
  // else {
  //   return {
  //     statusCode: 401,
  //     body: JSON.stringify({
  //       message: 'Authentication failed'  
  //     })
  //   }
  // }
  // check auth
  // get id from the event, query dynamo for active, return result 
  // or
  // if no id is present in the query string, return all active employees
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


module.exports.create = async (event, context) => {

  // check auth
  // get user data from the event, if the data is an array, iterate over the array
  // adding each employee to the db
  // if the data is a single item, add it to the db, return the new employee object
  // 
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
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