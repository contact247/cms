import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';
import AddFacultyForm from './AddFacultyForm';
import EditFacultyForm from './EditFacultyForm';

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/faculty'),
      apiFetch('/api/departments'),
      apiFetch('/api/courses')
    ])
      .then(([facultyData, departmentsData, coursesData]) => {
        setFaculty(facultyData);
        setDepartments(departmentsData);
        setCourses(coursesData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFacultyAdded = (newFaculty) => {
    setFaculty(prevFaculty => [...prevFaculty, newFaculty]);
  };

  const handleEditClick = (facultyMember) => {
    setEditingFaculty(facultyMember);
  };

  const handleFacultyUpdated = (updatedFaculty) => {
    setFaculty(prevFaculty => prevFaculty.map(member => 
      member._id === updatedFaculty._id ? updatedFaculty : member
    ));
    setEditingFaculty(null);
  };

  const handleCancelEdit = () => {
    setEditingFaculty(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Faculty</h1>
        <AddFacultyForm departments={departments} courses={courses} onFacultyAdded={handleFacultyAdded} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Position</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Department</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Courses</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((member) => (
            <tr key={member._id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{`${member.firstName} ${member.lastName}`}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{member.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{member.position}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{member.department.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                {member.courses.map(course => course.title).join(', ')}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/faculty/${member._id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
                <button onClick={() => handleEditClick(member)} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingFaculty && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Edit Faculty</h2>
            <EditFacultyForm
              faculty={editingFaculty}
              departments={departments}
              courses={courses}
              onFacultyUpdated={handleFacultyUpdated}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}