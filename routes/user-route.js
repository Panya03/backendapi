import express from 'express';
import { getAllUser, signup,login} from "../controllers/user-controller.js";

const router = express.Router();

// Define the route to get all users
router.get("/",getAllUser);
router.post("/signup",signup);

router.post("/login",login);
export default router;
