import mongoose, { Schema, Document } from "mongoose";

export interface IStaff extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobNumber: string;
  gender: string;
  NIC: string;
  dob: Date;
  role: string; // e.g., Nurse, Technician, Admin Assistant
  department: string;
  salary: number;
  hireDate: Date;
  address: string;
  password: string;
}

const StaffSchema = new Schema<IStaff>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobNumber: { type: String, required: true },
  gender: { type: String, required: true },
  NIC: { type: String, required: true },
  dob: { type: Date, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  hireDate: { type: Date, default: Date.now },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IStaff>("Staff", StaffSchema);
