import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./jsonWebToken-Config.js";
const deleteUserController = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        const { email } = req.body;
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            if (decoded.email !== email) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }
        }
        catch (error) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        console.log("Email:", email);
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        console.log("Deleted User:", user);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export default deleteUserController;
