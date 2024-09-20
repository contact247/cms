// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
