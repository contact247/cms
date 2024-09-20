import React from 'react';
import { Link } from 'react-router-dom';

const students = [
  { id: 1, name: "John Doe", email: "john@example.com", course: "Computer Science" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Electrical Engineering" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", course: "Mechanical Engineering" },
];

function Students() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Students</h1>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}>
          + Add Student
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Course</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{student.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{student.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{student.course}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/students/${student.id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
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

export default Students;