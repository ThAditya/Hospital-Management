import mongoose, { Schema } from "mongoose";
const AppointmentSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
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
export default mongoose.model("Appointment", AppointmentSchema);
