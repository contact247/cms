import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../api';

export default function FacultyDetail() {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await apiFetch(`/api/faculty/${id}`);
        setFaculty(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching faculty:', error);
        setError('Failed to load faculty details. Please try again later.');
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!faculty) return <div>No faculty found</div>;

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

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Faculty Details</h1>
      <div style={sectionStyle}>
        <span style={labelStyle}>Name:</span>
        {faculty.firstName} {faculty.lastName}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Email:</span>
        {faculty.email}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Contact:</span>
        {faculty.contact}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Position:</span>
        {faculty.position}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Department:</span>
        <Link to={`/departments/${faculty.department._id}`} style={linkStyle}>
          {faculty.department.name}
        </Link>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Courses:</span>
        <ul>
          {faculty.courses.map(course => (
            <li key={course._id}>
              <Link to={`/courses/${course._id}`} style={linkStyle}>
                {course.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}