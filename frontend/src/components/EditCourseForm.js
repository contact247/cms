import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export default function EditCourseForm({ course, departments, faculty, students, onCourseUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    faculty: '',
    code: '',
    credits: '',
    department: '',
    students: []
  });

  useEffect(() => {
    setFormData({
      title: course.title,
      description: course.description,
      faculty: course.faculty ? course.faculty._id : '',
      code: course.code,
      credits: course.credits,
      department: course.department._id,
      students: course.students.map(student => student._id)
    });
  }, [course]);

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
      const response = await apiFetch(`/api/courses/${course._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      onCourseUpdated(response);
    } catch (error) {
      console.error('Error updating course:', error);
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
        <button type="submit" style={buttonStyle}>Update Course</button>
        <button type="button" onClick={onCancel} style={{...buttonStyle, backgroundColor: '#9ca3af'}}>Cancel</button>
      </div>
    </form>
  );
}