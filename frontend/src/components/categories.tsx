import React from 'react';

interface CategoryCardProps {
    image: string;
    title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => (
    <div className='border rounded-lg shadow-lg overflow-hidden w-36 md:w-28 lg:w-44'>
        <img src={image} alt={title} className='w-full h-32 md:h-28 lg:h-36 object-cover' />
        <div className='text-center p-2 md:p-2 lg:p-4'>
            <h2 className='text-sm lg:text-lg font-semibold'>{title}</h2>
        </div>
    </div>
)

const Categories: React.FC = () => {
    const categories = [
        { title: 'Stationaries', image: '/images/stationaries.jpeg' },
        { title: 'Cirriculum Books', image: '/images/educational-books.jpeg' },
        { title: 'Other books', image: '/images/other-books.jpeg' },
        { title: 'Art Supplies', image: '/images/art-supplies.jpeg' },
        { title: 'Toys & Board games', image: '/images/toys.jpeg' },
        { title: 'Electronics', image: '/images/electronics.jpeg' },
        { title: 'Uniforms', image: '/images/uniforms.jpeg' },
    ];

    return (
        <>
        <h1 className='text-3xl font-bold text-center mt-10 text-sunset'>Shop by Category</h1>
        <div className='flex flex-wrap justify-center gap-4 mt-10  mb-10'>
            {categories.map((category) => (
                <CategoryCard
                key={category.title}
                title={category.title}
                image={category.image} />
            ))}
        </div>
        <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
        </div>
        </>
    )
}


export default Categories;
