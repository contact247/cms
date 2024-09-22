import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../api';

export default function DepartmentDetail() {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await apiFetch(`/api/departments/${id}`);
        setDepartment(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching department:', error);
        setError('Failed to load department details. Please try again later.');
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!department) return <div>No department found</div>;

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#111827'
  };

  const sectionStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px',
    color: '#4b5563'
  };

  const linkStyle = {
    color: '#3b82f6',
    textDecoration: 'none'
  };

  const returnLinkStyle = {
    ...linkStyle,
    display: 'inline-block',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <Link to="/departments" style={returnLinkStyle}>← Return to Departments List</Link>
      <h1 style={headerStyle}>Department Details</h1>
      <div style={sectionStyle}>
        <span style={labelStyle}>Name:</span>
        {department.name}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Description:</span>
        {department.description}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Head:</span>
        {department.head ? (
          <Link to={`/faculty/${department.head._id}`} style={linkStyle}>
            {department.head.firstName} {department.head.lastName}
          </Link>
        ) : (
          'Not assigned'
        )}
      </div>
    </div>
  );
}