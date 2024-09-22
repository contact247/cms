import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';
import AddDepartmentForm from './AddDepartmentForm';
import EditDepartmentForm from './EditDepartmentForm';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/departments'),
      apiFetch('/api/faculty')
    ])
      .then(([departmentsData, facultyData]) => {
        setDepartments(departmentsData);
        setFaculty(facultyData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDepartmentAdded = (newDepartment) => {
    setDepartments(prevDepartments => [...prevDepartments, newDepartment]);
  };

  const handleEditClick = (department) => {
    setEditingDepartment(department);
  };

  const handleDepartmentUpdated = (updatedDepartment) => {
    setDepartments(prevDepartments => prevDepartments.map(department => 
      department._id === updatedDepartment._id ? updatedDepartment : department
    ));
    setEditingDepartment(null);
  };

  const handleCancelEdit = () => {
    setEditingDepartment(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Departments</h1>
        <AddDepartmentForm faculty={faculty} onDepartmentAdded={handleDepartmentAdded} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Head</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Description</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{department.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                {department.head ? `${department.head.firstName} ${department.head.lastName}` : 'Not assigned'}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{department.description}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/departments/${department._id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
                <button onClick={() => handleEditClick(department)} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingDepartment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Edit Department</h2>
            <EditDepartmentForm
              department={editingDepartment}
              faculty={faculty}
              onDepartmentUpdated={handleDepartmentUpdated}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}