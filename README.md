
# Employees API

I've written this using AWS Lambdas, DynamoDB, and NodeJS.  I am certainly happy to discuss the choices I made in great detail as it is difficult to assess what exactly any given organization thinks is looking for.  I hope you enjoy looking through this - it was fun to put together.

This project is built with the [serverless framework](https://serverless.com/) and [CircleCI](https://circleci.com/).  It was really straight forward to put it together - if you have any issues getting it up and running after reviewing the information I've provided here, please feel free to let me know.  I am more than happy to help!

It creates a REST API and the AWS serverless lambda functions to handle the incoming data.  It uses DynamoDB to store data.  

It has a few tests written in mocha and chai.  Runs on the Node 8.10 runtime.

CircleCI is a CI platform that uses containers to build, test, and deploy the project.  The configuration for CircleCI is locates in the .circleci directory in a file named config.yml

This api is currently not available on any running server - but it certianly could be in short order.

In order to this stack working, you need to clone the repo and follow the instructions that you can find [here](https://circleci.com/blog/deploying-a-serverless-application/).  You do not need two aws accounts to get this application running - the second account would be to put the application into production.  Set up the CircleCI account, install Node if you don't have it already, then install the serverless framework.

# Contracts

All requests to all end points must have an auth header.  Add a header named 'key' and the auth key to have your calls allowed access.  You can find the auth key in auth.js file.  This is of course not real authentication - I wanted something that mocked it.

### POST

Call a POST request on the employees endpoint providing one of the two types of data listed below.

A JSON Array - adds all the items in the JSON Array to the db

    [
        {
            "FirstName": "Joe",
            "MiddleInitial": "R",
            "LastName": "Schmoe",
            "DateOfBirth": "01/01/2001",
            "DateOfEmployment": "06/01/2018"
        },
        {
            "FirstName": "Foo",
            "MiddleInitial": "B",
            "LastName": "Ar",
            "DateOfBirth": "05/06/1995",
            "DateOfEmployment": "03/23/2009"
        },
        {
            "FirstName": "Ira",
            "MiddleInitial": "A",
            "LastName": "Noymous",
            "DateOfBirth": "06/01/1990",
            "DateOfEmployment": "03/04/2005"
        },
        {
            "FirstName": "Missy",
            "MiddleInitial": "I",
            "LastName": "Naction",
            "DateOfBirth": "01/01/1999",
            "DateOfEmployment": "12/12/2012"
        }
    ]

or a JSON Object

    {
        "FirstName": "Ibe",
        "MiddleInitial": "N",
        "LastName": "Oone",
        "DateOfBirth": "02/02/2002",
        "DateOfEmployment": "06/01/2014"
    }

### GET

#### Get All - returns active employees in the db

Call a GET request on the emploee endpoint with no additional queryString parameters 

#### Get - returns one active employee in the db

Call a GET request on the emploee endpoint with the id queryString parameters sepcified.  The ids are uuid v4 values and you should be able to get them via querying for the whole list (see Get All).

### PUT

Call the employee endpoint using the PUT method.  Provide a payload that looks like the following data (please not the ID must be a UUID that exists and all values are updated to whatever is in the payload):

    {
        "DateOfBirth": "01/01/2001",
        "DateOfEmployment": "06/01/2018",
        "MiddleInitial": "S",
        "Status": "ACTIVE",
        "FirstName": "Joe",
        "ID": "3edd3866-b73b-4dbf-9b4d-072cdc33ffc8",
        "LastName": "Schmoe"
    }

### DELETE - changes one employee from ACTIVE status to INACTIVE status

Call the employees endpoint using DELETE method passing the id of the employee you want to set to INACTIVE

# Notes:

In code challenges choices have to be made.  I happen to think that seeing a full CI/CD solution for a REST server ask is something remarkable.  I've seen what many people turn in for code challenges and I've never seen one like this.  I've add some additional high level thoughts below.  

## Testing

The testing in this app is primarily manual.  I used Postman to verify that the API worked as intended.  There are some limited tests that I would consider a fraction of the bottom tier of the testing pyramid.  Those tests are passing but really a whole lot more work would need to be done there to get them to where I would like to see them for a professional setting.  There are no integrations tests (other than manual postman tests) and certainly no end-to-end tests.  All of which, I'm a 

## Debugging

In the interest of time, I did not use serverless' debugging strategies.  I certainly would in the future now that I've had time to review them (given I was using the serverless framework) as I loathe testing each change live.  Pushing each change seemed like the fastest route to completion however.

## Branching & Pull Requests

I did not spend any time using a specific branching technique for this build - I was the only person working on it.  In a non-challenge environment, I would expect feature branches, feature toggles, and pull requests with approvals and merging as part of the process.  I think those peices are all crucial to developing and deploying quality software - I left them out as a product of necessity.  
