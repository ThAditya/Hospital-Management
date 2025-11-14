import Lab from "../models/Lab.js";
// Create new lab test
export const createLabTest = async (req, res, next) => {
    try {
        const { testName, description, category, price, preparationInstructions, estimatedDuration, isActive } = req.body;
        const newLabTest = new Lab({
            testName,
            description,
            category,
            price,
            preparationInstructions,
            estimatedDuration,
            isActive
        });
        await newLabTest.save();
        res.status(201).json({ message: "Lab test created successfully", labTest: newLabTest });
    }
    catch (error) {
        next(error);
    }
};
// Get all lab tests
export const getAllLabTests = async (req, res, next) => {
    try {
        const labTests = await Lab.find().sort({ testName: 1 });
        res.status(200).json(labTests);
    }
    catch (error) {
        next(error);
    }
};
// Get lab test by ID
export const getLabTestById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const labTest = await Lab.findById(id);
        if (!labTest) {
            res.status(404).json({ message: "Lab test not found" });
            return;
        }
        res.status(200).json(labTest);
    }
    catch (error) {
        next(error);
    }
};
// Update lab test
export const updateLabTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const labTest = await Lab.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!labTest) {
            res.status(404).json({ message: "Lab test not found" });
            return;
        }
        res.status(200).json({ message: "Lab test updated successfully", labTest });
    }
    catch (error) {
        next(error);
    }
};
// Delete lab test
export const deleteLabTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const labTest = await Lab.findByIdAndDelete(id);
        if (!labTest) {
            res.status(404).json({ message: "Lab test not found" });
            return;
        }
        res.status(200).json({ message: "Lab test deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
