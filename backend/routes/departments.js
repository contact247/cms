// routes/departments.js
const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const auth = require('../middleware/auth');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

// @route   GET /departments
// @desc    Get all departments
// @access  Public or Protected (based on your auth setup)
router.get('/', async (req, res) => {
    try {
      const departments = await Department.find()
        .populate('head'); // Populate head details
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });

// @route   GET /departments/:id
// @desc    Get a single department by ID
// @access  Public or Protected
router.get('/:id', async (req, res) => {
    try {
      const department = await Department.findById(req.params.id)
        .populate('head');
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });

// @route   POST /departments
// @desc    Create a new department
// @access  Protected (e.g., Admin only)
router.post('/', async (req, res) => {
    const { name, head, description } = req.body;
  
    try {
      // Check if department already exists
      let department = await Department.findOne({ name });
      if (department) {
        return res.status(400).json({ error: 'Department already exists' });
      }
  
      // If head is provided, verify the faculty exists
      if (head) {
        const faculty = await Faculty.findById(head);
        if (!faculty) {
          return res.status(400).json({ error: 'Faculty head not found' });
        }
      }
  
      // Create new department
      department = new Department({
        name,
        head: head || null,
        description: description || '',
      });
  
      const savedDepartment = await department.save();
      const populatedDepartment = await Department.findById(savedDepartment._id).populate('head');
      res.status(201).json(populatedDepartment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// @route   PUT /departments/:id
// @desc    Update a department by ID
// @access  Protected (e.g., Admin only)
router.put('/:id',async (req, res) => {
    const { name, head, description } = req.body;
  
    try {
      let department = await Department.findById(req.params.id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      // If head is being updated, verify the faculty exists
      if (head) {
        const faculty = await Faculty.findById(head);
        if (!faculty) {
          return res.status(400).json({ error: 'Faculty head not found' });
        }
        department.head = head;
      }
  
      if (name) department.name = name;
      if (description) department.description = description;
  
      await department.save();
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });

// @route   DELETE /departments/:id
// @desc    Delete a department by ID
// @access  Protected (e.g., Admin only)
router.delete('/:id', async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      // Optional: Check if there are faculty or students linked to this department
      const facultyCount = await Faculty.countDocuments({ department: req.params.id });
      if (facultyCount > 0) {
        return res.status(400).json({ error: 'Cannot delete department with assigned faculty members' });
      }
  
      // Optional: Similarly, check for students linked to the department
      const studentCount = await Student.countDocuments({ department: req.params.id });
      if (studentCount > 0) {
        return res.status(400).json({ error: 'Cannot delete department with assigned students' });
      }
  
      await department.remove();
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });

module.exports = router;