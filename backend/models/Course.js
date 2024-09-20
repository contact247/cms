// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    code: { type: String, required: true, unique: true }, // e.g., CS101
    credits: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Course', CourseSchema);
