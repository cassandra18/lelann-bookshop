import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/notebook.jpg',
      title: '📚 Back to School Bonanza!',
      link: '/offers/back-to-school',
    },
    {
      id: 2,
      image: '/images/stickynotes.jpg',
      title: '🗒️ Sticky Note Mania!',
      link: '/offers/stickynotes',
    },
    {
      id: 3,
      image: '/images/back-to-school.jpg',
      title: '✏️ Top Stationery Picks!',
      link: '/offers/stationery',
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
      },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative mb-20 overflow-hidden barlow-bold">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="relative w-full h-60 md:h-96"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="absolute w-full h-full object-cover"
              variants={imageVariants}
              initial="hidden"
              animate={index === activeIndex ? "visible" : "hidden"}
              exit="exit"
              key={slide.id + '-img'}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center">
              <div className="text-center max-w-xl px-4">
                <AnimatePresence mode="wait">
                  {index === activeIndex && (
                    <div key={slide.id + '-content'}>
                      <motion.h2
                        className="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg"
                        variants={titleVariants}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        exit="exit"
                        key={slide.id + '-title'}
                      >
                        {slide.title}
                      </motion.h2>

                      <motion.div
                        variants={buttonVariants}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        exit="exit"
                        key={slide.id + '-button-wrapper'}
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
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;