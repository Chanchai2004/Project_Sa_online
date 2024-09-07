import React from 'react';
import Header from '../../components/Header/ShowtimeManagement';
import ShowtimeTable from '../../components/ShowtimeTable/ShowtimeTable';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <ShowtimeTable />
    </div>
  );
};

export default Dashboard;
