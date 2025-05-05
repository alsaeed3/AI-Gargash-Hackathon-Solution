const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

// GET /api/cars - Get all cars with optional filters
router.get('/', carController.getAllCars);

// GET /api/cars/search - Search cars by query
router.get('/search', carController.searchCars);

// GET /api/cars/:id - Get car by ID
router.get('/:id', carController.getCarById);

// POST /api/cars/recommendations - Get car recommendations based on preferences
router.post('/recommendations', carController.getRecommendations);

// POST /api/cars - Create a new car listing
router.post('/', carController.createCar);

// PUT /api/cars/:id - Update car by ID
router.put('/:id', carController.updateCar);

// DELETE /api/cars/:id - Delete car by ID
router.delete('/:id', carController.deleteCar);

module.exports = router;