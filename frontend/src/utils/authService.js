const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, config.get('jwtSecret'), { expiresIn: '1h' });
};

// Register an Admin
const registerAdmin = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();
    return {
      id: admin._id,
      token: generateToken(admin._id),
    };
  } catch (error) {
    throw new Error('Error registering admin');
  }
};

// Register a Faculty
const registerFaculty = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const faculty = new Faculty({
      name,
      email,
      password: hashedPassword,
    });

    await faculty.save();
    return {
      id: faculty._id,
      token: generateToken(faculty._id),
    };
  } catch (error) {
    throw new Error('Error registering faculty');
  }
};

// Authenticate an Admin
const authenticateAdmin = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('Admin not found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      id: admin._id,
      token: generateToken(admin._id),
    };
  } catch (error) {
    throw new Error('Error authenticating admin');
  }
};

// Authenticate a Faculty
const authenticateFaculty = async (email, password) => {
  try {
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      throw new Error('Faculty not found');
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      id: faculty._id,
      token: generateToken(faculty._id),
    };
  } catch (error) {
    throw new Error('Error authenticating faculty');
  }
};

module.exports = {
  registerAdmin,
  registerFaculty,
  authenticateAdmin,
  authenticateFaculty,
};
