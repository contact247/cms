import React from 'react';
import { useParams, Link } from 'react-router-dom';

const students = [
  { id: 1, name: "John Doe", email: "john@example.com", course: "Computer Science", enrollmentDate: "2021-09-01", gpa: 3.8 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Electrical Engineering", enrollmentDate: "2020-09-01", gpa: 3.9 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", course: "Mechanical Engineering", enrollmentDate: "2022-09-01", gpa: 3.7 },
];

function StudentDetail() {
  const { id } = useParams();
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div>
      <Link to="/students" style={{ textDecoration: 'none', color: '#3b82f6', marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Students
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Student Details</h1>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{student.name}</h2>
        <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {student.email}</p>
        <p style={{ marginBottom: '8px' }}><strong>Course:</strong> {student.course}</p>
        <p style={{ marginBottom: '8px' }}><strong>Enrollment Date:</strong> {student.enrollmentDate}</p>
        <p style={{ marginBottom: '8px' }}><strong>GPA:</strong> {student.gpa}</p>
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '24px 0 16px' }}>Enrolled Courses</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Introduction to Programming</li>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Data Structures</li>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Algorithms</li>
      </ul>
    </div>
  );
}

export default StudentDetail;