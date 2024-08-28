const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');

// @route   POST api/workshop
// @desc    Register a workshop
// @access  Public
router.post('/workshop', async (req, res) => {
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

// @route   GET api/workshop
// @desc    Fetch the workshop details
// @access  Public
router.get('/workshop', async (req, res) => {
  try {
    const workshop = await Workshop.findOne(); // You might want to adjust this query if you want to support multiple workshops
    if (!workshop) {
      return res.status(404).json({ msg: 'Workshop not found' });
    }
    res.json(workshop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/workshop
// @desc    Edit the workshop details
// @access  Public
router.put('/workshop', async (req, res) => {
  const {
    facultyMail, nameOfWorkshop, venue, started, ended, numberOfDays
  } = req.body;

  try {
    const workshop = await Workshop.findOne({ facultyMail, nameOfWorkshop });
    if (!workshop) {
      return res.status(404).json({ msg: 'Workshop not found' });
    }

    // Update workshop fields
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

// @route   DELETE api/workshop
// @desc    Delete a workshop
// @access  Public
router.delete('/workshop', async (req, res) => {
    try {
      await Workshop.deleteMany(); // Remove all workshops
      res.json({ msg: 'All workshops deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
