import { Request, Response, NextFunction } from "express";
import Staff from "../models/Staff";
import bcrypt from "bcryptjs";

// Create new staff member
export const createStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, mobNumber, gender, NIC, dob, role, department, salary, address, password } = req.body;

    // Check if staff already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      res.status(400).json({ message: "Staff member already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = new Staff({
      firstName,
      lastName,
      email,
      mobNumber,
      gender,
      NIC,
      dob,
      role,
      department,
      salary,
      address,
      password: hashedPassword
    });

    await newStaff.save();
    res.status(201).json({ message: "Staff member created successfully", staff: newStaff });
  } catch (error) {
    next(error);
  }
};

// Get all staff members
export const getAllStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const staff = await Staff.find({}, '-password').sort({ lastName: 1 });
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

// Get staff member by ID
export const getStaffById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id, '-password');
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
      return;
    }
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

// Update staff member
export const updateStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Hash password if provided
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const staff = await Staff.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
      return;
    }
    res.status(200).json({ message: "Staff member updated successfully", staff });
  } catch (error) {
    next(error);
  }
};

// Delete staff member
export const deleteStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
      return;
    }
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    next(error);
  }
};
