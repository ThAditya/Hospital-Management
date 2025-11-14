import Pharmacy from "../models/Pharmacy.js";
import { createNotificationForAdmins } from "./notificationController.js";
// Create new medicine
export const createMedicine = async (req, res, next) => {
    try {
        const { medicineName, genericName, category, dosage, form, manufacturer, price, stockQuantity, expiryDate, prescriptionRequired, description, isActive } = req.body;
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
        // Check if stock is low
        if (newMedicine.stockQuantity < 10) {
            await createNotificationForAdmins('medicine_low_stock', `Low stock alert: ${medicineName} has only ${stockQuantity} units left.`, newMedicine.id);
        }
        res.status(201).json({ message: "Medicine created successfully", medicine: newMedicine });
    }
    catch (error) {
        next(error);
    }
};
// Get all medicines
export const getAllMedicines = async (req, res, next) => {
    try {
        const medicines = await Pharmacy.find().sort({ medicineName: 1 });
        res.status(200).json(medicines);
    }
    catch (error) {
        next(error);
    }
};
// Get medicine by ID
export const getMedicineById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medicine = await Pharmacy.findById(id);
        if (!medicine) {
            res.status(404).json({ message: "Medicine not found" });
            return;
        }
        res.status(200).json(medicine);
    }
    catch (error) {
        next(error);
    }
};
// Update medicine
export const updateMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const medicine = await Pharmacy.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!medicine) {
            res.status(404).json({ message: "Medicine not found" });
            return;
        }
        res.status(200).json({ message: "Medicine updated successfully", medicine });
    }
    catch (error) {
        next(error);
    }
};
// Delete medicine
export const deleteMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medicine = await Pharmacy.findByIdAndDelete(id);
        if (!medicine) {
            res.status(404).json({ message: "Medicine not found" });
            return;
        }
        res.status(200).json({ message: "Medicine deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
