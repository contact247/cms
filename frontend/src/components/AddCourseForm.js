import React, { useState } from 'react';
import { apiFetch } from '../api';

export default function AddCourseForm({ departments, faculty, students, onCourseAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    faculty: '',
    code: '',
    credits: '',
    department: '',
    students: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleStudentsChange = (e) => {
    const selectedStudents = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      students: selectedStudents
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      onCourseAdded(response);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        faculty: '',
        code: '',
        credits: '',
        department: '',
        students: []
      });
    } catch (error) {
      console.error('Error adding course:', error);
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
    zIndex: 1000,
    maxHeight: '80vh',
    overflowY: 'auto'
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
      <button onClick={() => setShowForm(true)} style={buttonStyle}>+ Add Course</button>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px' }}>Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            style={{...inputStyle, height: '100px'}}
          />
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Faculty</option>
            {faculty.map((member) => (
              <option key={member._id} value={member._id}>
                {`${member.firstName} ${member.lastName}`}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            value={formData.code}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={formData.credits}
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
            name="students"
            multiple
            value={formData.students}
            onChange={handleStudentsChange}
            style={{...inputStyle, height: '100px'}}
          >
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {`${student.firstName} ${student.lastName}`}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button type="submit" style={buttonStyle}>Add Course</button>
            <button type="button" onClick={() => setShowForm(false)} style={{...buttonStyle, backgroundColor: '#9ca3af'}}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}