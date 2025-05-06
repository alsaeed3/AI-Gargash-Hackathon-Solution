const Appointment = require('../models/Appointment');
const Car = require('../models/Car');

// Get all appointments with optional filters
exports.getAppointments = async (req, res) => {
  try {
    const { 
      userId, 
      carId, 
      status,
      type,
      startDate,
      endDate,
      sort 
    } = req.query;

    const filter = {};
    
    // Apply filters if provided
    if (userId) filter.userId = userId;
    if (carId) filter.carId = carId;
    if (status) filter.status = status;
    if (type) filter.appointmentType = type;
    
    // Date range filter
    if (startDate || endDate) {
      filter.appointmentDate = {};
      if (startDate) filter.appointmentDate.$gte = new Date(startDate);
      if (endDate) filter.appointmentDate.$lte = new Date(endDate);
    }

    // Define sort options
    const sortOptions = {};
    if (sort) {
      const [field, direction] = sort.split(':');
      sortOptions[field] = direction === 'desc' ? -1 : 1;
    } else {
      sortOptions.appointmentDate = 1;  // Default sort by date ascending
    }

    const appointments = await Appointment.find(filter)
      .sort(sortOptions)
      .populate('carId', 'brand model year imageUrl');
      
    res.status(200).json({ 
      success: true, 
      count: appointments.length, 
      data: appointments 
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('carId', 'brand model year imageUrl price')
      .populate('userId', 'name email phone');
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error fetching appointment by ID:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Create a new appointment (test drive, service, etc.)
exports.createAppointment = async (req, res) => {
  try {
    const {
      userId,
      carId,
      appointmentType,
      appointmentDate,
      notes,
      contactDetails
    } = req.body;

    // Validate required fields
    if (!appointmentType || !appointmentDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'Appointment type and date are required' 
      });
    }

    // For test drives, validate car exists
    if (appointmentType === 'test-drive' && carId) {
      const carExists = await Car.findById(carId);
      if (!carExists) {
        return res.status(400).json({ 
          success: false, 
          error: 'Selected car does not exist' 
        });
      }
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId,
      carId,
      appointmentType,
      appointmentDate: new Date(appointmentDate),
      notes,
      contactDetails,
      status: 'scheduled'
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update appointment by ID
exports.updateAppointment = async (req, res) => {
  try {
    const { status, appointmentDate, notes } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status, appointmentDate, notes },
      {
        new: true,
        runValidators: true
      }
    ).populate('carId', 'brand model year imageUrl');
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Cancel/delete appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get available time slots for test drives
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date, carId } = req.query;
    
    if (!date) {
      return res.status(400).json({ success: false, error: 'Date is required' });
    }
    
    const selectedDate = new Date(date);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Find all appointments for the selected car on the selected date
    const filter = {
      appointmentDate: {
        $gte: selectedDate,
        $lt: nextDay
      },
      appointmentType: 'test-drive'
    };
    
    if (carId) {
      filter.carId = carId;
    }
    
    const existingAppointments = await Appointment.find(filter);
    
    // Define available time slots (9:00 AM to 6:00 PM, each 1 hour)
    const availableSlots = [];
    const bookedTimes = existingAppointments.map(app => app.appointmentDate.getHours());
    
    for (let hour = 9; hour <= 18; hour++) {
      // Check if this hour is already booked
      if (!bookedTimes.includes(hour)) {
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hour, 0, 0, 0);
        availableSlots.push({
          time: slotTime,
          formatted: `${hour}:00${hour >= 12 ? ' PM' : ' AM'}`
        });
      }
    }
    
    res.status(200).json({ 
      success: true, 
      date: selectedDate,
      count: availableSlots.length, 
      data: availableSlots 
    });
  } catch (error) {
    console.error('Error getting available time slots:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};