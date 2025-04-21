import { Admin } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";


// export enum UserType {
//   Doctor = "doctor",
//   Patient = "patient", 
//   Admin = "admin"
// }


export interface IPatient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobNumber: number;
  gender: string;
  NIC: string;
  dob: Date;

  password: string;
  address: string;


}

const UserSchema = new Schema<IPatient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobNumber: { type: Number, default: null },
  NIC: { type: String, default: null },
  dob: { type: Date, default: null },
  gender: { type: String, default: null },

  password: { type: String, required: true },
  address: { type: String, default: null },
});

export default mongoose.model<IPatient>("Patient", UserSchema);