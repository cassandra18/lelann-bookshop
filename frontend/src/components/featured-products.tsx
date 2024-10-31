// import React, { useState, useEffect} from 'react';
// import axios from 'axios';

// interface FeaturedProductCardProps {
//     image: string;
//     name: string;
//     price: string;
//     cta: string;
// }

// const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ image, name, price, cta }) => (
//     <div className='border rounded-sm hover:border-selective-yellow shadow-lg overflow-hidden bg-white w-36 md:w-44 lg:w-44 flex flex-col justify-between  transform transition-transform duration-300 hover:scale-95'>
//         <img src={image} alt={name} className='w-full h-32 md:h-36 lg:h-36 ' />
//         <div className='text-left  mt-auto'>
//             <div className='p-2'>
//             <h2 className='text-lg text-selective-yellow font-semibold'>{name}</h2>
//             <h4 className='text-md text-prussian-blue lg:text-lg font-semibold'>{price}</h4>
//             </div>
//             <div className='mt-auto w-full'>
//             <button className='bg-gray-400 text-white lg:text-lg  w-full p-2'>
//                 {cta}
//             </button>
//         </div>
//         </div>
//     </div>
// )

// const FeaturedProducts: React.FC = () => {
//     const [featuredProducts, setFeaturedProducts] = useState<FeaturedProductCardProps[]>([]);

//     useEffect(() => {
//         const fetchFeaturedProducts = async () => {
//             try {
//                 const response = await axios.get('https://lelann-bookshop.onrender.com/api/products?featured=true');
//                 console.log('Fetched Products:', response.data); 
//                 setFeaturedProducts(response.data);
//             } catch (error) {
//                 console.error('Error fetching featured products:', error);
//             }
//         };

//         fetchFeaturedProducts();
//     }, []);

//     return (
//         <>
//         <h1 className='text-4xl font-bold text-center mt-10 text-sunset'>Featured Products</h1>
//         <div className='flex flex-wrap justify-center  gap-4 mt-10  mb-10'>
//             {featuredProducts.map((product) => (
//                 <FeaturedProductCard
//                 key={product.name}
//                 name={product.name}
//                 price={product.price}
//                 image={product.image}
//                 cta={product.cta} />
//             ))}
//         </div>
//         <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
//         </div>
//         </>
//     )
// }

// export default FeaturedProducts;



import React from 'react';

interface FeaturedProductCardProps {
    image: string;
    name: string;
    price: string;
    cta: string;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ image, name, price, cta }) => (
    <div className='border rounded-sm hover:border-selective-yellow shadow-lg overflow-hidden bg-white w-36 md:w-44 lg:w-44 flex flex-col justify-between transform transition-transform duration-300 hover:scale-95'>
        <img src={image} alt={name} className='w-full h-32 md:h-36 lg:h-36' />
        <div className='text-left mt-auto'>
            <div className='p-2'>
                <h2 className='text-lg text-selective-yellow font-semibold'>{name}</h2>
                <h4 className='text-md text-prussian-blue lg:text-lg font-semibold'>{price}</h4>
            </div>
            <div className='mt-auto w-full'>
                <button className='bg-gray-400 text-white lg:text-lg w-full p-2'>
                    {cta}
                </button>
            </div>
        </div>
    </div>
);

const FeaturedProducts: React.FC = () => {
    // Static data for featured products
    const featuredProducts: FeaturedProductCardProps[] = [
        {
            image: '/uploads/stickynotes.jpeg', // Ensure you have the correct image paths
            name: 'Sticky notes',
            price: '500',
            cta: 'Buy Now',
        },
        {
            image: '/uploads/lenovo-laptop.jpeg',
            name: 'Lenovo Laptop',
            price: 'KES 32,000',
            cta: 'Buy Now',
        },
    ];

    return (
        <>
            <h1 className='text-4xl font-bold text-center mt-10 text-sunset'>Featured Products</h1>
            <div className='flex flex-wrap justify-center gap-4 mt-10 mb-10'>
                {featuredProducts.map((product) => (
                    <FeaturedProductCard
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        cta={product.cta} 
                    />
                ))}
            </div>
            <div className='border-b border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'></div>
        </>
    );
}

export default FeaturedProducts;
