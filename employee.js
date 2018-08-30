'use strict';
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;
const uuid = require('uuid');

module.exports.addEmployees = (payload) => {

if(payload){
    let employees = JSON.parse(payload);
    
    //some validation of the employee data here would be a good thing to add
    if(Array.isArray(employees)){
      //loop through array of items to add and send them to dynamo
      for(let employee of employees){
          insert(employee);
      }
    }
    else {
      //employees only contains one single record in non-array form, so just pass the object
      insert(employees);
    }
  }
}

const insert = async (employee) => {
    console.log(`inserting: ${employee}`)
    let params = {
      TableName: tableName,
      ReturnConsumedCapacity: "TOTAL",
      Item: {
        ID :uuid.v4(),
        FirstName: employee.FirstName,
        MiddleInitial: employee.MiddleInitial,
        LastName: employee.LastName,
        DateOfBirth: employee.DateOfBirth,
        DateOfEmployment: employee.DateOfEmployment,
        Status: 'Active'
        }
      }
      
      //define the promise that will wait for the results of the put
      let putItem = new Promise((res, rej) => {
        docClient.put(params, function(err, data) {
          if (err) {
            console.log("Error", err);
            rej(err);
          } else {
            console.log("Success", data);
            res("Hi, insert data completed");
          }
        }); 
      });
    
      //execute promise
      const result = await putItem;
      console.log(result);
}