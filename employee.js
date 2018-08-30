'use strict';
const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;
const uuid = require('uuid');

module.exports.addEmployees = async (payload) => {

  // if the data is an array, iterate over the array
  // adding each employee to the db
  // if the data is a single item, add it to the db, return the new employee object
  if(payload){
    let employees = JSON.parse(payload);
    
    //some validation of the employee data here would be a good thing to add
    if(Array.isArray(employees)){
      //loop through array of items to add and send them to dynamo
      for(let employee of employees){
          await insert(employee);
      }
    }
    else {
      //employees only contains one single record in non-array form, so just pass the object
      await insert(employees);
    }
  }
}

const insert = async (employee) => {
    console.log(`inserting: ${JSON.stringify(employee)}`)
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
      
      console.log(`params: ${JSON.stringify(params)}`)

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
      //output what we just insertd
      console.log(result);  
}

module.exports.getEmployee = async (id) => {
  let result = '';
  if(id){
    result = await fetchEmployee(id);
  }
  else {
    result = await fetchEmployees();
  }
  return result
}

const fetchEmployee = async (id) => {
  
  var params = {
    TableName: tableName,
    Key:{
        "ID": id,
        "Status": 'Active'
    }
  };

  let getItem = new Promise((res, rej) => {
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            rej(err);
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res(data);
        }
    });
  })

  const result = await getItem;
  //output what we just insertd
  console.log(result); 
  return result;
}

// const fetchEmployees = async (id) => {
  
//   let getEmployee = new Promise((res, rej) => {
//   }
// }
