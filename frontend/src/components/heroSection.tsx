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
    className={className}
    style={{ ...style, display: "block", zIndex: 2 }}
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
    nextArrow: <Arrow icon=">" />,
    prevArrow: <Arrow icon="<" />,
  };

  const publicUrl = import.meta.env.VITE_PUBLIC_URL;

  return (
    <div>
      <div className='carousel ' >
        <Slider {...settings}>
          <div className='mx-auto h-1/3 ' style={{ height: '20vh'}}>
            <img src={`${publicUrl}/images/notebook.jpg`} alt="notebook" className='w-full' />
          </div>
          <div className='h-full'>
            <img src={`${publicUrl}/images/stickynotes.jpg`} alt="stickynotes" className='w-full'  />
          </div>
          <div className='h-full'>
            <img src={`${publicUrl}/images/back-to-school.jpg`} alt="back-to-school" className='w-full h-1/3' />
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default HeroSection;