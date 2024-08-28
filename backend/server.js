const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/faculty', require('./routes/workshop'));
app.use('/api/faculty', require('./routes/leave'));  // Add this line for workshop routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
