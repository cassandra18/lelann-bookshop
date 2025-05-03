import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  };

  const slides = [
    {
      image: '/images/notebook.jpg',
      title: '📚 Back to School Bonanza!',
      link: '/offers/back-to-school',
    },
    {
      image: '/images/stickynotes.jpg',
      title: '🗒️ Sticky Note Mania!',
      link: '/offers/stickynotes',
    },
    {
      image: '/images/back-to-school.jpg',
      title: '✏️ Top Stationery Picks!',
      link: '/offers/stationery',
    },
  ];

  return (
    <div className="relative mb-20 overflow-hidden barlow-bold">
      <Slider {...settings} className="relative w-full h-60 md:h-80">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-60 md:h-80 overflow-hidden">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center">
              <div className="text-center max-w-xl px-4">
                {/* Animated Text */}
                <motion.h2
                  key={`text-${activeSlide}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>

                {/* Animated CTA Button */}
                <motion.div
                  key={`cta-${activeSlide}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Link to={slide.link}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-300 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-lg"
                    >
                      Shop Now
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
