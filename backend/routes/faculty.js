// backend/routes/faculty.js
const express = require('express');
const auth = require('../middleware/auth');
const Faculty = require('../models/Faculty');

const router = express.Router();

// @route   GET api/faculty
// @desc    Get all faculty
// @access  Private (Admin)
router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find()
      .populate('department')
      .populate('courses');
    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/faculty
// @desc    Add a new faculty
// @access  Private (Admin)
router.post('/', async (req, res) => {
  const { firstName, lastName, email, contact, department, courses, position } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !contact || !department || !position) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Please provide a valid email address' });
  }

  try {
    let faculty = await Faculty.findOne({ email });
    if (faculty) {
      return res.status(400).json({ msg: 'Faculty already exists' });
    }

    faculty = new Faculty({
      firstName,
      lastName,
      email,
      contact,
      department,
      courses,
      position
    });

    const savedFaculty = await faculty.save();
    const populatedFaculty = await Faculty.findById(savedFaculty._id).populate('department').populate('courses');
    res.json(populatedFaculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/faculty/:id
// @desc    Get faculty by ID
// @access  Private (Admin)
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate('department')
      .populate('courses');
    if (!faculty) {
      return res.status(404).json({ msg: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Faculty not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/faculty/:id
// @desc    Update a faculty
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, contact, department, courses, position } = req.body;
  

  const facultyFields = {};
  if (firstName) facultyFields.firstName = firstName;
  if (lastName) facultyFields.lastName = lastName;
  if (email) facultyFields.email = email;
  if (contact) facultyFields.contact = contact;
  if (department) facultyFields.department = department;
  if (courses) facultyFields.courses = courses;
  if (position) facultyFields.position = position;

  try {
    let faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ msg: 'Faculty not found' });
    }

    faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: facultyFields },
      { new: true }
    );
    const populatedFaculty = await Faculty.findById(faculty._id).populate('department').populate('courses');
    res.json(populatedFaculty);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Faculty not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/faculty/:id
// @desc    Delete a faculty
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ msg: 'Faculty not found' });
    }

    await faculty.remove();
    res.json({ msg: 'Faculty removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Faculty not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
