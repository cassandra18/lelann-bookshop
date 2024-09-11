import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon: string;
}

const Arrow: React.FC<ArrowProps> = ({ className, style, onClick, icon }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer ${className}`}
    style={{ ...style, display: "block", zIndex: 10 }}
    onClick={onClick}
  >
    {icon}
  </div>
);

const HeroSection: React.FC = () => {
  const settings = { 
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <Arrow icon=">" className="right-0 mr-2"/>,
    prevArrow: <Arrow icon="<" className="left-0 ml-2"/>,
  };


  return (
    <div className='relative'>
      
        <Slider {...settings} className='relative flex w-3/4 mt-10 mx-auto text-yellow-400 items-center'>
          <div className='mx-auto ' >
            <img src={'/images/notebook.jpg'} alt="notebook" className='w-full h-64 object-cover' />
          </div>
          <div className='mx-auto'>
            <img src={'/images/stickynotes.jpg'} alt="stickynotes" className='w-full h-64 object-cover'  />
          </div>
          <div className='mx-auto' >
            <img src={'/images/back-to-school.jpg'} alt="back-to-school" className='w-full h-64 object-cover' />
          </div>
        </Slider>
     
    </div>
  )
}

export default HeroSection;