import React from "react";

interface NewArrivalCardProps {
  imageUrl: string;
  title: string;
  author: string;
  price: number;
  newProduct?: string;
  originalPrice?: number; // Optional for discounted products
  discountPercentage?: number;
  cta: string;
}

const NewArrivalCard: React.FC<NewArrivalCardProps> = ({
  imageUrl,
  title,
  author,
  price,
  newProduct,
  originalPrice,
  discountPercentage,
  cta,
}) => (
  <div className="relative border rounded-md hover:border-sunset shadow-lg overflow-hidden bg-white w-36 md:w-48 lg:w-48 flex flex-col justify-between">
    {discountPercentage && (
      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1  mt-2 text-sm font-bold">
        {discountPercentage}% OFF
      </div>
    )}

    {newProduct && (
      <div className="absolute top-0 right-0 bg-blue-950 text-white px-4 py-1 mt-2 text-sm font-regular shadow-md">
        {newProduct}
      </div>
    )}

    <img src={imageUrl} alt={title} className="w-full h-38 md:h-42 lg:h-42 p-3" />
    
    <div className="text-left ">
      <div className="px-2">
        <h3 className=" text-black font-semibold">{title}</h3>
        <p className="text-gray-500 font-serif">{author}</p>
        
        {originalPrice ? (
            <div className="flex flex-col mt-2">
                <p className="text-sm text-gray-400 line-through">KES {originalPrice}</p>
                <p className="text-prussian-blue text-sm lg:text-lg font-semibold ">KES {price}</p>
            </div>
        ) : (
            <p className="text-sm text-prussian-blue lg:text-lg font-semibold mt-2">
                KES {price}
            </p>
        )}
      </div>

      <div className="mt-auto w-full">
        <button className="bg-gray-400 text-white w-full p-2">{cta}</button>
      </div>
    </div>
  </div>
);

const NewArrival: React.FC = () => {
  const newArrivals = [
    {
      title: "The Monk Who Sold His Ferrari",
      author: "Robin Sharma",
      imageUrl: "/images/monk.jpeg",
      newProduct: "New",
      price: 2000,
      cta: "Add to cart",
    },
    {
      title: "The Game of Life and How to Play It",
      author: "Florence Scovel Shinn",
      imageUrl: "/images/game.jpeg",
      price: 2000,
      originalPrice: 2500,
      discountPercentage: 20,
      cta: "Add to cart",
    },
    {
      title: "Feeling is the Secret",
      author: "Neville Goddard",
      imageUrl: "/images/feeling.jpeg",
      newProduct: "New",
      price: 1500,
      cta: "Add to cart",
    },
    {
      title: "Power of Positive Thinking",
      author: "Norman Vincent Peale",
      imageUrl: "/images/positive.jpeg",
      newProduct: "New",
      price: 1800,
      cta: "Add to cart",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10 text-sunset">
        New Arrivals
      </h1>
      <div className="flex flex-wrap justify-center  gap-4 mt-10  mb-10">
        {newArrivals.map((product) => (
          <NewArrivalCard
            key={product.title}
            title={product.title}
            author={product.author}
            price={product.price}
            newProduct={product.newProduct}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
            imageUrl={product.imageUrl}
            cta={product.cta}
          />
        ))}
      </div>
      <div className="border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
    </>
  );
};

export default NewArrival;
