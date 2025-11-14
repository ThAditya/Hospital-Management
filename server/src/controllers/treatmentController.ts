import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./jsonWebToken-Config.js";
import Treatment from "../models/Treatment.js";
import { createNotification } from "./notificationController.js";

// ---------------- CREATE Treatment ----------------
export const createTreatment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      if (decoded.id !== req.body.doctorId) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

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

    // Create notification for doctor
    await createNotification(
      doctorId,
      'doctor',
      'treatment_schedule',
      `New treatment scheduled: ${treatmentName} for patient ${patientId}`,
      treatment.id
    );

    res.status(201).json({ message: "Treatment created successfully", treatment });
  } catch (error) {
    next(error);
  }
};

// ---------------- GET All Treatments (Admin) ----------------
export const getAllTreatments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
};

// ---------------- GET Treatments by Patient ----------------
export const getPatientTreatments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
};

// ---------------- GET Treatments by Doctor ----------------
export const getDoctorTreatments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
};

// ---------------- UPDATE Treatment ----------------
export const updateTreatment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const oldTreatment = await Treatment.findById(id);
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

    // Notify patient if treatment is approved
    if (oldTreatment && oldTreatment.status !== 'ongoing' && treatment.status === 'ongoing') {
      await createNotification(
        treatment.patientId.toString(),
        'patient',
        'treatment_approved',
        `Your treatment "${treatment.treatmentName}" has been approved and is now ongoing.`,
        treatment.id
      );
    }

    res.status(200).json({ message: "Treatment updated successfully", treatment });
  } catch (error) {
    next(error);
  }
};

// ---------------- DELETE Treatment ----------------
export const deleteTreatment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
};
