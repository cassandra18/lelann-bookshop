import React from 'react';

interface NewsletterProps {
    image: string;
    title: string;
    description: string;
    inputPlaceholder: string;
    buttonText: string;
}


const NewsletterCard: React.FC<NewsletterProps> = ({ image, title, description, inputPlaceholder, buttonText }) => (
    
        <div className="newsletter-container flex md:flex-row flex-col gap-12 items-center p-8  bg-sunset  max-w-full lg:max-w-7xl mx-auto mb-1">
        {/* Newsletter Image */}
        <img src={image} alt="Newsletter" className="w-64 h-64 mb-4 object-cover" />
    
        <div className=''>
        <h2 className="text-xl font-bold mb-2 text-oxford-blue">{title}</h2>
    
        {/* Newsletter Description */}
        <p className="text-gray-800  mb-4">{description}</p>
    
        {/* Email Input and Signup Button */}
        <div className="flex w-full max-w-md">
          <input
            type="email"
            placeholder={inputPlaceholder}
            className="flex-grow p-2 border bg-white text-gray-600 rounded-sm focus:border-gray-400 focus:outline-none"
          />
          <button className="p-2 bg-gray-400 text-white rounded-sm hover:bg-gray-600">
            {buttonText}
          </button>
          </div>
        </div>
      </div>

    );

const Newsletter: React.FC = () => {
    return (
        <NewsletterCard
            image="/images/newsletter.jpeg"
            title="Be part of the Lelann Family"
            description="Sign up to our newsletter to get the latest news and updates on our special offers"
            inputPlaceholder="Enter your email"
            buttonText="Subscribe"
        />
    );
};


export default Newsletter;