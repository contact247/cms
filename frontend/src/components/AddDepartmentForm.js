import React, { useState } from 'react';
import { apiFetch } from '../api';

export default function AddDepartmentForm({ faculty, onDepartmentAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    description: ''
  });

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
      const response = await apiFetch('/api/departments', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      onDepartmentAdded(response);
      setShowForm(false);
      setFormData({
        name: '',
        head: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding department:', error);
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
      <button onClick={() => setShowForm(true)} style={buttonStyle}>+ Add Department</button>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px' }}>Add New Department</h2>
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
            <button type="submit" style={buttonStyle}>Add Department</button>
            <button type="button" onClick={() => setShowForm(false)} style={{...buttonStyle, backgroundColor: '#9ca3af'}}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}