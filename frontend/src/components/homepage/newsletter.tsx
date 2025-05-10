import React from 'react';

interface NewsletterProps {
    image: string;
    title: string;
    description: string;
    inputPlaceholder: string;
    buttonText: string;
}

const NewsletterCard: React.FC<NewsletterProps> = ({
    image,
    title,
    description,
    inputPlaceholder,
    buttonText
}) => (
    <div className="relative max-w-full lg:max-w-7xl mx-auto mb-16 px-4">
        {/* Background Overlay */}
        <div className="absolute inset-0 rounded-xl z-0 shadow-md backdrop-blur-10"></div>

        {/* Newsletter Content */}
        <div className="newsletter-container flex md:flex-row flex-col gap-8 items-center p-8 relative z-10 rounded-xl">
            {/* Newsletter Image */}
            {image && (
                <img
                    src={image}
                    alt="Newsletter"
                    className="w-64 h-64 mb-4 object-cover rounded-lg shadow-md"
                />
            )}

            <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-yellow-300">
                    {title}
                </h2>

                {/* Newsletter Description */}
                <p className="mb-4 text-white">
                    {description}
                </p>

                {/* Email Input and Signup Button */}
                <div className="flex w-full max-w-md">
                    <input
                        type="email"
                        placeholder={inputPlaceholder}
                        className="flex-grow p-2 rounded-l-md bg-gray-700 text-white focus:outline-1 focus:outline-yellow-200"
                    />
                    <button
                        className="p-2 px-4 bg-yellow-100 text-[#001D29] font-semibold rounded-r-md hover:bg-yellow-300 transition"
                    >
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
