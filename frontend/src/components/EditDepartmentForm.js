import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export default function EditDepartmentForm({ department, faculty, onDepartmentUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    description: ''
  });

  useEffect(() => {
    setFormData({
      name: department.name,
      head: department.head ? department.head._id : '',
      description: department.description
    });
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch(`/api/departments/${department._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      onDepartmentUpdated(response);
    } catch (error) {
      console.error('Error updating department:', error);
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
        name="name"
        placeholder="Department Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="head"
        value={formData.head}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select Department Head</option>
        {faculty.map((member) => (
          <option key={member._id} value={member._id}>
            {`${member.firstName} ${member.lastName}`}
          </option>
        ))}
      </select>
      <textarea
        name="description"
        placeholder="Department Description"
        value={formData.description}
        onChange={handleChange}
        style={{...inputStyle, height: '100px'}}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button type="submit" style={buttonStyle}>Update Department</button>
        <button type="button" onClick={onCancel} style={{...buttonStyle, backgroundColor: '#9ca3af'}}>Cancel</button>
      </div>
    </form>
  );
}