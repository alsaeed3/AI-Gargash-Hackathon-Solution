const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

// GET /api/appointments - Get all appointments with optional filters
router.get('/', appointmentController.getAppointments);

// GET /api/appointments/available-slots - Get available time slots for test drives
router.get('/available-slots', appointmentController.getAvailableSlots);

// GET /api/appointments/:id - Get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// POST /api/appointments - Create a new appointment
router.post('/', appointmentController.createAppointment);

// PUT /api/appointments/:id - Update appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// DELETE /api/appointments/:id - Cancel/delete appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;