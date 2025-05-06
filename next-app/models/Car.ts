import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  brand: string;
  model: string;
  year: number;
  price: number;
  bodyType: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'convertible' | 'wagon' | 'van' | 'truck' | 'luxury';
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'plug-in hybrid';
  transmission: 'automatic' | 'manual' | 'semi-automatic' | 'cvt';
  color: string;
  mileage: number;
  engineCapacity: number;
  horsepower?: number;
  features: string[];
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  availability: boolean;
  popularityScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema<ICar>({
  brand: {
    type: String,
    required: [true, 'Please provide car brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide car model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide car year'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  price: {
    type: Number,
    required: [true, 'Please provide car price'],
    min: [0, 'Price cannot be negative']
  },
  bodyType: {
    type: String,
    required: [true, 'Please provide body type'],
    enum: ['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon', 'van', 'truck', 'luxury']
  },
  fuelType: {
    type: String,
    required: [true, 'Please provide fuel type'],
    enum: ['gasoline', 'diesel', 'hybrid', 'electric', 'plug-in hybrid']
  },
  transmission: {
    type: String,
    required: [true, 'Please provide transmission type'],
    enum: ['automatic', 'manual', 'semi-automatic', 'cvt']
  },
  color: {
    type: String,
    required: [true, 'Please provide car color']
  },
  mileage: {
    type: Number,
    default: 0
  },
  engineCapacity: {
    type: Number,
    required: [true, 'Please provide engine capacity']
  },
  horsepower: {
    type: Number
  },
  features: {
    type: [String]
  },
  description: {
    type: String,
    required: [true, 'Please provide car description']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide car image']
  },
  additionalImages: {
    type: [String]
  },
  availability: {
    type: Boolean,
    default: true
  },
  popularityScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add text index for search functionality
CarSchema.index({ brand: 'text', model: 'text', description: 'text' });

// Check if the model exists before defining it to prevent overwriting
export default mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);