import React from 'react';

interface ExampleCarouselImageProps {
  text: string;
}

const ExampleCarouselImage: React.FC<ExampleCarouselImageProps> = ({ text }) => {
  return (
    <div
      style={{
        height: '400px',
        backgroundColor: '#777',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '2rem',
      }}
    >
      {text}
    </div>
  );
};

export default ExampleCarouselImage;
