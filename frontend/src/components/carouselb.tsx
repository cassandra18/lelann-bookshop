import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Uniform {
    school: string;
    imageUrl: string;
}
const uniforms: Uniform[] = [
  {
    school: 'Greenfield High',
    imageUrl: '/images/greenfield-small.jpg',
  },
  {
    school: 'Blue Valley School',
    imageUrl: '/images/bluevalley-large.jpg',
  },
  {
    school: 'Sunrise Academy',
    imageUrl: '/images/sunrise-small.jpg',
  },
];

const UniformCarousel: React.FC = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="uniform-carousel">
      <h2>School Uniforms</h2>
      <Slider {...settings}>
        {uniforms.map((uniform, index) => (
          <div key={index} className="uniform-card">
            <img src={uniform.imageUrl} alt={`${uniform.school}`} />
            <h3>{uniform.school}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UniformCarousel;
