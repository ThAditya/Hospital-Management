import express, { Request, Response, NextFunction } from "express";
import Treatment from "../models/Treatment"; // Import model

const router = express.Router();

// ---------------- CREATE Treatment ----------------
router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      patientId,
      doctorId,
      appointmentId,
      treatmentName,
      description,
      diagnosis,
      medications,
      procedures,
      notes,
      startDate,
      endDate,
      status,
      followUpDate,
    } = req.body;

    const treatment = new Treatment({
      patientId,
      doctorId,
      appointmentId,
      treatmentName,
      description,
      diagnosis,
      medications: medications || [],
      procedures: procedures || [],
      notes,
      startDate,
      endDate,
      status: status || "ongoing",
      followUpDate,
    });

    await treatment.save();
    res.status(201).json({ message: "Treatment created successfully", treatment });
  } catch (error) {
    next(error);
  }
});

// ---------------- GET All Treatments (Admin) ----------------
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const treatments = await Treatment.find()
      .populate("patientId", "firstName lastName email")
      .populate("doctorId", "firstName lastName specialty")
      .populate("appointmentId")
      .sort({ createdAt: -1 });
    res.status(200).json(treatments);
  } catch (error) {
    next(error);
  }
});

// ---------------- GET Treatments by Patient ----------------
router.get("/patient/:patientId", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId } = req.params;
    const treatments = await Treatment.find({ patientId })
      .populate("doctorId", "firstName lastName specialty")
      .populate("appointmentId")
      .sort({ startDate: -1 });
    res.status(200).json(treatments);
  } catch (error) {
    next(error);
  }
});

// ---------------- GET Treatments by Doctor ----------------
router.get("/doctor/:doctorId", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { doctorId } = req.params;
    const treatments = await Treatment.find({ doctorId })
      .populate("patientId", "firstName lastName email")
      .populate("appointmentId")
      .sort({ startDate: -1 });
    res.status(200).json(treatments);
  } catch (error) {
    next(error);
  }
});

// ---------------- UPDATE Treatment ----------------
router.patch("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const treatment = await Treatment.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    )
      .populate("patientId", "firstName lastName email")
      .populate("doctorId", "firstName lastName specialty");

    if (!treatment) {
      res.status(404).json({ message: "Treatment not found" });
      return;
    }

    res.status(200).json({ message: "Treatment updated successfully", treatment });
  } catch (error) {
    next(error);
  }
});

// ---------------- DELETE Treatment ----------------
router.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const treatment = await Treatment.findByIdAndDelete(id);

    if (!treatment) {
      res.status(404).json({ message: "Treatment not found" });
      return;
    }

    res.status(200).json({ message: "Treatment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
