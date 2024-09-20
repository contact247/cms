import React from 'react';

const Card = ({ title, value, icon }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 'medium', color: '#6b7280' }}>{title}</h3>
      {icon}
    </div>
    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
  </div>
);

function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        <Card title="Total Students" value="1,234" icon="👥" />
        <Card title="Total Courses" value="56" icon="📚" />
        <Card title="Faculty Members" value="89" icon="👨‍🏫" />
        <Card title="Departments" value="12" icon="🏢" />
      </div>
    </div>
  );
}

export default Dashboard;