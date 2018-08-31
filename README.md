
# Employees API

I've take the liberty to write this application using AWS Lambdas, DynamoDB, and NodeJS.  Building this in Java 1.8 would put me in a non-optimal position as I haven't written any Java in the last 4-5 years.  I am certainly happy to discuss the choices I made in great detail as it is difficult to assess what exactly any given organization thinks is appropriate for their code challeges.  I hope you enjoy looking through this - it was fun to put together.

This project is built with the [serverless framework](https://serverless.com/) and [CircleCI](https://circleci.com/).  It was really straight forward to put it together - if you have any issues getting it up and running after reviewing the information I've provided here, please feel free to let me know.  I am more than happy to help!

It creates a REST API and the AWS serverless lambda functions to handle the incoming data.  It uses DynamoDB to store data.  

It has a few tests written in mocha and chai.  Runs on the Node 8.10 runtime.

CircleCI is a CI platform that uses containers to build, test, and deploy the project.  The configuration for CircleCI is locates in the .circleci directory in a file named config.yml

This api is available at https://an8ebmfhc4.execute-api.us-west-2.amazonaws.com/pre/employees

In order to this stack working, you need to clone the repo and follow the instructions that you can find [here](https://circleci.com/blog/deploying-a-serverless-application/).  You do not need two aws accounts to get this application running - the second account would be to put the application into production.  Set up the CircleCI account, install Node if you don't have it already, then install the serverless framework.

Notes:

In code challenges choices have to be made.  I happen to think that seeing a full CI/CD solution for a REST server ask is something remarkable.  I've seen what many people turn in for code challenges and I've never seen one like this.  I've add some additional high level thoughts below.  

## Testing

The testing in this app is primarily manual.  I used Postman to verify that the API worked as intended.  There are some limited tests that I would consider a fraction of the bottom tier of the testing pyramid.  Those tests are passing but really a whole lot more work would need to be done there to get them to where I would like to see them for a professional setting.  There are no integrations tests (other than manual postman tests) and certainly no end-to-end tests.  All of which, I'm a 

## Debugging

In the interest of time, I did not use serverless' debugging strategies.  I certainly would in the future now that I've had time to review them (given I was using the serverless framework) as I loathe testing each change live.  Pushing each change seemed like the fastest route to completion however.

## Branching & Pull Requests

I did not spend any time using a specific branching technique for this build - I was the only person working on it.  In a non-challenge environment, I would expect feature branches, feature toggles, and pull requests with approvals and merging as part of the process.  I think those peices are all crucial to developing and deploying quality software - I left them out as a product of necessity.  