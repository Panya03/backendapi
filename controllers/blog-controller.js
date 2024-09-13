import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from 'mongoose'; 

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();  // Fetch all blogs
    } catch (err) {
        console.log(err);  // Log the error for debugging
        return res.status(500).json({ message: "Error retrieving blogs" });  // Send error response
    }
    if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });  // Handle case when no blogs are found
    }
    return res.status(200).json({ blogs });  // Send success response with blogs
};

// Add a new blog
export const addAllBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }
    catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find user"})
    }

    // Create a new blog instance
    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        // Save the blog post to the database
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog);
       await existingUser.save({session})
       await session.commitTransaction();
        // Send success response
        return res.status(201).json({ message: "Blog created successfully", blog });
    } catch (err) {
        console.log(err);  // Log the error
        // Send error response
        return res.status(500).json({ message: "Error creating blog", error: err.message });
    }
};

export const updateBlog = async(req,res,next) =>{
    const {title,description} = req.body;
    const blogid = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogid,{
            title,
            description
    })
} catch(err){
    return console.log(err)
}
if(!blog){
    return res.status(500).json({message:"Unable to update blog"})
}
return res.status(200).json({blog})
}

export const getById = async (req,res,next) =>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blog});
};



export const deleteblog = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        // Try to find and delete the blog by ID
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting the blog", error: err.message });
    }

    if (!blog) {
        return res.status(404).json({ message: "Blog not found, unable to delete" });  // 404 if blog is not found
    }

    return res.status(200).json({ message: "Deleted successfully" });
};

export const getUserBlogs = async (req, res, next) => {
    const userId = req.params.userId;

    let userblogs;
    try {
        userblogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error retrieving user blogs", error: err.message });
    }

    if (!userblogs) {
        return res.status(404).json({ message: "No blogs found for this user" });
    }

    return res.status(200).json({ blogs: userblogs.blog });
};