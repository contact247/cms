// backend/routes/students.js
const express = require('express');
const auth = require('../middleware/auth');
const Student = require('../models/Student');

const router = express.Router();

// @route   GET api/students
// @desc    Get all students
// @access  Private (Admin)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
      .populate('department')
      .populate('courses');
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/students
// @desc    Add a new student
// @access  Private (Admin)
router.post('/', async (req, res) => {
  const { firstName, lastName, email, contact, department, courses } = req.body;


  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    student = new Student({
      firstName,
      lastName,
      email,
      contact,
      department,
      courses,
    });

    const savedStudent = await student.save();
    const populatedStudent = await Student.findById(savedStudent._id).populate('department').populate('courses');
    res.json(populatedStudent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/students/:id
// @desc    Get student by ID
// @access  Private (Admin)
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('department')
      .populate('courses');
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/students/:id
// @desc    Update a student
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, contact, department, courses } = req.body;

  const studentFields = {};
  if (firstName) studentFields.firstName = firstName;
  if (lastName) studentFields.lastName = lastName;
  if (email) studentFields.email = email;
  if (contact) studentFields.contact = contact;
  if (department) studentFields.department = department;
  if (courses) studentFields.courses = courses;

  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );
    const populatedStudent = await Student.findById(student._id).populate('department').populate('courses'); 
    res.json(populatedStudent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/students/:id
// @desc    Delete a student
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Student removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server error');
  }
});


module.exports = router;
