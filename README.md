## blog-api
This application is the backend part from the Blog application. It was developed using Node, Sequelize, Serverless,  AWS Lambda and relational database PostgreSQL. To run it locally, type on terminal:

    npm install
    npm run dev
    
The server is going to be running on **http://localhost:3000/**. 

The production API was deployed to AWS and it is available on link: https://4o4xx55kw2.execute-api.us-east-1.amazonaws.com/dev

The Postman collection, which refers to all endpoints created, can be accessed here: https://www.getpostman.com/collections/d7c39cebefebbb4ca468

Tests were implemented using Jest and Supertest. To run it, type:

    npm test
