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
    <>
    <div className="uniform-carousel mb-10">
      <h2 className="text-3xl font-bold text-center mt-10 text-sunset">School Uniforms</h2>
      <Slider {...settings} className=' w-3/4 mt-10 mx-auto'>
        {uniforms.map((uniform, index) => (
          <div key={index} className="uniform-card">
            <img src={uniform.imageUrl} alt={`${uniform.school}`} className='w-full h-32 object-cover'/>
          </div>
        ))}
      </Slider>
      
    </div>
    <div className="border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
    </>
  );
};

export default UniformCarousel;
