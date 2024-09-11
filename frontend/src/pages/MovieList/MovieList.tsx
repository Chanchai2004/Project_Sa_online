import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMovies } from '../../services/https';
import { MoviesInterface } from '../../interfaces/IMovie';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MovieList.css"

import Button from 'react-bootstrap/Button';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardShowPoster from './components/cardposter';
import Carousel from './components/carousel';
import ProgressBar from 'react-bootstrap/ProgressBar';

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MoviesInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);

  // ฟังก์ชันสำหรับดึงข้อมูลหนังจาก API
  const fetchMovies = async () => {
    try {
      const response = await GetMovies();
      if (response) {
        setMovies(response);
      } else {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูลภาพยนตร์');
      }
      setLoading(false);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการดึงข้อมูลภาพยนตร์');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0 && !hovered) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            // รีเซ็ต progress และเลื่อนไปยังภาพถัดไป
            setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
            return 0;
          }
          return prevProgress + 1; // เพิ่มค่า progress ทีละ 1% ทุก 200ms
        });
      }, 100); // ทุกๆ 200 มิลลิวินาที

      return () => clearInterval(interval); // ล้าง interval เมื่อออกจาก useEffect
    }
  }, [movies.length, hovered]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // ฟังก์ชันสำหรับจัดการการคลิกและเปลี่ยนเส้นทางไปที่หน้า MovieBooking
  const handleSelectMovie = (movieID: number | undefined) => {
    if (movieID) {
      navigate(`/dashboard?movieName=${encodeURIComponent(String(movieID))}`);
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* ส่วนแสดง Carousel พร้อมรายละเอียดหนัง */}
        <div
          className="col-md-12"
          onMouseEnter={() => setHovered(true)}  // หยุดเลื่อนเมื่อ hover
          onMouseLeave={() => setHovered(false)} // เริ่มเลื่อนเมื่อไม่ hover
        >
          {movies.length > 0 && (
            <Carousel movieID={movies[activeIndex].ID!}>
              <div className="movie-details">
                <h2>{movies[activeIndex].MovieName}</h2>
                <p>{movies[activeIndex].Synopsis}</p>
                <p><strong>Duration:</strong> {movies[activeIndex].MovieDuration} minutes</p>
                {movies[activeIndex].MovieType && <p><strong>Type:</strong> {movies[activeIndex].MovieType}</p>}
                {movies[activeIndex].Director && <p><strong>Director:</strong> {movies[activeIndex].Director}</p>}
                {movies[activeIndex].Actor && <p><strong>Actors:</strong> {movies[activeIndex].Actor}</p>}
                {movies[activeIndex].ReleaseDate && (
                  <p><strong>Release Date:</strong> {new Date(movies[activeIndex].ReleaseDate!).toLocaleDateString()}</p>
                )}
                <Button variant="primary" onClick={() => handleSelectMovie(movies[activeIndex].ID)}>
                  จองตั๋ว
                </Button>
              </div>
            </Carousel>
          )}
          <ProgressBar now={progress} style={{ height: '5px', marginTop: '10px' }} /> {/* Progress bar */}
        </div>
      </div>

      {/* หมวดหมู่ Action */}
      <h2 className="mt-5">Action</h2>
      <MultiCarousel responsive={responsive} infinite={true}>
        {movies.map((movie) => (
          <CardShowPoster key={movie.ID} movieID={movie.ID} /> 
        ))}
      </MultiCarousel>

      {/* หมวดหมู่ Drama */}
      <h2 className="mt-5">Drama</h2>
      <MultiCarousel responsive={responsive} infinite={true}>
        {movies.map((movie) => (
          <CardShowPoster key={movie.ID} movieID={movie.ID} />
        ))}
      </MultiCarousel>
    </div>
  );
};

export default MovieList;
