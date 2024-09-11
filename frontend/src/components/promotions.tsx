import React from 'react';

interface PromotionCardProps {
    image: string;
    title: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, title }) => (
    <div className='border rounded-lg shadow-lg overflow-hidden w-auto md:w-28 lg:w-44'>
        <img src={image} alt={title} className='w-full h-32 md:h-28 lg:h-36 object-cover' />
        <div className='text-center bg-red-500 p-2 md:p-2 lg:p-4'>
            <h2 className='text-sm lg:text-lg font-semibold'>{title}</h2>
        </div>
    </div>
)

const Promotions: React.FC = () => {
    const promotions = [
        { title: 'Discounts', image: '/images/discounts.jpeg' },
        { title: 'Gift with purchase', image: '/images/gifts.jpeg' },
        { title: 'SIgn up now!!!', image: '/images/lelann-kids-club.jpeg' },
        { title: 'Sign up now!!!', image: '/images/lelann-membership.jpeg' },
    ];

    return (
        <>
        <div className='flex flex-wrap justify-center w-3/4 gap-4 mt-10  mb-10'>
            {promotions.map((promotion) => (
                <PromotionCard
                key={promotion.title}
                title={promotion.title}
                image={promotion.image} />
            ))}
        </div>
        <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
        </div>
        </>
    )
}

export default Promotions;