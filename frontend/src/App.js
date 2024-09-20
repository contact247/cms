import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, Building2, BookOpen, Users, GraduationCap } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import DepartmentDetail from './components/DepartmentDetail';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Faculty from './components/Faculty';
import FacultyDetail from './components/FacultyDetail';
import Students from './components/Students';
import StudentDetail from './components/StudentDetail';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <nav style={{ width: '250px', backgroundColor: '#f3f4f6', padding: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>College Management</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                <Home size={18} style={{ marginRight: '10px' }} />
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/departments" style={{ textDecoration: 'none', color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                <Building2 size={18} style={{ marginRight: '10px' }} />
                Departments
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/courses" style={{ textDecoration: 'none', color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                <BookOpen size={18} style={{ marginRight: '10px' }} />
                Courses
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/faculty" style={{ textDecoration: 'none', color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                <Users size={18} style={{ marginRight: '10px' }} />
                Faculty
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/students" style={{ textDecoration: 'none', color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                <GraduationCap size={18} style={{ marginRight: '10px' }} />
                Students
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id" element={<DepartmentDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/faculty/:id" element={<FacultyDetail />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;