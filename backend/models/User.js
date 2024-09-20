// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'faculty'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, refPath: 'role' }, // Links to Student or Faculty
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
