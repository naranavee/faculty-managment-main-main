Table of Contents
Introduction
Demo
Technology
Features
CRUD Operations
Testing
Color Palette
Introduction
The Faculty Management System (FMS) is a web-based application developed to manage various faculty-related activities within an educational institution. It includes features like workshop management, project journals, leave applications, and profile management, with complete CRUD operations. The system also provides administrators with tools to manage and approve workshops, journals, and leave requests.


for running the project 

1.clone the project:https://github.com/naranavee/faculty-managment-main-main.git
2.step 1 -> cd backend step 2 -> npm i step 3 -> npm run start
3.step 1 -> cd frontend step 2 -> npm i step 3 -> npm run start

Demo

![Screenshot 2024-09-02 013617](https://github.com/user-attachments/assets/52be5c9c-895a-47e5-8bdd-937edcf577d0)

![Screenshot 2024-09-02 014120](https://github.com/user-attachments/assets/44a513dd-36ef-496e-a89a-9ce91b06df20)


![Screenshot 2024-09-02 014516](https://github.com/user-attachments/assets/1054fded-4950-4a88-9171-aabbc092784b)

![Screenshot 2024-09-02 014623](https://github.com/user-attachments/assets/1b566526-1192-4a66-b6b0-f3d8c735649b)





The screenshots above showcase key components of the Faculty Management System. The Faculty Home Page allows faculty members to manage their profiles, workshops, project journals, and leave applications, while the Admin Page provides tools to manage and approve these activities.

Technology
The Faculty Management System is built using the following technologies:

Backend:
Node.js: JavaScript runtime used for server-side development.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database used to store data related to faculty, workshops, journals, and leaves.
GraphQL: Used for efficient data querying and manipulation.
Mongoose: ODM library for MongoDB, used to define and manage data schemas.
Web Frontend:
React: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for responsive and customizable design.
Bootstrap: CSS framework for building responsive and mobile-first components.
Axios: HTTP client for making API requests.
React Router: For handling navigation and routing within the application.
Features
The Faculty Management System offers the following features:

Faculty Home Page:
Profile: Faculty members can view and update their profiles.
Workshop: Manage workshops, including registering, updating, and deleting workshops.
Project Journals: Add and manage project journals, including adding details like title, journal name, publisher, and department.
Apply Leaves: Faculty can apply for leave and track leave status.
Logout: Securely log out of the system.
Admin Page:
View Profiles: Administrators can view, update, and delete faculty profiles.
View Workshops: Manage workshops, with options to approve, edit, and delete entries.
Journals: Manage project journals, including editing, deleting, and approving journal entries.
View Leaves: Review and approve leave applications submitted by faculty.
CRUD Operations
The system supports the following CRUD operations:

Create: Add new workshops, project journals, leaves, and profiles.
Read: View faculty profiles, workshops, journals, and leave requests.
Update: Edit existing workshops, journals, profiles, and leave statuses.
Delete: Remove workshops, journals, profiles, and leave requests from the system.
Testing
The Faculty Management System employs various testing techniques to ensure the quality and reliability of the application:

Unit Testing: Each function and component is tested individually to verify that they work as expected. This includes testing API endpoints, reducers, and utility functions.
Integration Testing: Testing the interaction between different components, such as ensuring that API calls correctly update the state and that UI components render based on the state.
End-to-End Testing: Simulating user interactions from the frontend to the backend, ensuring that the entire application workflow functions correctly. Tools like Cypress or Selenium can be used for this purpose.
Automated Testing: Continuous integration (CI) pipelines are set up to run automated tests on code changes, ensuring that new features do not break existing functionality.
Manual Testing: In addition to automated tests, manual testing is conducted to catch any issues that automated tests may miss, particularly in the user interface and user experience aspects.
Color Palette
The color palette used in this application includes:

#478ba2: Primary color used for consistent styling across the Faculty Management System.
