import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';
import AddCourseForm from './AddCourseForm';
import EditCourseForm from './EditCourseForm';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/courses'),
      apiFetch('/api/departments'),
      apiFetch('/api/faculty'),
      apiFetch('/api/students')
    ])
      .then(([coursesData, departmentsData, facultyData, studentsData]) => {
        setCourses(coursesData);
        setDepartments(departmentsData);
        setFaculty(facultyData);
        setStudents(studentsData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCourseAdded = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course._id === updatedCourse._id ? updatedCourse : course
    ));
    setEditingCourse(null);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Courses</h1>
        <AddCourseForm 
          departments={departments} 
          faculty={faculty} 
          students={students}
          onCourseAdded={handleCourseAdded} 
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Code</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Credits</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Department</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Faculty</th>
            <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Students</th>
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
                {course.students.length} students
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <Link to={`/courses/${course._id}`} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
                <button onClick={() => handleEditClick(course)} style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingCourse && (
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
            <h2 style={{ marginBottom: '20px' }}>Edit Course</h2>
            <EditCourseForm
              course={editingCourse}
              departments={departments}
              faculty={faculty}
              students={students}
              onCourseUpdated={handleCourseUpdated}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}