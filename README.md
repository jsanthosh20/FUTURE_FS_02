# Mini CRM

A simple yet fully functional Customer Relationship Management web application built with React, Node.js, Express, and MySQL.

## Features

- Admin authentication with JWT
- Lead management (CRUD operations)
- Professional UI with modern design
- Responsive layout

## Tech Stack

- Frontend: React.js, CSS3
- Backend: Node.js, Express.js
- Database: MySQL with Sequelize
- Authentication: JWT

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Install client dependencies: `cd client && npm install`
4. Install server dependencies: `cd server && npm install`
5. Start MySQL and create database `mini_crm`
6. Create .env file with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, PORT
7. Create admin user: `cd server && node createAdmin.js`
8. Run the application: `npm run dev`

## Usage

- Access the app at http://localhost:3000
- Login with username: admin, password: admin123
- Manage leads from the dashboard