import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import Doctor from "../models/Doctor";
import Admin from "../models/Admin"
import { SECRET_KEY } from "./jsonWebToken-Config";

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({email});
    
    if(admin && await bcrypt.compare(password,admin.password)){
      res.status(200).json({message: "Login successful for admin", role : "admin"});
      return;
    }
    // Find the Doctor in the database

    const doctor = await Doctor.findOne({email});

    if(doctor && await bcrypt.compare(password,doctor.password)){
      res.status(200).json({message: "Login successful for doctor" , role :"doctor"});
      return ;
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    if(user && await bcrypt.compare(password, user.password)){
      res.status(200).json({message: "Login successful for patient" , role :"patient"});
      return;
    }

    if (!user || !doctor || !admin) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }


    // Generate a JWT token
    const token = jwt.sign({ email }, SECRET_KEY);

    res.status(200).json({ token });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export default loginController;
