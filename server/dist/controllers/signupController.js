import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Doctor.js";
import { SECRET_KEY } from "./jsonWebToken-Config.js";
const signupController = async (req, res, next) => {
    try {
        const { firstName, lastName, email, mobNumber, nic: NIC, DOB: dob, gender, specialty, experience, password, address } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, mobNumber: parseInt(mobNumber), NIC, dob: new Date(dob), gender, experience, specialty, address, password: hashedPassword });
        await newUser.save();
        console.log(newUser);
        // Generate a JWT token
        const token = jwt.sign({ email }, SECRET_KEY);
        res.status(201).json({ token });
    }
    catch (error) {
        next(error);
    }
};
export default signupController;
