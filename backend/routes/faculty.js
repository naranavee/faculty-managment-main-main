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

// @route   GET api/faculty/profiles
// @desc    Fetch all faculty profiles
// @access  Public
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await FacultyProfile.find();
    if (!profiles.length) {
      return res.status(404).json({ msg: 'No profiles found' });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/faculty/profile/:id
// @desc    Fetch a specific faculty profile by ID
// @access  Public
router.get('/profile/:id', async (req, res) => {
  try {
    const profile = await FacultyProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/faculty/profile/:id
// @desc    Edit a faculty profile by ID
// @access  Public
router.put('/profile/:id', async (req, res) => {
  const {
    name, mobileNumber, gender, dob, doj,
    address, designation, department, qualification,
    salary, married
  } = req.body;

  try {
    let profile = await FacultyProfile.findById(req.params.id);
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
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/faculty/profile/:id
// @desc    Delete a faculty profile by ID
// @access  Public
// @route   DELETE api/faculty/profile/:id
// @desc    Delete a faculty profile by ID
// @access  Public
router.delete('/profile/:id', async (req, res) => {
  try {
    // Find and remove the profile by ID
    const profile = await FacultyProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    await FacultyProfile.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    res.json({ msg: 'Profile deleted' });
  } catch (err) {
    console.error('Error in DELETE /profile/:id', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
