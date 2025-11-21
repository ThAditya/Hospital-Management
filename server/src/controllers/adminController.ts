import { Request, Response, NextFunction } from 'express';
import User from '../models/Users.js';
import Appointment from '../models/Appointment.js';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalPatients = await User.countDocuments();
    const totalDoctors = await User.countDocuments(); // Count all users as patients for now, adjust if role field exists
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });

    res.status(200).json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingAppointments
    });
  } catch (error) {
    next(error);
  }
};
