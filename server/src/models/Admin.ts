import { Admin } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";


export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobNumber: number;
  gender: string;
  dob: Date;
  password: string;
}

const UserSchema = new Schema<IAdmin>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobNumber: { type: Number, default: null },
  dob: { type: Date, default: null },
  gender: { type: String, default: null },

  password: { type: String, required: true },
});

export default mongoose.model<IAdmin>("Admin", UserSchema);