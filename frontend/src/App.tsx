import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'; // ปรับเส้นทางตามโครงสร้างของคุณ
import Members from './pages/Member/Member'; // ปรับเส้นทางตามโครงสร้างของคุณ
import ShowtimeManagement from './pages/Showtime/Showtime';
import Analytics from './pages/Analytics/Analytics'; // นำเข้า Analytics
import MovieList from './pages/MovieList/MovieList';
import MovieBooking from './pages/MovieBooking/MovieBooking';
import Movie from './pages/Movie/Movie';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/showtimes" element={<ShowtimeManagement />} />
          <Route path="/members" element={<Members />} />
          <Route path="/analytics" element={<Analytics />} /> {/* เพิ่มเส้นทางสำหรับ Analytics */}
          <Route path="/discount" element={<MovieList />} />
          <Route path="/dashboard" element={<MovieBooking />} />
          <Route path="/movies" element={<Movie/>} />
          {/* เพิ่มเส้นทางอื่นๆ ที่คุณต้องการ */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
