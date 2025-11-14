import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobNumber: { type: Number, default: null },
    dob: { type: Date, default: null },
    gender: { type: String, default: null },
    password: { type: String, required: true },
});
export default mongoose.model("Admin", UserSchema);
