import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema({
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
export default mongoose.model("Notification", NotificationSchema);
