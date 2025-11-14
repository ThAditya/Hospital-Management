import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./app-router.js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
const __dirname = path.resolve();
// Use environment variables for MongoDB connection
const mongoDBurl = process.env.MONGODB_URI;
if (!mongoDBurl) {
    console.error("❌ MongoDB URI is missing! Set MONGODB_URI in .env");
    process.exit(1);
}
const app = express();
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:5173', 'http://localhost:5174', 'https://76z8d4p6-5000.inc1.devtunnels.ms'], // Added Dashboard port and Frontend tunnel
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
    // credentials: true, origin: [clientPort]
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json()); // <---- This is required
app.use("/api", router);
// MongoDB Atlas connection
mongoose
    .connect(mongoDBurl, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
})
    .catch((error) => {
    console.error("❌ Error connecting to MongoDB Atlas:", error);
    process.exit(1); // Exit if connection fails
});
// app.listen(serverPort, () => {
//   console.log(
//     `🚀 Server Running On Port ${serverPort} | Local - http://localhost:${serverPort}`
//   );
// });
