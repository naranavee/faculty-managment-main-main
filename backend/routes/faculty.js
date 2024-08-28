const express = require('express');
const router = express.Router();
const FacultyProfile = require('../models/FacultyProfile');

// @route   POST api/faculty/profile
// @desc    Register a faculty profile
// @access  Public
router.post('/profile', async (req, res) => {
  const {
    name, mobileNumber, gender, dob, doj,
    address, designation, department, qualification,
    salary, married
  } = req.body;

  try {
    const newProfile = new FacultyProfile({
      name,
      mobileNumber,
      gender,
      dob,
      doj,
      address,
      designation,
      department,
      qualification,
      salary,
      married
    });

    const profile = await newProfile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/faculty/profile
// @desc    Fetch the faculty profile
// @access  Public
router.get('/profile', async (req, res) => {
  try {
    // Assuming there is only one profile per faculty, you might want to adjust this if you have multiple profiles or use a query parameter
    const profile = await FacultyProfile.findOne(); // Adjust as needed for fetching specific profile
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
