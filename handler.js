'use strict';
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;
const uuid = require('uuid');
const auth = require('./auth');
const employee = require('./employee');


/**
 * get - handles incoming get requests from api gateway
 * @param {*} event - lambda event
 * @param {*} context - lambda context
 */
module.exports.get = async (event, context) => {
  
  let statusCode = 200;
  let message = 'Go Serverless v1.0! Your function executed successfully!';
  let getData = {};

  // check auth
  if(auth.checkAuth(event.headers.key)){
    // get id from the event, query dynamo for active, return result 
    if(event.queryStringParameters && event.queryStringParameters.id){
      getData = await employee.getEmployee(event.queryStringParameters.id);
    }
    // if no id is present in the query string, return all active employees
    else {
      getData = await employee.getEmployees();
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
      data: getData
    }),
  };
};

/**
 * create - handle posts from api gateway
 * @param {*} event - lambda event
 * @param {*} context  lambda context
 */
module.exports.create = async (event, context) => {

   
  let statusCode = 201; 
  let message = 'Go Serverless v1.0! Your function executed successfully!'
  
  // check auth
  if(auth.checkAuth(event.headers.key)){
    if(event.body){
      //pass data to employee service layer
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

/**
 *  update - handle put from api gateway
 * @param {*} event - lambda event
 * @param {*} context - lambda context
 */
module.exports.update = async (event, context) => {
  let statusCode = 201; 
  let message = 'Go Serverless v1.0! Your function executed successfully!'
  let updateData = { place: 'holder'};

  //check auth
  if(auth.checkAuth(event.headers.key)){
    if(event.body){
      //pass data to employee service layer
      updateData = await employee.updateEmployee(event.body)
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
      data: updateData,
    }),
  };
};

/**
 * delete - handle delete requests from api gateway
 * @param {*} event - lambda event
 * @param {*} context - lambda context
 */
module.exports.delete = async (event, context) => {

  let statusCode = 200;
  let message = 'Go Serverless v1.0! Your function executed successfully!';
  let deleteData = { place: 'holder'};

  //check auth
  if(auth.checkAuth(event.headers.key)){
    //pass id to employee service layer
    deleteData = await employee.deleteEmployee(event.queryStringParameters.id);
  }
  else {
    message = 'Please check your crendentials';
    statusCode = 401;
  }
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      data: deleteData,
    }),
  };
};