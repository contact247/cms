const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' , default: null}, // Reference to Faculty who is the head
    description: { type: String , default: ""},
    createdAt: { type: Date, default: Date.now },
  });
  
const Department = mongoose.model('Department', DepartmentSchema);
  
module.exports = Department;