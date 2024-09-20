// backend/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Student', StudentSchema);
