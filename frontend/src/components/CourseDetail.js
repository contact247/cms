import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../api';
function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/api/courses/${id}`)
      .then(response => {
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return response;
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <Link to="/courses" style={{ textDecoration: 'none', color: '#3b82f6', marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Courses
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Course Details</h1>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{course.title}</h2>
        <p style={{ marginBottom: '8px' }}><strong>Code:</strong> {course.code}</p>
        <p style={{ marginBottom: '8px' }}><strong>Credits:</strong> {course.credits}</p>
        <p style={{ marginBottom: '8px' }}><strong>Description:</strong> {course.description || 'No description available'}</p>
        <p style={{ marginBottom: '8px' }}><strong>Department:</strong> {course.department.name}</p>
        <p style={{ marginBottom: '8px' }}><strong>Faculty:</strong> {course.faculty ? `${course.faculty.firstName} ${course.faculty.lastName}` : 'Not assigned'}</p>
        <p style={{ marginBottom: '8px' }}><strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '24px 0 16px' }}>Enrolled Students</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {course.students && course.students.length > 0 ? (
          course.students.map((student) => (
            <li key={student._id} style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {`${student.firstName} ${student.lastName}`}
            </li>
          ))
        ) : (
          <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            No students enrolled in this course
          </li>
        )}
      </ul>
    </div>
  );
}

export default CourseDetail;