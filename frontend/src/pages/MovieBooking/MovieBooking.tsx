import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { Button, Card } from 'antd';
import { ClockCircleOutlined, UserOutlined, StarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment';
import './MovieBooking.css';
import { GetShowtimes, GetMovies } from '../../services/https/index'; // Import GetMovies
import { MoviesInterface } from '../../interfaces/IMovie'; // Import MoviesInterface

// ฟังก์ชันสำหรับลูกศรซ้าย
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-prev-arrow" onClick={onClick}>
      {'<'}
    </div>
  );
};

// ฟังก์ชันสำหรับลูกศรขวา
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-next-arrow" onClick={onClick}>
      {'>'}
    </div>
  );
};

// ฟังก์ชันสำหรับการดึงค่าจาก query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MovieBooking: React.FC = () => {
  const query = useQuery();
  const movieName = query.get('movieName') || null; // ดึงค่าจาก query params (ถ้าไม่มีจะเป็น null)

  const [selectedDate, setSelectedDate] = useState<number | null>(0);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [filteredTimes, setFilteredTimes] = useState<string[]>([]);
  const [moviePoster, setMoviePoster] = useState<string | null>(null); // เก็บโปสเตอร์ของหนัง
  const [movieDuration, setMovieDuration] = useState<string>(''); // เก็บข้อมูลเวลา
  const [director, setDirector] = useState<string>(''); // เก็บข้อมูลผู้กำกับ
  const [rating, setRating] = useState<number>(0); // เก็บข้อมูล rating
  const [movieType, setMovieType] = useState<string>(''); // เก็บข้อมูลประเภทหนัง

  // ฟังก์ชันสำหรับดึงข้อมูลหนังจาก API และเก็บข้อมูลใน state
  const fetchMovieData = async () => {
    try {
      const movies: MoviesInterface[] = await GetMovies(); // เรียก API เพื่อดึงข้อมูลหนังทั้งหมด
      if (movies && movieName) {
        const movie = movies.find((m: MoviesInterface) => m.MovieName === movieName); // ค้นหาหนังที่ตรงกับชื่อ
        if (movie) {
          setMoviePoster(movie.Poster || '/placeholder.svg'); // เก็บ URL ของโปสเตอร์หนัง

          // คำนวณระยะเวลา (แปลงจากนาทีเป็นชั่วโมงและนาที)
          const durationInMinutes = movie.MovieDuration;
          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;
          setMovieDuration(`${hours} hr ${minutes} min`);

          // เก็บข้อมูลผู้กำกับ
          setDirector(movie.Director || 'Unknown Director');

          // เก็บข้อมูลประเภทหนัง
          setMovieType(movie.MovieType || 'Unknown Genre');

          // สุ่มคะแนน rating ระหว่าง 6 ถึง 10
          const randomRating = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
          setRating(randomRating);
        }
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // เรียกใช้ฟังก์ชัน fetchMovieData เมื่อ component mount
  useEffect(() => {
    if (movieName) {
      fetchMovieData();
    }
  }, [movieName]);

  // ดึงข้อมูล showtimes เมื่อ component mount
  useEffect(() => {
    if (movieName) {
      GetShowtimes()
        .then((data) => {
          setShowtimes(data);
        })
        .catch((error) => {
          console.error('Error fetching showtimes:', error);
        });
    }
  }, [movieName]);

  // ฟังก์ชันกรองรอบเวลาตามวันที่และหนัง
  useEffect(() => {
    if (showtimes.length > 0 && movieName) {
      const selectedMomentDate = moment().add(selectedDate || 0, 'days').format('YYYY-MM-DD');

      const filtered = showtimes
        .filter((showtime) => {
          const showdate = moment(showtime.Showdate).format('YYYY-MM-DD');
          return showtime.Movie.MovieName === movieName && showdate === selectedMomentDate;
        })
        .map((showtime) => moment(showtime.Showdate).format('HH:mm'));

      setFilteredTimes(filtered);
    }
  }, [showtimes, selectedDate, movieName]);

  // สร้าง array วันที่ โดยเริ่มจากวันนี้และเพิ่มอีก 10 วัน
  const dates = Array.from({ length: 10 }, (_, index) => moment().add(index, 'days'));

  // การตั้งค่าสำหรับการสไลด์
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">MERJE</h1>
        <div className="space-x-4">
          <Button type="link">Home</Button>
          <Button type="link">MyTicket</Button>
          <Button type="link">MERJE news</Button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Movie Poster */}
        <Card cover={<img src={moviePoster} alt="Movie Poster" className="w-auto h-full" />}>
        </Card>

        {/* Movie Information */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{movieName ? movieName : 'No Movie Selected'}</h2> {/* แสดงชื่อหนังจาก query params */}

          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">{movieType}</span>
            <span className="flex items-center">
              <ClockCircleOutlined className="w-4 h-4 mr-1" /> {movieDuration}
            </span>
            <span className="flex items-center">
              <UserOutlined className="w-4 h-4 mr-1" /> {director}
            </span>
            <span className="flex items-center">
              <StarOutlined className="w-4 h-4 mr-1" /> {rating}
            </span>
          </div>

          {/* Date Slider */}
          <div className="date-slider mb-4">
            <Slider {...settings}>
              {dates.map((date, index) => (
                <Card
                  key={index}
                  className={`date-card ${selectedDate === index ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(index)} // จัดการคลิกเพื่อเปลี่ยนการเลือก
                >
                  <div className="date-text">{date.format('DD')}</div>
                  <div className="date-month">{date.format('MMM').toUpperCase()}</div>
                </Card>
              ))}
            </Slider>
          </div>

          {/* Showtimes */}
          <Card className="mb-4">
            <Card.Meta title="Round" />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {filteredTimes.length > 0
                ? filteredTimes.map((time) => (
                    <Button key={time} type="default">{time}</Button>
                  ))
                : <p>No showtimes available</p>}
            </div>
          </Card>

          {/* Location */}
          <Card style={{ marginBottom: '10px' }}>
            <Card.Meta title="Location" />
            <div className="flex items-center mt-4">
              <EnvironmentOutlined className="w-4 h-4 mr-2" />
              <span>The Mall Korat</span>
            </div>
          </Card>

          {/* Select Seat Button */}
          <Button type="primary" className="w-full mb-4" style={{ marginTop: '10px' }}>Select seat</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
