import mongoose, { Schema, Document } from 'mongoose';

interface PriceRange {
  min?: number;
  max?: number;
}

interface InteractionHistory {
  type: 'car-view' | 'test-drive' | 'query' | 'purchase';
  itemId: string;
  timestamp: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  preferences: {
    brands?: string[];
    bodyTypes?: string[];
    priceRange?: PriceRange;
    fuelTypes?: string[];
    features?: string[];
  };
  interactionHistory?: InteractionHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String
  },
  preferences: {
    brands: [String],
    bodyTypes: [String],
    priceRange: {
      min: Number,
      max: Number
    },
    fuelTypes: [String],
    features: [String]
  },
  interactionHistory: [{
    type: {
      type: String,
      enum: ['car-view', 'test-drive', 'query', 'purchase']
    },
    itemId: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);