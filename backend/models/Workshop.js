const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
    facultyMail: {
        type: String,
        required: true,
    },
    nameOfWorkshop: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    started: {
        type: Date,
        required: true,
    },
    ended: {
        type: Date,
        required: true,
    },
    numberOfDays: {
        type: Number,
        required: true,
    },
    approved: {
        type: String,
        default: 'No',
        enum: ['Yes', 'No'],
    },
});

module.exports = mongoose.model('Workshop', WorkshopSchema);
