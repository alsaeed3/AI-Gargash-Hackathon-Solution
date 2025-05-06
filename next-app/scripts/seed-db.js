// Database seeder script for MongoDB
require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gargash-cars')
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define schemas directly in the seeder to avoid TypeScript import issues
const CarSchema = new mongoose.Schema({
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

const UserSchema = new mongoose.Schema({
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

// Use these schemas to create models
const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Sample car data
const cars = [
  {
    brand: "BMW",
    model: "7 Series",
    year: 2023,
    price: 85000,
    bodyType: "sedan",
    fuelType: "hybrid",
    transmission: "automatic",
    color: "Black",
    mileage: 0,
    engineCapacity: 3.0,
    horsepower: 375,
    features: ["Leather seats", "Navigation system", "Premium sound system", "Parking assist", "Lane departure warning"],
    description: "Experience the ultimate luxury with the BMW 7 Series. This flagship sedan combines elegant design with cutting-edge technology and powerful performance.",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop"
    ],
    availability: true,
    popularityScore: 8
  },
  {
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    price: 95000,
    bodyType: "sedan",
    fuelType: "hybrid",
    transmission: "automatic",
    color: "Silver",
    mileage: 0,
    engineCapacity: 3.0,
    horsepower: 429,
    features: ["Heated seats", "360-degree camera", "Adaptive cruise control", "Massage seats", "Ambient lighting"],
    description: "The Mercedes-Benz S-Class is the pinnacle of luxury automotive engineering, offering unparalleled comfort, technology, and prestige.",
    imageUrl: "https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?q=80&w=1000&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop"
    ],
    availability: true,
    popularityScore: 9
  },
  {
    brand: "Porsche",
    model: "Cayenne",
    year: 2023,
    price: 75000,
    bodyType: "suv",
    fuelType: "gasoline",
    transmission: "automatic",
    color: "White",
    mileage: 0,
    engineCapacity: 3.0,
    horsepower: 335,
    features: ["Sport seats", "Panoramic roof", "Adaptive air suspension", "Sport Chrono package", "BOSE sound system"],
    description: "The Porsche Cayenne combines sports car performance with SUV versatility, delivering an exhilarating driving experience with everyday practicality.",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-8f7b1b1dbe0a?q=80&w=1000&auto=format&fit=crop"
    ],
    availability: true,
    popularityScore: 7
  },
  {
    brand: "Audi",
    model: "A8",
    year: 2023,
    price: 88000,
    bodyType: "sedan",
    fuelType: "hybrid",
    transmission: "automatic",
    color: "Gray",
    mileage: 0,
    engineCapacity: 3.0,
    horsepower: 335,
    features: ["Valcona leather", "Head-up display", "Matrix LED headlights", "Adaptive air suspension", "Bang & Olufsen sound system"],
    description: "The Audi A8 represents the pinnacle of Audi's technological capabilities and luxury features, delivering a refined driving experience with German engineering excellence.",
    imageUrl: "https://images.unsplash.com/photo-1606664608504-8b0369dc1c0e?q=80&w=1000&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop"
    ],
    availability: true,
    popularityScore: 7
  },
  {
    brand: "Lexus",
    model: "RX 450h",
    year: 2023,
    price: 65000,
    bodyType: "suv",
    fuelType: "hybrid",
    transmission: "cvt",
    color: "Blue",
    mileage: 0,
    engineCapacity: 3.5,
    horsepower: 308,
    features: ["Semi-aniline leather", "Mark Levinson audio", "Panoramic view monitor", "Power rear door", "Wireless charger"],
    description: "The Lexus RX 450h combines luxury with efficiency through its advanced hybrid powertrain, providing a smooth and refined driving experience.",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558377235-b95f0e83d6b8?q=80&w=1000&auto=format&fit=crop"
    ],
    availability: true,
    popularityScore: 6
  },
  {
    brand: "Tesla",
    model: "Model S",
    year: 2023,
    price: 89990,
    bodyType: "sedan",
    fuelType: "electric",
    transmission: "automatic",
    color: "Red",
    mileage: 0,
    engineCapacity: 0,
    horsepower: 670,
    features: ["Autopilot", "Glass roof", "17-inch touchscreen", "HEPA air filtration", "Wireless charging"],
    description: "The Tesla Model S is an all-electric luxury sedan with incredible performance, advanced technology, and zero emissions.",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1553260168-69b041873e65?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561580125-028ee3d62102?q=80&w=1000&auto=format&fit=crop"
    ],
    availability: true,
    popularityScore: 9
  }
];

// Sample user data
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-123-4567",
    preferences: {
      brands: ["BMW", "Mercedes-Benz"],
      bodyTypes: ["sedan", "suv"],
      priceRange: { min: 50000, max: 100000 },
      fuelTypes: ["hybrid", "electric"],
      features: ["Leather seats", "Navigation system"]
    }
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-987-6543",
    preferences: {
      brands: ["Audi", "Lexus"],
      bodyTypes: ["suv"],
      priceRange: { min: 60000, max: 90000 },
      fuelTypes: ["gasoline", "hybrid"],
      features: ["Panoramic roof", "Premium sound system"]
    }
  }
];

// Seed database
async function seedDatabase() {
  try {
    // Clear existing data
    await Car.deleteMany({});
    await User.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Insert new data
    const createdCars = await Car.insertMany(cars);
    const createdUsers = await User.insertMany(users);
    
    console.log(`Database seeded with ${createdCars.length} cars and ${createdUsers.length} users`);
    
    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();