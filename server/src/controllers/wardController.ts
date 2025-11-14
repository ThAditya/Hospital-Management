import { Request, Response, NextFunction } from "express";
import Ward from "../models/Ward";
import { createNotificationForAdmins } from "./notificationController";

// Create new ward
export const createWard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { wardName, wardType, totalBeds, availableBeds, floor, description, isActive } = req.body;

    const newWard = new Ward({
      wardName,
      wardType,
      totalBeds,
      availableBeds,
      floor,
      description,
      isActive
    });

    await newWard.save();

    // Check if available beds are low
    if (newWard.availableBeds < 5) {
      await createNotificationForAdmins(
        'ward_issue',
        `Ward alert: ${wardName} has only ${availableBeds} available beds.`,
        newWard.id
      );
    }

    res.status(201).json({ message: "Ward created successfully", ward: newWard });
  } catch (error) {
    next(error);
  }
};

// Get all wards
export const getAllWards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const wards = await Ward.find().sort({ wardName: 1 });
    res.status(200).json(wards);
  } catch (error) {
    next(error);
  }
};

// Get ward by ID
export const getWardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const ward = await Ward.findById(id);
    if (!ward) {
      res.status(404).json({ message: "Ward not found" });
      return;
    }
    res.status(200).json(ward);
  } catch (error) {
    next(error);
  }
};

// Update ward
export const updateWard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const ward = await Ward.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!ward) {
      res.status(404).json({ message: "Ward not found" });
      return;
    }
    res.status(200).json({ message: "Ward updated successfully", ward });
  } catch (error) {
    next(error);
  }
};

// Delete ward
export const deleteWard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const ward = await Ward.findByIdAndDelete(id);
    if (!ward) {
      res.status(404).json({ message: "Ward not found" });
      return;
    }
    res.status(200).json({ message: "Ward deleted successfully" });
  } catch (error) {
    next(error);
  }
};
