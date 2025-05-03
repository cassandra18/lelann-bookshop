import React from 'react';
import HeroSection from '../components/carousel';
import Categories from '../components/categories';
import DeliveryOptions from '../components/delivery';
import Promotions from '../components/promotions';
import Brands from '../components/brands';
import FeaturedProducts from '../components/featured-products';
import BestSeller from '../components/best-seller';
import NewArrival from '../components/new-arrivals';
import WishList from '../components/wishlist';
import Newsletter from '../components/newsletter';

const Homepage: React.FC = () => {
  return (
    <div>
        <HeroSection />
        <Categories />
        <DeliveryOptions />
        <Promotions />
        <Brands />
        <FeaturedProducts />
        <BestSeller />
        <NewArrival />
        <WishList />
        <Newsletter />
    </div>
  )
}

export default Homepage;
