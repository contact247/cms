import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../api';

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await apiFetch(`/api/courses/${id}`);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course found</div>;

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
      <Link to="/courses" style={returnLinkStyle}>← Return to Courses List</Link>
      <h1 style={headerStyle}>Course Details</h1>
      <div style={sectionStyle}>
        <span style={labelStyle}>Title:</span>
        {course.title}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Code:</span>
        {course.code}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Description:</span>
        {course.description}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Credits:</span>
        {course.credits}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Department:</span>
        <Link to={`/departments/${course.department._id}`} style={linkStyle}>
          {course.department.name}
        </Link>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Faculty:</span>
        {course.faculty ? (
          <Link to={`/faculty/${course.faculty._id}`} style={linkStyle}>
            {course.faculty.firstName} {course.faculty.lastName}
          </Link>
        ) : (
          'Not assigned'
        )}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Students:</span>
        <ul>
          {course.students.map(student => (
            <li key={student._id}>
              <Link to={`/students/${student._id}`} style={linkStyle}>
                {student.firstName} {student.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}