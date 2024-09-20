import React from 'react';
import { Link } from 'react-router-dom';

const faculty = [
  { id: 1, name: "Dr. Alice Johnson", email: "alice@example.com", department: "Computer Science" },
  { id: 2, name: "Prof. Bob Smith", email: "bob@example.com", department: "Electrical Engineering" },
  { id: 3, name: "Dr. Carol Williams", email: "carol@example.com", department: "Mechanical Engineering" },
];

function Faculty() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Faculty</h1>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}>
          + Add Faculty
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Department</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((member) => (
            <tr key={member.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{member.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{member.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{member.department}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/faculty/${member.id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
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

export default Faculty;