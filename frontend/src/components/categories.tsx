import React from 'react';

interface CategoryCardProps {
    image: string;
    title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => (
    <div className='border rounded-lg shadow-lg bg-white  text-oxford-blue overflow-hidden w-36 md:w-28 lg:w-44 flex flex-col justify-between ml-2'>
        <img src={image} alt={title} className='w-full h-32 md:h-28 lg:h-36 object-cover' />
        <div className='text-center bg-gray-400 p-2 md:p-2 lg:p-4'>
            <h2 className='text-sm text-white lg:text-lg font-semibold'>{title}</h2>
        </div>
    </div>
)

const Categories: React.FC = () => {
    const categories = [
        { title: 'Stationaries', image: '/images/stationaries.jpeg' },
        { title: 'School Books', image: '/images/educational-books.jpeg' },
        { title: 'Other books', image: '/images/other-books.jpeg' },
        { title: 'Art Supplies', image: '/images/art-supplies.jpeg' },
        { title: 'Toys & games', image: '/images/toys.jpeg' },
        { title: 'Electronics', image: '/images/electronics.jpeg' },
        { title: 'Uniforms', image: '/images/uniforms.jpeg' },
    ];

    return (
        <>
        <h1 className='text-4xl font-bold text-center mt-10 text-sunset'>Shop by Category</h1>
        
        <div className='max-w-7xl mx-auto'>
        <div className='flex flex-wrap justify-center gap-3 mt-10  mb-10'>
            {categories.map((category) => (
                <CategoryCard
                key={category.title}
                title={category.title}
                image={category.image} />
            ))}
        </div>
        </div>
        <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
        </div>
        </>
    )
}


export default Categories;
