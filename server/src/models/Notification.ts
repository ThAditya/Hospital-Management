import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  recipientId: mongoose.Types.ObjectId; // User ID (Doctor, Patient, Admin)
  recipientRole: 'doctor' | 'patient' | 'admin';
  type: 'treatment_schedule' | 'medicine_low_stock' | 'ward_issue' | 'appointment_reminder' | 'treatment_approved';
  message: string;
  isRead: boolean;
  relatedId?: mongoose.Types.ObjectId; // ID of related entity (treatment, medicine, ward, etc.)
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipientId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  recipientRole: {
    type: String,
    enum: ['doctor', 'patient', 'admin'],
    required: true
  },
  type: {
    type: String,
    enum: ['treatment_schedule', 'medicine_low_stock', 'ward_issue', 'appointment_reminder', 'treatment_approved'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  relatedId: {
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true
});

export default mongoose.model<INotification>("Notification", NotificationSchema);
