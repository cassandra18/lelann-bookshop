import React from 'react';

interface FeaturedProductCardProps {
    image: string;
    title: string;
    price: string;
    cta: string;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ image, title, price, cta }) => (
    <div className='border rounded-sm hover:border-selective-yellow shadow-lg overflow-hidden bg-white w-36 md:w-44 lg:w-44 flex flex-col justify-between'>
        <img src={image} alt={title} className='w-full h-38 md:h-36 lg:h-36 ' />
        <div className='text-left  mt-auto'>
            <div className='p-2'>
            <h2 className='text-lg text-selective-yellow font-semibold'>{title}</h2>
            <p className='text-sm text-prussian-blue lg:text-lg font-semibold'>{price}</p>
            </div>
            <div className='mt-auto w-full'>
            <button className='bg-gray-400 text-white w-full p-2'>
                {cta}
            </button>
        </div>
        </div>
    </div>
)

const FeaturedProducts: React.FC = () => {
    const featuredProducts = [
        { title: 'Laptop', price: 'KES 50,000', image: '/images/lenovo-laptop.jpeg', cta: 'Add to cart' },
        { title: 'Sticky notes', price: 'KES 250', image: '/images/stickynotes.jpeg', cta: 'Add to cart' },
        { title: 'Pelikan pencils', price: 'KES 600', image: '/images/pencils.png', cta: 'Add to cart' },
        { title: 'Water colors', price: 'KES 1000', image: '/images/water-colors.png', cta: 'Add to cart' },
    ];

    return (
        <>
        <h1 className='text-3xl font-bold text-center mt-10 text-sunset'>Featured Products</h1>
        <div className='flex flex-wrap justify-center  gap-4 mt-10  mb-10'>
            {featuredProducts.map((product) => (
                <FeaturedProductCard
                key={product.title}
                title={product.title}
                price={product.price}
                image={product.image}
                cta={product.cta} />
            ))}
        </div>
        <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
        </div>
        </>
    )
}

export default FeaturedProducts;