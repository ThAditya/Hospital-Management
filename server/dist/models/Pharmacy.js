import mongoose, { Schema } from "mongoose";
const PharmacySchema = new Schema({
    medicineName: { type: String, required: true },
    genericName: { type: String, required: true },
    category: { type: String, required: true },
    dosage: { type: String, required: true },
    form: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    expiryDate: { type: Date, required: true },
    prescriptionRequired: { type: Boolean, default: false },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});
export default mongoose.model("Pharmacy", PharmacySchema);
