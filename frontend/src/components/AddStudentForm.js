import React, { useState } from 'react';
import { apiFetch } from '../api';

export default function AddStudentForm({ departments, courses, onStudentAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    department: '',
    courses: []
  });

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
      const response = await apiFetch('/api/students', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      onStudentAdded(response);
      setShowForm(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        department: '',
        courses: []
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const formStyle = {
    display: showForm ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
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
    <>
      <button onClick={() => setShowForm(true)} style={buttonStyle}>+ Add Student</button>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px' }}>Add New Student</h2>
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
            <option value="">Select a department</option>
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
            <button type="submit" style={buttonStyle}>Add Student</button>
            <button type="button" onClick={() => setShowForm(false)} style={{...buttonStyle, backgroundColor: '#9ca3af'}}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}