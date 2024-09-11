import React from 'react';
import HeroSection from '../components/carousel';
import Categories from '../components/categories';
import DeliveryOptions from '../components/delivery';
import Promotions from '../components/promotions';

const Homepage: React.FC = () => {
  return (
    <div>
        <HeroSection />
        <Categories />
        <DeliveryOptions />
        <Promotions />
    </div>
  )
}

export default Homepage;
