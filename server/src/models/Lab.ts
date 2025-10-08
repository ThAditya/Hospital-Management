import mongoose, { Schema, Document } from "mongoose";

export interface ILab extends Document {
  testName: string;
  description: string;
  category: string; // e.g., Blood Test, Radiology, Pathology
  price: number;
  preparationInstructions: string;
  estimatedDuration: string; // e.g., "30 minutes", "2 hours"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LabSchema = new Schema<ILab>({
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

export default mongoose.model<ILab>("Lab", LabSchema);
