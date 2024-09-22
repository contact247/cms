import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';
import { Users, UserPlus, Building, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalDepartments: 0,
    totalCourses: 0
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [studentsData, facultyData, departmentsData, coursesData] = await Promise.all([
          apiFetch('/api/students'),
          apiFetch('/api/faculty'),
          apiFetch('/api/departments'),
          apiFetch('/api/courses')
        ]);

        setStats({
          totalStudents: studentsData.length,
          totalFaculty: facultyData.length,
          totalDepartments: departmentsData.length,
          totalCourses: coursesData.length
        });

        setRecentStudents(studentsData.slice(-5).reverse());
        setRecentCourses(coursesData.slice(-5).reverse());

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const dashboardStyle = {
    padding: '20px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh'
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#111827'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  };

  const recentListsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={headerStyle}>Dashboard</h1>
      
      <div style={statsContainerStyle}>
        <StatCard title="Total Students" value={stats.totalStudents} icon={<Users size={24} />} />
        <StatCard title="Total Faculty" value={stats.totalFaculty} icon={<UserPlus size={24} />} />
        <StatCard title="Total Departments" value={stats.totalDepartments} icon={<Building size={24} />} />
        <StatCard title="Total Courses" value={stats.totalCourses} icon={<BookOpen size={24} />} />
      </div>

      <div style={recentListsContainerStyle}>
        <RecentList title="Recent Students" items={recentStudents} type="students" />
        <RecentList title="Recent Courses" items={recentCourses} type="courses" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const iconStyle = {
    marginBottom: '10px',
    color: '#3b82f6'
  };

  const titleStyle = {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '5px'
  };

  const valueStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  };

  return (
    <div style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <h2 style={titleStyle}>{title}</h2>
      <p style={valueStyle}>{value}</p>
    </div>
  );
}

function RecentList({ title, items, type }) {
  const listContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  };

  const listTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#111827'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#3b82f6',
    fontWeight: 'medium'
  };

  return (
    <div style={listContainerStyle}>
      <h2 style={listTitleStyle}>{title}</h2>
      <ul style={listStyle}>
        {items.map(item => (
          <li key={item._id} style={listItemStyle}>
            <Link to={`/${type}/${item._id}`} style={linkStyle}>
              {type === 'students' ? `${item.firstName} ${item.lastName}` : item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}