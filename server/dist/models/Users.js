import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
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
export default mongoose.model("Patient", UserSchema);
