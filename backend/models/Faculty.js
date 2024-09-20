// backend/models/Faculty.js
const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    position: { type: String, required: true }, // e.g., Lecturer, Professor
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Faculty', FacultySchema);
