import mongoose, { Schema, Document } from "mongoose";

export interface IWard extends Document {
  wardName: string;
  wardType: string; // e.g., General, ICU, Maternity
  totalBeds: number;
  availableBeds: number;
  floor: number;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WardSchema = new Schema<IWard>({
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

export default mongoose.model<IWard>("Ward", WardSchema);
