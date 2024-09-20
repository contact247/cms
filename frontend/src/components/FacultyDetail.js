import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function FacultyDetail() {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/faculty/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFaculty(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!faculty) return <div>Faculty member not found</div>;

  return (
    <div>
      <Link to="/faculty" style={{ textDecoration: 'none', color: '#3b82f6', marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Faculty
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Faculty Details</h1>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{`${faculty.firstName} ${faculty.lastName}`}</h2>
        <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {faculty.email}</p>
        <p style={{ marginBottom: '8px' }}><strong>Contact:</strong> {faculty.contact}</p>
        <p style={{ marginBottom: '8px' }}><strong>Position:</strong> {faculty.position}</p>
        <p style={{ marginBottom: '8px' }}><strong>Department:</strong> {faculty.department.name}</p>
        <p style={{ marginBottom: '8px' }}><strong>Created At:</strong> {new Date(faculty.createdAt).toLocaleDateString()}</p>
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '24px 0 16px' }}>Courses Taught</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {faculty.courses && faculty.courses.length > 0 ? (
          faculty.courses.map((course) => (
            <li key={course._id} style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {`${course.title} (${course.code})`}
            </li>
          ))
        ) : (
          <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            No courses assigned to this faculty member
          </li>
        )}
      </ul>
    </div>
  );
}

export default FacultyDetail;