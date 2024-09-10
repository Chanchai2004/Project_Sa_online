import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardShowPoster.css';  // นำเข้าไฟล์ CSS เพื่อใช้ในการกำหนดสไตล์เพิ่มเติม

interface CardShowPosterProps {
  movieID: string; // กำหนดชนิดข้อมูลของ movieID ที่คาดว่าจะเป็น string
}

const CardShowPoster: React.FC<CardShowPosterProps> = ({ movieID }) => {
  const posterUrl = `http://localhost:8000/api/movie/${movieID}/poster`;

  return (
    <Card className="text-center card-custom">
      <Card.Img
        variant="top"
        src={posterUrl}
        alt={`Poster for movie ID: ${movieID}`}
        className="poster-img" // ใช้ class เพื่อปรับแต่งสไตล์
      />
      
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

export default CardShowPoster;
