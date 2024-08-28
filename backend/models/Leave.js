const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
    enum: ['Personal', 'Sick'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Leave', LeaveSchema);
