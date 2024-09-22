import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export default function EditStudentForm({ student, departments, courses, onStudentUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    department: '',
    courses: []
  });

  useEffect(() => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      contact: student.contact,
      department: student.department._id,
      courses: student.courses.map(course => course._id)
    });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCoursesChange = (e) => {
    const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      courses: selectedCourses
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch(`/api/students/${student._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      onStudentUpdated(response);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="tel"
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
      <select
        name="courses"
        multiple
        value={formData.courses}
        onChange={handleCoursesChange}
        style={{...inputStyle, height: '100px'}}
      >
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button type="submit" style={buttonStyle}>Update Student</button>
        <button type="button" onClick={onCancel} style={{...buttonStyle, backgroundColor: '#9ca3af'}}>Cancel</button>
      </div>
    </form>
  );
}