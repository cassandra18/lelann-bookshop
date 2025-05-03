import React from 'react';
import HeroSection from '../components/homepage/carousel';
import Categories from '../components/homepage/categories';
import DeliveryOptions from '../components/homepage/delivery';
import Promotions from '../components/homepage/promotions';
import Brands from '../components/homepage/brands';
import FeaturedProducts from '../components/homepage/featured-products';
import BestSeller from '../components/homepage/best-seller';
import NewArrival from '../components/homepage/new-arrivals';
import WishList from '../components/homepage/wishlist';
import Newsletter from '../components/homepage/newsletter';

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
