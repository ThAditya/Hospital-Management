import { Request, Response, NextFunction } from "express";
import Appointment from "../models/Appointment";
import jwt from "jsonwebtoken";

// Create a new appointment (patient booking)
export const createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobNumber,
      NIC,
      dob,
      gender,
      department,
      appointmentDate,
      appointmentTime,
      address,
      notes
    } = req.body;

    // For now, we'll set patientId from token if authenticated, else null
    // In a full implementation, this should be from JWT token
    const token = req.headers.authorization?.split(' ')[1];
    let patientId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        patientId = decoded.id;
      } catch (error) {
        // Token invalid, but allow booking without login for now
      }
    }

    const appointment = new Appointment({
      patientId,
      firstName,
      lastName,
      email,
      mobNumber,
      NIC,
      dob,
      gender,
      department,
      appointmentDate,
      appointmentTime,
      address,
      status: 'pending',
      notes
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    next(error);
  }
};

// Get all appointments (admin view)
export const getAllAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'firstName lastName email')
      .populate('doctorId', 'firstName lastName specialty')
      .sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Get appointments for a specific patient
export const getPatientAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'firstName lastName specialty')
      .sort({ appointmentDate: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Get appointments for a specific doctor
export const getDoctorAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'firstName lastName email')
      .sort({ appointmentDate: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Update appointment status (accept/reject/complete/cancel)
export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, notes, updatedAt: new Date() },
      { new: true }
    );

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.status(200).json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    next(error);
  }
};

// Assign doctor to appointment
export const assignDoctorToAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { doctorId } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { doctorId, updatedAt: new Date() },
      { new: true }
    ).populate('doctorId', 'firstName lastName specialty');

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.status(200).json({ message: "Doctor assigned successfully", appointment });
  } catch (error) {
    next(error);
  }
};

// Delete/cancel appointment
export const deleteAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    next(error);
  }
};