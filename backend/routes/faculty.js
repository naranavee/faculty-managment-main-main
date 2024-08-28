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
    // Check if a profile already exists
    let profile = await FacultyProfile.findOne();
    
    if (profile) {
      return res.status(400).json({ msg: 'Profile already exists' });
    }

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

    profile = await newProfile.save();
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
    const profile = await FacultyProfile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/faculty/profile
// @desc    Edit the faculty profile
// @access  Public
router.put('/profile', async (req, res) => {
  const {
    name, mobileNumber, gender, dob, doj,
    address, designation, department, qualification,
    salary, married
  } = req.body;

  try {
    const profile = await FacultyProfile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Update profile fields
    profile.name = name || profile.name;
    profile.mobileNumber = mobileNumber || profile.mobileNumber;
    profile.gender = gender || profile.gender;
    profile.dob = dob || profile.dob;
    profile.doj = doj || profile.doj;
    profile.address = address || profile.address;
    profile.designation = designation || profile.designation;
    profile.department = department || profile.department;
    profile.qualification = qualification || profile.qualification;
    profile.salary = salary || profile.salary;
    profile.married = married !== undefined ? married : profile.married;

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/faculty/profile
// @desc    Delete the faculty profile
// @access  Public
router.delete('/profile', async (req, res) => {
  try {
    const profile = await FacultyProfile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    await FacultyProfile.deleteOne(); // Remove the profile
    res.json({ msg: 'Profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
