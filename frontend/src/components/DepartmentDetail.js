import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/departments/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDepartment(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!department) return <div>Department not found</div>;

  return (
    <div>
      <Link to="/departments" style={{ textDecoration: 'none', color: '#3b82f6', marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Departments
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Department Details</h1>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{department.name}</h2>
        <p style={{ marginBottom: '8px' }}><strong>Description:</strong> {department.description || 'No description available'}</p>
        <p style={{ marginBottom: '8px' }}><strong>Head:</strong> {department.head ? `${department.head.firstName} ${department.head.lastName}` : 'Not assigned'}</p>
        <p style={{ marginBottom: '8px' }}><strong>Created At:</strong> {new Date(department.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default DepartmentDetail;