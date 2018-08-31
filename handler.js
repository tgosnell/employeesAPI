'use strict';
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;
const uuid = require('uuid');
const auth = require('./auth');
const employee = require('./employee');


//Export get
module.exports.get = async (event, context) => {

  console.log(JSON.stringify(event, null, '  '));
  console.log(tableName)
  
  let statusCode = 200;
  let message = 'Go Serverless v1.0! Your function executed successfully!';
  let getData = { place: 'holder'};

  if(auth.checkAuth(event.headers.key)){
    if(event.queryStringParameters && event.queryStringParameters.id){
      getData = await employee.getEmployee(event.queryStringParameters.id);
    }
    else {
      getData = await employee.getEmployees();
    }
      
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
};

//Export create
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
};

//Export update
module.exports.update = async (event, context) => {
  let statusCode = 201; 
  let message = 'Go Serverless v1.0! Your function executed successfully!'
  let updateData = { place: 'holder'};
  if(auth.checkAuth(event.headers.key)){
    if(event.body){
      updateData = await employee.updateEmployee(event.body)
    }
  } 
  else {
    message = 'Please check your crendentials';
    statusCode = 401;
  }
  // check auth
  // get the employee resource from dynamo, update values, send it back to dynamo
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      data: updateData,
    }),
  };
};

//Export delete
module.exports.delete = async (event, context) => {

  let statusCode = 200;
  let message = 'Go Serverless v1.0! Your function executed successfully!';
  let deleteData = { place: 'holder'};

  if(auth.checkAuth(event.headers.key)){
    deleteData = await employee.deleteEmployee(event.queryStringParameters.id);
  }
  else {
    message = 'Please check your crendentials';
    statusCode = 401;
  }
  // check auth
  // get the employee by id, change their status to inactive
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      data: deleteData,
    }),
  };
};