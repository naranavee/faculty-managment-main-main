const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave'); // Ensure this model is correctly set up

// @route   POST api/faculty/leave
// @desc    Apply for leave
// @access  Public
router.post('/leave', async (req, res) => {
  const { leaveType, startDate, endDate, description } = req.body;

  try {
    // Check if a leave request already exists within the specified date range
    let leave = await Leave.findOne({
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    if (leave) {
      return res.status(400).json({ msg: 'A leave request already exists for the specified date range' });
    }

    const newLeave = new Leave({
      leaveType,
      startDate,
      endDate,
      description
    });

    leave = await newLeave.save();
    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/faculty/leave
// @desc    Fetch all leave details
// @access  Public
router.get('/leave', async (req, res) => {
  try {
    const leave = await Leave.find();
    if (!leave || leave.length === 0) {
      return res.status(404).json({ msg: 'No leave requests found' });
    }
    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/faculty/leave/:id
// @desc    Edit the leave details
// @access  Public
router.put('/leave/:id', async (req, res) => {
  const { leaveType, startDate, endDate, description, approved } = req.body;

  try {
    let leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ msg: 'Leave not found' });
    }

    // Update leave fields
    leave.leaveType = leaveType || leave.leaveType;
    leave.startDate = startDate || leave.startDate;
    leave.endDate = endDate || leave.endDate;
    leave.description = description || leave.description;
    if (approved !== undefined) { // Only update if provided
      leave.approved = approved;
    }

    await leave.save();
    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/faculty/leave/:id
// @desc    Delete the leave details
// @access  Public
router.delete('/leave/:id', async (req, res) => {
  try {
    let leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ msg: 'Leave not found' });
    }

    await Leave.findByIdAndDelete(req.params.id); // Remove the leave
    res.json({ msg: 'Leave deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
