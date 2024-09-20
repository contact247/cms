// backend/routes/faculty.js
const express = require('express');
const auth = require('../middleware/auth');
const Faculty = require('../models/Faculty');

const router = express.Router();

// @route   GET api/faculty
// @desc    Get all faculty
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const faculty = await Faculty.find().populate('courses');
    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/faculty
// @desc    Add a new faculty
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { name, email, contact, courses } = req.body;

  try {
    let faculty = await Faculty.findOne({ email });
    if (faculty) {
      return res.status(400).json({ msg: 'Faculty already exists' });
    }

    faculty = new Faculty({
      name,
      email,
      contact,
      courses,
    });

    await faculty.save();
    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/faculty/:id
// @desc    Get faculty by ID
// @access  Private (Admin)
router.get('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const faculty = await Faculty.findById(req.params.id).populate('courses');
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
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { name, email, contact, courses } = req.body;

  const facultyFields = {};
  if (name) facultyFields.name = name;
  if (email) facultyFields.email = email;
  if (contact) facultyFields.contact = contact;
  if (courses) facultyFields.courses = courses;

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

    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/faculty/:id
// @desc    Delete a faculty
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }

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
