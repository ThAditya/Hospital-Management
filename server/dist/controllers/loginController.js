import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import { SECRET_KEY } from "./jsonWebToken-Config.js";
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Combine user finding logic to be more efficient
        let user = await Admin.findOne({ email });
        let role = 'admin';
        if (!user) {
            user = await Doctor.findOne({ email });
            role = 'doctor';
        }
        if (!user) {
            user = await User.findOne({ email });
            role = 'patient';
        }
        // Now check password
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate a JWT token
            const payload = { id: user._id, email: user.email, role: role };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
            res.status(200).json({ message: `Login successful for ${role}`, role, token });
            return;
        }
        // If no user found or password doesn't match
        res.status(401).json({ message: "Invalid email or password" });
    }
    catch (error) {
        next(error); // Pass the error to the global error handler
    }
};
export default loginController;
