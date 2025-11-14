import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/Users";
async function createTestUser() {
    try {
        const MONGODB_URI = process.argv[2] || process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not set and no connection string provided as argument");
        }
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB Atlas");
        const email = "testuser@example.com";
        const password = "testpassword";
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Test user already exists");
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name: "Test User",
            role: "patient"
        });
        await newUser.save();
        console.log("Test user created successfully");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
    }
    catch (error) {
        console.error("Error creating test user:", error);
        process.exit(1);
    }
}
createTestUser();
