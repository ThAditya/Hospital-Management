import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  mobNumber: string;
  NIC: string;
  dob: Date;
  gender: string;
  department: string;
  appointmentDate: Date;
  appointmentTime: string;
  address: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobNumber: { type: String, required: true },
  NIC: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  department: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'], default: 'pending' },
  notes: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);