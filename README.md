# Student Record Manager

A full-stack Student Record Manager application built using React, Node.js, Express.js, and MongoDB.

The application allows users to create, view, update, and delete student records through a simple and responsive web interface.

## Features

- Add new student records
- View all student records
- Edit existing student records
- Delete student records
- Delete confirmation
- Marks validation from 0 to 100
- Success and error messages
- Responsive user interface
- REST API integration
- MongoDB database storage
- React state management using useState
- Axios API communication

## Technologies Used

### Frontend

- React
- JavaScript
- HTML5
- CSS3
- Axios
- Vite

### Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database

- MongoDB

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Compass

## Project Structure

```text
Student-Record-Manager/
│
├── backend/
│   ├── models/
│   │   └── Student.js
│   │
│   ├── routes/
│   │   └── studentRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── studentApi.js
│   │   │
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md