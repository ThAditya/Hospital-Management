import mongoose, { Schema } from "mongoose";
const LabSchema = new Schema({
    testName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    preparationInstructions: { type: String, default: "" },
    estimatedDuration: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});
export default mongoose.model("Lab", LabSchema);
