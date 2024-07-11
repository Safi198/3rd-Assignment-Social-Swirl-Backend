# Social Swirl Backend API

## Introduction

This repository contains the backend API for Social Swirl, which implements user authentication using JSON Web Tokens (JWT).

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Safi198/3rd-Assignment-Social-Swirl-Backend.git
   cd 3rd-Assignment-Social-Swirl-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   
   Create a `.env` file in the root directory with the following variables:
   
   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/SwirlAssignment3
   SECRET_KEY=my_secret_key
   ```

   Adjust `MONGO_URI` and `SECRET_KEY` as per your configuration.

4. Start the server:

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000`.

## API Endpoints

### Register a User

- **Endpoint:** POST `/auth/register`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "password"
  }
  ```
- **Response:**
  ```json
  {
    "success": "User registered successfully",
    "newUser": {
      "_id": "...",
      "username": "example_user",
      "password": "$2a$10$..."
    }
  }
  ```

### Login

- **Endpoint:** POST `/auth/login`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "password"
  }
  ```
- **Response:**
  ```json
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGVfdXNlciIsImlhdCI6MTYyNjMwNjYzMCwiZXhwIjoxNjI2MzA2OTMwfQ.knHwB1mbvI4XJ6BnSdPYHyFtLbkNsc7a4l29s6XQqdo"
  ```

### Get All Users (Protected Route)

- **Endpoint:** GET `/users`
- **Headers:** 
  ```
  Authorization: Bearer <JWT Token>
  ```

  Replace `<JWT Token>` with the token obtained from the login endpoint.

- **Response:**
  ```json
  [
    {
      "username": "example_user"
    }
  ]
  ```

## JWT Authentication

JWT authentication is used to protect routes like `/users`. Include the `Authorization` header with the token received from the login endpoint to access protected routes.