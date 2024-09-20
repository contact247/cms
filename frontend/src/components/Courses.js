import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch('/api/courses')
      .then(response => {
        //console.log(response);
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return response;
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Courses</h1>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}>
          + Add Course
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Code</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Credits</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Department</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Faculty</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{course.title}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{course.code}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{course.credits}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{course.department.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                {course.faculty ? `${course.faculty.firstName} ${course.faculty.lastName}` : 'Not assigned'}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/courses/${course._id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
                <button style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;