import { Request, Response } from "express";
import Doctor from "../models/Doctor.js";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({}, '-password'); // exclude password field
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error });
  }
};
