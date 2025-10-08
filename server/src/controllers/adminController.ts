// import express, { Request, Response } from "express";
// // import { verifyToken } from "../middlewares/auth";
// import Admin from "../models/Admin";

// const router = express.Router();

// // Define an interface to extend Express Request to include user info from verifyToken
// interface AuthenticatedRequest extends Request {
//   user?: { id: string; role?: string; email?: string };
// }

// // ✅ Get current admin details
// router.get(
//   "/profile",
//   verifyToken,
//   async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     try {
//       if (!req.user?.id) {
//         res.status(401).json({ error: "Unauthorized: No user ID found" });
//         return;
//       }

//       const admin = await Admin.findById(req.user.id).select("-password");
//       if (!admin) {
//         res.status(404).json({ error: "Admin not found" });
//         return;
//       }

//       res.json({ admin });
//     } catch (err) {
//       console.error("Error fetching admin:", err);
//       res.status(500).json({ error: "Server Error" });
//     }
//   }
// );

// // ✅ Add a new admin
// router.post(
//   "/add-admin",
//   verifyToken,
//   async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         res.status(400).json({ error: "Email and password are required" });
//         return;
//       }

//       const existingAdmin = await Admin.findOne({ email });
//       if (existingAdmin) {
//         res.status(400).json({ error: "Admin already exists" });
//         return;
//       }

//       const newAdmin = new Admin({ email, password, role: "admin" });
//       await newAdmin.save();

//       res.json({ message: "New admin added successfully!" });
//     } catch (err) {
//       console.error("Error adding admin:", err);
//       res.status(400).json({ error: "Failed to add admin" });
//     }
//   }
// );

// export default router;
