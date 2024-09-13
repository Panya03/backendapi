import express from "express";
import {addAllBlog, deleteblog, getAllBlogs, getById, getUserBlogs, updateBlog} from "../controllers/blog-controller.js";

const blogrouter = express.Router();  


blogrouter.get("/", getAllBlogs);
blogrouter.post("/add",addAllBlog);
blogrouter.put('/update/:id', updateBlog);
blogrouter.get("/:id",getById);
blogrouter.delete("/:id", deleteblog );
blogrouter.get('user/:id', getUserBlogs)
export default blogrouter;
