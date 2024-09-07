import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { Button, Card } from 'antd';

import { ClockCircleOutlined, UserOutlined, StarOutlined, EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons';
import moment from 'moment';
import './MovieBooking.css';
import { GetShowtimes, GetMovies } from '../../services/https/index'; // Import API calls
import { MoviesInterface } from '../../interfaces/IMovie'; // Import movie interface
import axios from 'axios'; // For HTTP requests

// Arrow components for Slider
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-prev-arrow" onClick={onClick}>
      {'<'}
    </div>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-next-arrow" onClick={onClick}>
      {'>'}
    </div>
  );
};

// Function to parse query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MovieBooking: React.FC = () => {
  const query = useQuery();
  const movieName = query.get('movieName') || null; // Extract movieName from query params

  const [selectedDate, setSelectedDate] = useState<number | null>(0);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [filteredTimes, setFilteredTimes] = useState<string[]>([]);
  const [moviePoster, setMoviePoster] = useState<string | null>(null); // State for poster
  const [movieDuration, setMovieDuration] = useState<string>(''); // Movie duration
  const [director, setDirector] = useState<string>(''); // Director info
  const [rating, setRating] = useState<number>(0); // Movie rating
  const [movieType, setMovieType] = useState<string>(''); // Movie type
  const [synopsis, setSynopsis] = useState<string>(''); // เพิ่ม state สำหรับ Synopsis

  // Fetch movie data from API
  const fetchMovieData = async () => {
    try {
      const movies: MoviesInterface[] = await GetMovies(); // ดึงข้อมูลภาพยนตร์ทั้งหมด
      if (movies && movieName) {
        const movie = movies.find((m: MoviesInterface) => m.MovieName === movieName); // ค้นหาภาพยนตร์จากชื่อ
        if (movie) {
          const posterUrl = `http://localhost:8000/api/movie/${movie.ID}/poster`;
          setMoviePoster(posterUrl);
  
          const durationInMinutes = movie.MovieDuration;
          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;
          setMovieDuration(`${hours} hr ${minutes} min`);
  
          setDirector(movie.Director || 'Unknown Director');
          setMovieType(movie.MovieType || 'Unknown Genre');
          const randomRating = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
          setRating(randomRating);
  
          // เพิ่มการตั้งค่า Synopsis
          setSynopsis(movie.Synopsis || 'No synopsis available');
        }
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // Fetch movie and showtimes data when component mounts
  useEffect(() => {
    if (movieName) {
      fetchMovieData(); // Fetch movie data
    }
  }, [movieName]);

  useEffect(() => {
    if (movieName) {
      GetShowtimes()
        .then((data) => {
          setShowtimes(data); // Set showtimes data
        })
        .catch((error) => {
          console.error('Error fetching showtimes:', error);
        });
    }
  }, [movieName]);

  // Filter showtimes by date and movie
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

  // Generate array of dates (today + 10 days)
  const dates = Array.from({ length: 10 }, (_, index) => moment().add(index, 'days'));

  // Settings for the date slider
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
        <Card style={{ padding: '0', margin: '0', display: 'flex', justifyContent: 'center' }}>
  {moviePoster ? (
    <img
      src={moviePoster}
      alt="Movie Poster"
      style={{ 
        width: '100%', 
        height: 'auto', 
        maxHeight: '70vh', 
        aspectRatio: '2 / 3', 
        objectFit: 'cover',
        margin: '20',
        padding: '0',
      }}
    />
  ) : (
    <p>No Poster Available</p>
  )}
  {/* แสดง Synopsis */}
  
</Card>


        {/* Movie Information */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{movieName ? movieName : 'No Movie Selected'}</h2>
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
                  onClick={() => setSelectedDate(index)} // Change selected date
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
                    <Button key={time} type="default">
                      {time}
                    </Button>
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

          {/* discri */}
          <Card style={{ marginBottom: '10px' }}>
            <Card.Meta title="Synopsis" />
            <div className="flex items-center mt-4">
              <FileTextOutlined className="w-4 h-4 mr-2" />
              <div style={{ padding: '10px' }}>
                <p>{synopsis}</p>
              </div>
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
