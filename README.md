# Faculty Management System (Capstone Project)
## Table of Contents
- [Introduction](#Introduction)
- [Project Overview](#Project_Overview)
- [System Architecture](#System_Architecture)
- [Technology Stack](#Technology_Stack)
- [Features](##Features)
- [Setup and Installation](#Setup_and_Installation)
- [Project Structure](Project_Structure)
- [Project Dependencies](#ProjectProject_Dependencies)
- [Testing and Quality Assurance](#Testing_and_Quality_Assurance)
- [Deployment](#Deployment)


## Introduction
The Faculty Management System (CMS) is a comprehensive solution designed to manage workshop, journals, and leaves within a college faculty management environment. This project demonstrates the use of modern web development technologies to create a responsive and efficient management system.

## Project Overview
The Faculty Management System (CMS) provides the following primary features:

User Authentication: Secure registration and login functionality.
Task Management: Create, update, delete, and categorize tasks related to faculty operations.
User Interface: A responsive and user-friendly interface for both web and mobile platforms.
Role-Based Access Control: Different views and functionalities for admins and regular users.


## System Architecture
The CMS is built with a separation of concerns in mind, utilizing a microservice-like architecture with distinct backend and frontend components.

Backend:
Technologies: Node.js, Express.js, MongoDB, GraphQL
Description: The backend handles user authentication, task management, and provides RESTful and GraphQL APIs for managing data.
Web Frontend:
Technologies: React, Redux, CSS, GraphQL
Description: The frontend is a single-page application built with React, styled with CSS, and integrated with GraphQL to handle data operations.

## Technology Stack
Frontend (Web)
React
Redux
CSS
GraphQL
Backend
Node.js
Express.js
MongoDB
GraphQL
Testing
PlayWright
Deployment


## Features
User Authentication: Secure login/signup using JWT.
Task Management: CRUD operations for managing tasks.
Responsive Design: Optimized for both desktop and mobile devices.
Role-Based Access: Different functionalities for admins and users.

## Demo

![Screenshot 2024-09-02 013617](https://github.com/user-attachments/assets/22a0ad71-f6da-4ec1-ae08-fb1544c0e02d)

![Screenshot 2024-09-02 013906](https://github.com/user-attachments/assets/19ff2ce2-1f4d-45d6-9ed2-ad3bca59591e)

![Screenshot 2024-09-02 014516](https://github.com/user-attachments/assets/c333eb90-aa00-4042-a656-db711ce06b5b)

![Screenshot 2024-09-02 014623](https://github.com/user-attachments/assets/f0ff5391-a33c-4175-9a80-3d7343e64ef0)








## Setup and Installation
To run this application locally, follow these steps:

### Backend Setup
Clone the repository: https://github.com/naranavee/faculty-managment-main-main.git
bash
git clone 
2. Navigate to the backend directory:

cd canteen-management-system/backend


Install the dependencies:

npm install

Set up environment variables:
Create a .env file in the root of the backend directory and add your environment variables as shown in the .env.example.
Start the backend server:
npm run start


Frontend Setup
Navigate to the frontend directory:

cd ../frontend

Install the dependencies:

npm install

Start the frontend server:

npm run start

Open your browser and navigate to: http://localhost:3000
## Project Structure
The project follows a modular structure to ensure scalability and maintainability. Key directories include:

/backend: Contains the Node.js backend code.
/frontend: Contains the React frontend code.






## Project Dependencies
1.Backend
@apollo/client: Apollo Client for managing GraphQL queries and mutations.
apollo-server: Apollo Server for setting up a GraphQL server.
bcryptjs: Library for hashing passwords.
dotenv: Module for loading environment variables.
graphql: GraphQL schema and query language.
jsonwebtoken: Library for handling JSON Web Tokens.
mongoose: MongoDB object modeling tool.


2.Frontend
@apollo/client: Apollo Client for managing GraphQL queries and mutations.
react-redux and @reduxjs/toolkit: Libraries for managing global state in React.
react-router-dom: Library for handling routing in React applications.
jest: Testing library for JavaScript.
Testing and Quality Assurance
The project includes comprehensive unit, integration, and end-to-end tests to ensure quality.

## Running Tests
Navigate to the backend or frontend directory.
Run the tests using Jest or Mocha:

bash
Copy code
npm test

Tools Used
Jest: For unit testing.
Mocha and Chai: For backend testing.
Karma: For end-to-end testing.
## Deployment
Deploying to Heroku or AWS
Create accounts on Heroku or AWS.
Connect your GitHub repository for deployment.
Set up the environment variables as needed.
