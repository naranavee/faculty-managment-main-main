const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave'); // Adjusted to use 'Leave' instead of 'LeaveRequest'

// @route   POST api/faculty/leave
// @desc    Apply for leave
// @access  Public
router.post('/leave', async (req, res) => {
  const { leaveType, startDate, endDate, description } = req.body;

  try {
    // Check if a leave request already exists
    let leave = await Leave.findOne();

    if (leave) {
      return res.status(400).json({ msg: 'Leave already exists' });
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
// @desc    Fetch the leave details
// @access  Public
router.get('/leave', async (req, res) => {
  try {
    const leave = await Leave.findOne();
    if (!leave) {
      return res.status(404).json({ msg: 'Leave not found' });
    }
    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/faculty/leave
// @desc    Edit the leave details
// @access  Public
router.put('/leave', async (req, res) => {
  const { leaveType, startDate, endDate, description } = req.body;

  try {
    const leave = await Leave.findOne();
    if (!leave) {
      return res.status(404).json({ msg: 'Leave not found' });
    }

    // Update leave fields
    leave.leaveType = leaveType || leave.leaveType;
    leave.startDate = startDate || leave.startDate;
    leave.endDate = endDate || leave.endDate;
    leave.description = description || leave.description;

    await leave.save();
    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/faculty/leave
// @desc    Delete the leave details
// @access  Public
router.delete('/leave', async (req, res) => {
  try {
    const leave = await Leave.findOne();
    if (!leave) {
      return res.status(404).json({ msg: 'Leave not found' });
    }

    await Leave.deleteOne(); // Remove the leave
    res.json({ msg: 'Leave deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
