This project is a backend REST API for a social media platform, developed using Node.js and Express.js. The API allows users to create accounts, log in, post blogs, and interact with user data securely. Passwords are encrypted using bcrypt to ensure security.

Features
•	User authentication with encrypted passwords (bcrypt).
•	CRUD operations for user-generated blogs.
•	Scalable, modular architecture.
•	MongoDB database integration with Mongoose for managing data.
•	Built with RESTful principles for easy integration with frontend applications.

Tech Stack
•	Node.js: Backend runtime environment.
•	Express.js: Web framework for building the REST API.
•	MongoDB: NoSQL database to store user and blog data.
•	Mongoose: ODM (Object Data Modeling) library for MongoDB.
•	bcrypt: Used for password hashing.
•	Postman: For API testing.

Installation
1.	Clone the Repository:
bash
Copy code
git clone https://github.com/Panya03/backendapi.git
2.	Navigate to the Project Directory:
bash
Copy code
cd backendapi
3.	Install Dependencies: Ensure you have Node.js installed, then run:
bash
Copy code
npm install
4.	Create an .env File: Create a .env file in the root of the project and add the following:
bash
Copy code
MONGO_URL=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-jwt-secret>
5.	Run the Application:
bash
Copy code
npm start
6.	Access the API: The API will be running on http://localhost:5000.
   
API Endpoints
User Routes
•	POST /api/user/signup: Register a new user.
•	POST /api/user/login: Authenticate a user and provide a token.

Blog Routes
•	GET /api/blog: Fetch all blogs.
•	GET /api/blog/
: Fetch a single blog by ID.
•	POST /api/blog/add: Add a new blog.
•	PUT /api/blog/update/
: Update a blog by ID.
•	DELETE /api/blog/
: Delete a blog by ID.

Usage
•	Target Audience: Developers building frontend social media platforms or apps looking for secure user authentication and blog posting capabilities.
•	Use Cases: Useful for building scalable social platforms with secure user authentication and blog management.

Security
•	Password Encryption: Passwords are hashed using bcrypt to protect user data.
•	JWT: JSON Web Token (JWT) is used to secure user authentication and sessions.

How It Helps
•	User Privacy: Ensures secure password management and user data protection.
•	Fast and Scalable: Built with modern tools like MongoDB, Node.js, and Express.js for a fast and scalable backend.

SDG Goal
This project supports SDG Goal 9 (Industry, Innovation, and Infrastructure) by promoting secure and scalable infrastructure for social engagement.

