const mongoose = require('mongoose');

const FacultyProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  doj: { type: Date, required: true },
  address: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  salary: { type: Number, required: true },
  married: { type: Boolean, required: true },
});

module.exports = mongoose.model('FacultyProfile', FacultyProfileSchema);
