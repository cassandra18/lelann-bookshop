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
    imageUrl: '/images/greenfield-uniform.jpeg',
  },
  {
    school: 'Blue Valley School',
    imageUrl: '/images/bluevalley-pekit.jpeg',
  },
  {
    school: 'School back-pack',
    imageUrl: '/images/back-pack.jpeg',
  },
];

const UniformCarousel: React.FC = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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
      <Slider {...settings} className=' w-3/4 mt-10 mx-auto'>
        {uniforms.map((uniform, index) => (
          <div key={index} className="uniform-card">
            <img src={uniform.imageUrl} alt={`${uniform.school}`} className='w-full h-32 object-cover'/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UniformCarousel;
