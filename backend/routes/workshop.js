const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');

// @route   POST api/workshop
// @desc    Register a workshop
// @access  Public
router.post('/workshops', async (req, res) => {
  const {
    facultyMail, nameOfWorkshop, venue, started, ended, numberOfDays
  } = req.body;

  try {
    // Check if a workshop already exists with the same faculty mail and workshop name
    let workshop = await Workshop.findOne({ facultyMail, nameOfWorkshop });
    
    if (workshop) {
      return res.status(400).json({ msg: 'Workshop already exists' });
    }

    const newWorkshop = new Workshop({
      facultyMail,
      nameOfWorkshop,
      venue,
      started,
      ended,
      numberOfDays
    });

    workshop = await newWorkshop.save();
    res.json(workshop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/workshops
// @desc    Fetch all workshops
// @access  Public
router.get('/workshops', async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


  

// @route   GET api/workshop/:id
// @desc    Fetch a specific workshop by ID
// @access  Public
router.get('/workshops/:id', async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ msg: 'Workshop not found' });
    }
    res.json(workshop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/workshop/:id
// @desc    Edit a specific workshop by ID
// @access  Public
router.put('/workshops/:id', async (req, res) => {
  const {
    facultyMail, nameOfWorkshop, venue, started, ended, numberOfDays
  } = req.body;

  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ msg: 'Workshop not found' });
    }

    // Update workshop fields
    workshop.facultyMail = facultyMail || workshop.facultyMail;
    workshop.nameOfWorkshop = nameOfWorkshop || workshop.nameOfWorkshop;
    workshop.venue = venue || workshop.venue;
    workshop.started = started || workshop.started;
    workshop.ended = ended || workshop.ended;
    workshop.numberOfDays = numberOfDays || workshop.numberOfDays;

    await workshop.save();
    res.json(workshop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/workshop/:id
// @desc    Delete a specific workshop by ID
// @access  Public
router.delete('/workshops/:id', async (req, res) => {
    try {
      const result = await Workshop.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'Workshop not found' });
      }
  
      res.json({ msg: 'Workshop deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
