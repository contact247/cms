import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Courses from './components/Courses';
import Faculty from './components/Faculty';
import StudentDetail from './components/StudentDetail';
import CourseDetail from './components/CourseDetail';
import FacultyDetail from './components/FacultyDetail';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <Link to={to} style={{
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    textDecoration: 'none',
    color: 'black'
  }}>
    <Icon style={{ marginRight: '8px' }} />
    <span>{label}</span>
  </Link>
);

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <aside style={{
          width: '250px',
          backgroundColor: 'white',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}>
          <div style={{ padding: '16px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>College MS</h1>
          </div>
          <nav style={{ marginTop: '24px' }}>
            <SidebarItem icon={() => '📊'} label="Dashboard" to="/" />
            <SidebarItem icon={() => '👥'} label="Students" to="/students" />
            <SidebarItem icon={() => '📚'} label="Courses" to="/courses" />
            <SidebarItem icon={() => '👨‍🏫'} label="Faculty" to="/faculty" />
          </nav>
        </aside>
        <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/faculty/:id" element={<FacultyDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;