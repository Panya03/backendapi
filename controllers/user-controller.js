import User from '../model/User.js';
import bcrypt from 'bcryptjs';

// Get all users
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error retrieving users" }); // Send response in case of error
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
};

// Signup new user
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);  // Log error
        return res.status(500).json({ message: "Server error" });  // Send response
    }

    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs:[],
    });

        try {
        await user.save();
    } catch (err) {
        console.log(err);  // Log error
        return res.status(500).json({ message: "Failed to create user" });  // Send response
    }

    return res.status(201).json({ user });  // Successful creation response
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);  // Log error
        return res.status(500).json({ message: "Server error" });  // Send response
    }

    // Correct condition to check if user is not found
    if (!existingUser) {
        return res.status(404).json({ message: "Cannot find user with this email" });
    }

    // Fix the typo in bcrypt comparison
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "Login Successful" });
};