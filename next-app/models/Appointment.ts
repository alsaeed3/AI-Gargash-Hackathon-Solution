import mongoose, { Schema, Document } from 'mongoose';

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
}

export interface IAppointment extends Document {
  userId?: mongoose.Types.ObjectId;
  carId?: mongoose.Types.ObjectId;
  appointmentType: 'test-drive' | 'service' | 'consultation';
  appointmentDate: Date;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  contactDetails: ContactDetails;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  appointmentType: {
    type: String,
    required: [true, 'Please specify appointment type'],
    enum: ['test-drive', 'service', 'consultation']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please specify appointment date and time']
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: {
    type: String
  },
  contactDetails: {
    name: {
      type: String,
      required: [true, 'Please provide contact name']
    },
    email: {
      type: String,
      required: [true, 'Please provide contact email'],
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please provide contact phone']
    }
  }
}, {
  timestamps: true
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);