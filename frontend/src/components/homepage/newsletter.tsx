import React from 'react';

interface NewsletterProps {
    image: string;
    title: string;
    description: string;
    inputPlaceholder: string;
    buttonText: string;
}

const NewsletterCard: React.FC<NewsletterProps> = ({ image, title, description, inputPlaceholder, buttonText }) => (
    <div className="relative max-w-full lg:max-w-7xl mx-auto mb-1">
        {/* Background with opacity */}
        <div className="absolute inset-0 bg-sunset opacity-10 z-0"></div>

        {/* Newsletter Content */}
        <div className="newsletter-container flex md:flex-row flex-col gap-12 items-center p-8 relative z-10">
            {/* Newsletter Image */}
            <img src={image} alt="Newsletter" className="w-64 h-64 mb-4 object-cover" />

            <div>
                <h2 className="text-3xl font-bold mb-4" style={{color: "#B52717"}}>{title}</h2>

                {/* Newsletter Description */}
                <p className=" mb-4" style={{color: "#FDFEEF"}}>{description}</p>

                {/* Email Input and Signup Button */}
                <div className="flex w-full max-w-md">
                    <input
                        type="email"
                        placeholder={inputPlaceholder}
                        className="flex-grow p-2 border bg-white text-gray-600 rounded-sm focus:border-gray-400 focus:outline-none"
                    />
                    <button className="p-2 text-white rounded-sm hover:bg-gray-600" style={{background: "#B52717"}}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Newsletter: React.FC = () => {
    return (
        <NewsletterCard
            image="/images/newsletter.jpeg"
            title="Be part of the Lelann Family"
            description="Subscribe to our newsletter to get the latest news and updates on our special offers"
            inputPlaceholder="Enter your email"
            buttonText="Subscribe"
        />
    );
};

export default Newsletter;
