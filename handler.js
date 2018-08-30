'use strict';
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;
const uuid = require('uuid');
const auth = require('./auth');

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
      tableName: tableName,
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
  let statusCode = 201; 
  let message = 'Go Serverless v1.0! Your function executed successfully!'
  if(auth.checkAuth(event.headers.key)){
    if(event.body){
      let body = JSON.parse(event.body);
      console.log(`body length: ${body.length}`)
      for(let employee of body){
        let params = {
          TableName: tableName,
          ReturnConsumedCapacity: "TOTAL",
          Item: {
            // ID : {
            //   S: uuid.v4()
            // },
            // FirstName: {
            //   S: employee.FirstName
            // },
            // MiddleInitial: {
            //   S: employee.MiddleInitial
            // },
            // LastName: {
            //   S: employee.LastName
            // },
            // DateOfBirth: {
            //   S: employee.DateOfBirth
            // },
            // DateOfEmployment: {
            //   S: employee.DateOfEmployment
            // },
            // Status: {
            //   S: 'Active'
            // }
            ID :uuid.v4(),
            FirstName: employee.FirstName,
            MiddleInitial: employee.MiddleInitial,
            LastName: employee.LastName,
            DateOfBirth: employee.DateOfBirth,
            DateOfEmployment: employee.DateOfEmployment,
            Status: 'Active'
            }
          }
        }
        console.log(`putting item: ${JSON.stringify(params)}`)
        let putItem = new Promise((res, rej) => {
          documentClient.put(params, function(err, data) {
            if (err) {
              console.log("Error", err);
              rej(err);
            } else {
              console.log("Success", data);
              res("Hi, insert data completed");
            }
          }); 
      });
        // dynamodb.putItem(params, (err, data) => {
        //   if (err) {
        //     // an error occurred
        //     console.log(err, err.stack); 
        //     statusCode = 500;
        //     message = 'Internal Server Error'
        //   } 
        //   else {
        //     console.log(data);
        //   } 
        // })
      // }
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