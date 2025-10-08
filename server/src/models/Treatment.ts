import mongoose, { Document, Schema } from 'mongoose';

export interface ITreatment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  treatmentName: string;
  description: string;
  diagnosis: string;
  medications: string[];
  procedures: string[];
  notes: string;
  startDate: Date;
  endDate?: Date;
  status: 'ongoing' | 'completed' | 'cancelled';
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TreatmentSchema: Schema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
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

export default mongoose.model<ITreatment>('Treatment', TreatmentSchema);
