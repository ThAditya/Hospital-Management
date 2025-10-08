import mongoose, { Schema, Document } from "mongoose";

export interface IPharmacy extends Document {
  medicineName: string;
  genericName: string;
  category: string; // e.g., Antibiotic, Pain Relief, Vitamins
  dosage: string; // e.g., "500mg", "10mg/ml"
  form: string; // e.g., Tablet, Injection, Syrup
  manufacturer: string;
  price: number;
  stockQuantity: number;
  expiryDate: Date;
  prescriptionRequired: boolean;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PharmacySchema = new Schema<IPharmacy>({
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

export default mongoose.model<IPharmacy>("Pharmacy", PharmacySchema);
