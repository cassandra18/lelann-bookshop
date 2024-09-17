import React from 'react';

interface PromotionCardProps {
    image: string;
    title: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, title }) => (
    <div className=' rounded-sm overflow-hidden w-36 md:w-36 lg:w-44 flex flex-col justify-between transform transition-transform duration-300 hover:scale-95'>
        <img src={image} alt={title} className='w-full h-32 md:h-36 lg:h-36  object-cover' />
        <div className='text-center p-2 mt-auto md:p-2 lg:p-4' style={{background: "#B52717"}}>
            <h2 className='text-md lg:text-lg  font-semibold'>{title}</h2>
        </div>
    </div>
)

const Promotions: React.FC = () => {
    const promotions = [
        { title: 'Discounts', image: '/images/notebook.jpg' },
        { title: 'Gifts to give', image: '/images/stickynotes.jpg' },
        { title: 'Sign up now!!!', image: '/images/lelann-kids-club.jpeg' },
        { title: 'Sign up now!!!', image: '/images/lelann-membership.jpeg' },
    ];

    return (
        <>
        <h1 className='text-4xl font-bold text-center mt-10 text-sunset'>Promotions</h1>
        <div className='flex flex-wrap justify-center  gap-4 mt-10  mb-10'>
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