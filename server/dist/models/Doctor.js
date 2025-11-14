import mongoose, { Schema } from "mongoose";
export var UserType;
(function (UserType) {
    UserType["Doctor"] = "doctor";
    UserType["Patient"] = "patient";
    UserType["Admin"] = "admin";
})(UserType || (UserType = {}));
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobNumber: { type: Number, default: null },
    NIC: { type: String, default: null },
    dob: { type: Date, default: null },
    gender: { type: String, default: null },
    specialty: { type: String, required: true, default: UserType.Doctor },
    experience: { type: String, required: true, default: UserType.Doctor },
    role: { type: String, required: true, default: UserType.Doctor },
    password: { type: String, required: true },
    address: { type: String, default: null },
});
export default mongoose.model("Doctor", UserSchema);
