import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../api';

export default function StudentDetail() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await apiFetch(`/api/students/${id}`);
        setStudent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
        setError('Failed to load student details. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!student) return <div>No student found</div>;

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
      <h1 style={headerStyle}>Student Details</h1>
      <div style={sectionStyle}>
        <span style={labelStyle}>Name:</span>
        {student.firstName} {student.lastName}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Email:</span>
        {student.email}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Contact:</span>
        {student.contact}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Department:</span>
        <Link to={`/departments/${student.department._id}`} style={linkStyle}>
          {student.department.name}
        </Link>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Courses:</span>
        <ul>
          {student.courses.map(course => (
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