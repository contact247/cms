// backend/routes/courses.js
const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/Course');

const router = express.Router();
// @route   GET api/courses
// @desc    Get all courses
// @access  Private (Admin)
router.get('/', async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ msg: 'Access denied' });
  // }

  try {
    const courses = await Course.find()
      .populate('department')
      .populate('faculty')
      .populate('students');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses
// @desc    Add a new course
// @access  Private (Admin)
router.post('/', async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ msg: 'Access denied' });
  // }

  const { code, title, description, credits, department, faculty, students } = req.body;

  try {
    let course = new Course({
      code,
      title,
      description,
      credits,
      department,
      faculty,
      students,
    });

    const savedCourse = await course.save();
    const populatedCourse = await Course.findById(savedCourse._id).populate('department').populate('faculty').populate('students');
    res.status(201).json(populatedCourse);  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Private (Admin)
router.get('/:id', async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ msg: 'Access denied' });
  // }

  try {
    const course = await Course.findById(req.params.id)
      .populate('department')
      .populate('faculty')
      .populate('students');
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ msg: 'Access denied' });
  // }

  const { code, title, description, credits, department, faculty, students } = req.body;

  const courseFields = {};
  if (code) courseFields.code = code;
  if (title) courseFields.title = title;
  if (description) courseFields.description = description;
  if (credits) courseFields.credits = credits;
  if (department) courseFields.department = department;
  if (faculty) courseFields.faculty = faculty;
  if (students) courseFields.students = students;

  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: courseFields },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ msg: 'Access denied' });
  // }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    await course.remove();
    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;


