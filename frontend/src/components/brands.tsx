import React from 'react';


interface BrandCardProps {
    image: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ image }) => (
    <div className='  w-16 md:w-16 lg:w-14'>
        <img src={image} alt='brand' className='w-full h-14 md:h-18 lg:h-18 ' />
    </div>
)

const Brands: React.FC = () => {
    const brands = [
        { image: '/images/mng.png' },
        { image: '/images/kartasi.png' },
        { image: '/images/crayola.png' },
        { image: '/images/pelikan.png' },
        { image: '/images/guaca.png' },
        { image: '/images/oxford.png' },
        { image: '/images/bic.png'},
        { image: '/images/mentor.png'},
        { image: '/images/spotlight.png'},
        { image: '/images/ladybird.png'},
        { image: '/images/queenex.png'},
    ];

    return (
        <>
        <h1 className='text-4xl font-bold text-center mt-10 text-sunset'>Trusted Brands</h1>
        <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8  gap-4 mt-10  mb-10 justify-items-center max-w-full lg:max-w-7xl mx-auto'>
            {brands.map((brand) => (
                <BrandCard
                key={brand.image}
                image={brand.image} />
            ))}
        </div>
        <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
        </div>
        </>
    )
}

export default Brands;