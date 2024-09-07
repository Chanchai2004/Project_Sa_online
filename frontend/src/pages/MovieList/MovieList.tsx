import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMovies } from '../../services/https';
import { MoviesInterface } from '../../interfaces/IMovie'; // นำเข้า MoviesInterface

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MoviesInterface[]>([]); // ใช้ MoviesInterface[]
  const [loading, setLoading] = useState<boolean>(true); // สำหรับแสดงสถานะการโหลด
  const [error, setError] = useState<string | null>(null); // เก็บข้อความ error หากเกิดขึ้น

  // ฟังก์ชันสำหรับดึงข้อมูลหนังจาก API
  const fetchMovies = async () => {
    try {
      const response = await GetMovies(); // ใช้ฟังก์ชัน GetMovies จาก services/http
      if (response) {
        setMovies(response); // เก็บข้อมูลหนังที่ดึงมาลงใน state
      } else {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูลภาพยนตร์');
      }
      setLoading(false); // ปิดการแสดงสถานะการโหลดเมื่อข้อมูลถูกดึงสำเร็จ
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการดึงข้อมูลภาพยนตร์');
      setLoading(false);
    }
  };

  // ใช้ useEffect สำหรับดึงข้อมูลเมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // ฟังก์ชันสำหรับจัดการการคลิกและเปลี่ยนเส้นทางไปที่หน้า MovieBooking
  const handleSelectMovie = (movieID: string) => {
    navigate(`/dashboard?movieName=${encodeURIComponent(movieID)}`);
  };

  // แสดง loading หรือ error หากมี
  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>เลือกภาพยนตร์</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.ID}>
            <button onClick={() => handleSelectMovie(movie.MovieName)}>
              {movie.MovieName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
