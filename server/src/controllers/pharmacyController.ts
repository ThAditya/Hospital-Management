import { Request, Response, NextFunction } from "express";
import Pharmacy from "../models/Pharmacy";

// Create new medicine
export const createMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      medicineName,
      genericName,
      category,
      dosage,
      form,
      manufacturer,
      price,
      stockQuantity,
      expiryDate,
      prescriptionRequired,
      description,
      isActive
    } = req.body;

    const newMedicine = new Pharmacy({
      medicineName,
      genericName,
      category,
      dosage,
      form,
      manufacturer,
      price,
      stockQuantity,
      expiryDate,
      prescriptionRequired,
      description,
      isActive
    });

    await newMedicine.save();
    res.status(201).json({ message: "Medicine created successfully", medicine: newMedicine });
  } catch (error) {
    next(error);
  }
};

// Get all medicines
export const getAllMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const medicines = await Pharmacy.find().sort({ medicineName: 1 });
    res.status(200).json(medicines);
  } catch (error) {
    next(error);
  }
};

// Get medicine by ID
export const getMedicineById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const medicine = await Pharmacy.findById(id);
    if (!medicine) {
      res.status(404).json({ message: "Medicine not found" });
      return;
    }
    res.status(200).json(medicine);
  } catch (error) {
    next(error);
  }
};

// Update medicine
export const updateMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const medicine = await Pharmacy.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!medicine) {
      res.status(404).json({ message: "Medicine not found" });
      return;
    }
    res.status(200).json({ message: "Medicine updated successfully", medicine });
  } catch (error) {
    next(error);
  }
};

// Delete medicine
export const deleteMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const medicine = await Pharmacy.findByIdAndDelete(id);
    if (!medicine) {
      res.status(404).json({ message: "Medicine not found" });
      return;
    }
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    next(error);
  }
};
