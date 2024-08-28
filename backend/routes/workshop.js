const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop'); // Make sure to create this model

// @route   POST api/faculty/workshop
// @desc    Register a workshop
// @access  Public
router.post('/workshop', async (req, res) => {
  const { facultyMail, workshopName, venue, started, ended, numberOfDays } = req.body;

  try {
    const newWorkshop = new Workshop({
      facultyMail,
      workshopName,
      venue,
      started,
      ended,
      numberOfDays,
    });

    const workshop = await newWorkshop.save();
    res.json(workshop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
