const Car = require('../models/Car');

// Get all cars with optional filters
exports.getAllCars = async (req, res) => {
  try {
    const { 
      brand, 
      model, 
      minPrice, 
      maxPrice, 
      minYear, 
      maxYear, 
      bodyType, 
      fuelType, 
      transmission,
      sort 
    } = req.query;

    const filter = {};
    
    // Apply filters if provided
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (model) filter.model = { $regex: model, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }
    if (bodyType) filter.bodyType = bodyType;
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;

    // Define sort options
    const sortOptions = {};
    if (sort) {
      const [field, direction] = sort.split(':');
      sortOptions[field] = direction === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;  // Default sort by newest
    }

    const cars = await Car.find(filter).sort(sortOptions);
    res.status(200).json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Create a new car listing
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({ success: true, data: car });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update car by ID
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get car recommendations based on user preferences
exports.getRecommendations = async (req, res) => {
  try {
    const { preferences } = req.body;
    
    // Construct filter based on user preferences
    const filter = {};
    
    if (preferences.brands && preferences.brands.length > 0) {
      filter.brand = { $in: preferences.brands };
    }
    
    if (preferences.bodyTypes && preferences.bodyTypes.length > 0) {
      filter.bodyType = { $in: preferences.bodyTypes };
    }
    
    if (preferences.budget) {
      filter.price = { $lte: Number(preferences.budget) };
    }
    
    if (preferences.fuelTypes && preferences.fuelTypes.length > 0) {
      filter.fuelType = { $in: preferences.fuelTypes };
    }

    // Find matching cars
    const recommendedCars = await Car.find(filter).limit(5);
    
    res.status(200).json({ success: true, count: recommendedCars.length, data: recommendedCars });
  } catch (error) {
    console.error('Error getting car recommendations:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Search cars by text query
exports.searchCars = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ success: false, error: 'Search query is required' });
    }
    
    const cars = await Car.find({
      $or: [
        { brand: { $regex: query, $options: 'i' } },
        { model: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.status(200).json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    console.error('Error searching cars:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};