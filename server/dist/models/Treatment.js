import mongoose, { Schema } from 'mongoose';
const TreatmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    treatmentName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    medications: [{
            type: String
        }],
    procedures: [{
            type: String
        }],
    notes: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed', 'cancelled'],
        default: 'ongoing'
    },
    followUpDate: {
        type: Date
    }
}, {
    timestamps: true
});
export default mongoose.model('Treatment', TreatmentSchema);
