import React from 'react';
import { useParams, Link } from 'react-router-dom';

const courses = [
  { id: 1, name: "Introduction to Computer Science", code: "CS101", credits: 3, instructor: "Dr. Alice Johnson", description: "An introductory course covering the basics of computer science and programming." },
  { id: 2, name: "Data Structures and Algorithms", code: "CS201", credits: 4, instructor: "Prof. Bob Smith", description: "A comprehensive study of data structures and algorithms, with a focus on efficiency and problem-solving." },
  { id: 3, name: "Database Management Systems", code: "CS301", credits: 3, instructor: "Dr. Carol Williams", description: "An in-depth look at database design, implementation, and management." },
];

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <Link to="/courses" style={{ textDecoration: 'none', color: '#3b82f6', marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Courses
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Course Details</h1>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{course.name}</h2>
        <p style={{ marginBottom: '8px' }}><strong>Code:</strong> {course.code}</p>
        <p style={{ marginBottom: '8px' }}><strong>Credits:</strong> {course.credits}</p>
        <p style={{ marginBottom: '8px' }}><strong>Instructor:</strong> {course.instructor}</p>
        <p style={{ marginBottom: '16px' }}><strong>Description:</strong> {course.description}</p>
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '24px 0 16px' }}>Enrolled Students</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>John Doe</li>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Jane Smith</li>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Bob Johnson</li>
      </ul>
    </div>
  );
}

export default CourseDetail;