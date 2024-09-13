import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-route.js";  // Ensure correct path and extension
import blogrouter from './routes/blog-routes.js';

const app = express();

// Use router middleware
app.use(express.json());
app.use("/api/user",router);

app.use("/api/blog", blogrouter);

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://<db_username>:<pswd>/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => app.listen(5000))
    .then(() => console.log("Connected to Database and to Localhost 5000"))
    .catch((err) => console.log(err));
