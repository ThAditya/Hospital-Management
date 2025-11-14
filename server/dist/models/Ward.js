import mongoose, { Schema } from "mongoose";
const WardSchema = new Schema({
    wardName: { type: String, required: true },
    wardType: { type: String, required: true },
    totalBeds: { type: Number, required: true },
    availableBeds: { type: Number, required: true },
    floor: { type: Number, required: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});
export default mongoose.model("Ward", WardSchema);
