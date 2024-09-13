import React from 'react';
import HeroSection from '../components/carousel';
import Categories from '../components/categories';
import DeliveryOptions from '../components/delivery';
import Promotions from '../components/promotions';
import Brands from '../components/brands';
import FeaturedProducts from '../components/featured-products';
import UniformCarousel from '../components/carouselb';

const Homepage: React.FC = () => {
  return (
    <div>
        <HeroSection />
        <Categories />
        <DeliveryOptions />
        <Promotions />
        <Brands />
        <FeaturedProducts />
        <UniformCarousel />
    </div>
  )
}

export default Homepage;
