import { Admin } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";


export enum UserType {
  Doctor = "doctor",
  Patient = "patient",
  Admin = "admin"
}


export interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobNumber: number;
  gender: string;
  NIC: string;
  dob: Date;
  specialty : string,
  experience : string, 
  password: string;
  address: string;

  role : string;
}

const UserSchema = new Schema<IDoctor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobNumber: { type: Number, default: null },
  NIC: { type: String, default: null },
  dob: { type: Date, default: null },
  gender: { type: String, default: null },
  specialty: { type: String, required : true, default : UserType.Doctor},
  experience: { type: String, required : true, default : UserType.Doctor  },
  
  role: {type: String, required: true , default : UserType.Doctor},
  password: { type: String, required: true },
  address: { type: String, default: null },
});


export default mongoose.model<IDoctor>("Doctor", UserSchema);