import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';
import AddStudentForm from './AddStudentForm';
import EditStudentForm from './EditStudentForm';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/students'),
      apiFetch('/api/departments'),
      apiFetch('/api/courses')
    ])
      .then(([studentsData, departmentsData, coursesData]) => {
        setStudents(studentsData);
        setDepartments(departmentsData);
        setCourses(coursesData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleStudentAdded = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents(prevStudents => prevStudents.map(student => 
      student._id === updatedStudent._id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Students</h1>
        <AddStudentForm departments={departments} courses={courses} onStudentAdded={handleStudentAdded} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Contact</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Department</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Courses</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{`${student.firstName} ${student.lastName}`}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{student.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{student.contact}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{student.department.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                {student.courses.map(course => course.title).join(', ')}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/students/${student._id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
                <button onClick={() => handleEditClick(student)} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingStudent && (
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
            <h2 style={{ marginBottom: '20px' }}>Edit Student</h2>
            <EditStudentForm
              student={editingStudent}
              departments={departments}
              courses={courses}
              onStudentUpdated={handleStudentUpdated}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}