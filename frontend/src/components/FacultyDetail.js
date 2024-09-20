import React from 'react';
import { useParams, Link } from 'react-router-dom';

const faculty = [
  { id: 1, name: "Dr. Alice Johnson", email: "alice@example.com", department: "Computer Science", position: "Associate Professor", joinDate: "2015-09-01", research: "Artificial Intelligence and Machine Learning" },
  { id: 2, name: "Prof. Bob Smith", email: "bob@example.com", department: "Electrical Engineering", position: "Professor", joinDate: "2010-09-01", research: "Renewable Energy Systems" },
  { id: 3, name: "Dr. Carol Williams", email: "carol@example.com", department: "Mechanical Engineering", position: "Assistant Professor", joinDate: "2018-09-01", research: "Robotics and Automation" },
];

function FacultyDetail() {
  const { id } = useParams();
  const member = faculty.find(f => f.id === parseInt(id));

  if (!member) {
    return <div>Faculty member not found</div>;
  }

  return (
    <div>
      <Link to="/faculty" style={{ textDecoration: 'none', color: '#3b82f6', marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Faculty
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Faculty Details</h1>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{member.name}</h2>
        <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {member.email}</p>
        <p style={{ marginBottom: '8px' }}><strong>Department:</strong> {member.department}</p>
        <p style={{ marginBottom: '8px' }}><strong>Position:</strong> {member.position}</p>
        <p style={{ marginBottom: '8px' }}><strong>Join Date:</strong> {member.joinDate}</p>
        <p style={{ marginBottom: '16px' }}><strong>Research Focus:</strong> {member.research}</p>
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '24px 0 16px' }}>Courses Taught</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Introduction to Computer Science</li>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Advanced Algorithms</li>
        <li style={{ backgroundColor: 'white', padding: '16px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Machine Learning</li>
      </ul>
    </div>
  );
}

export default FacultyDetail;