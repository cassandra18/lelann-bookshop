// import React, { useState, useEffect} from "react";
// import axios from "axios";

// interface NewArrivalCardProps {
//   image: string;
//   name: string;
//   author: { name: string };
//   price: number;
//   oldPrice?: number; // Optional for discounted products
//   discount?: number;
//   cta: string;
// }

// const NewArrivalCard: React.FC<NewArrivalCardProps> = ({
//   image,
//   name,
//   author,
//   price,
//   oldPrice,
//   discount,
//   cta,
// }) => (
//   <div className="relative border rounded-md hover:border-sunset shadow-lg overflow-hidden bg-white w-36 md:w-48 lg:w-48 flex flex-col justify-between  transform transition-transform duration-300 hover:scale-105">
//     {discount && (
//       <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1  mt-2 text-sm font-bold">
//         {discount}% OFF
//       </div>
//     )}



//     <div className="flex justify-center items-center p-2">
//       <img src={image} alt={name} className="h-36 w-36 md:w-38 md:h-38 lg:h-38" />
//     </div>
//     <div className="text-left ">
//       <div className="px-2">
//         <h3 className=" text-selective-yellow font-semibold">{name}</h3>
//         <p className="text-gray-500 ">{author?.name || ""}</p>
        
//         {oldPrice ? (
//             <div className="flex flex-col mt-2">
//                 <h4 className="text-sm text-gray-400 line-through">KES {oldPrice}</h4>
//                 <h4 className="text-prussian-blue text-md lg:text-lg font-semibold ">KES {price}</h4>
//             </div>
//         ) : (
//             <h4 className="text-md text-prussian-blue lg:text-lg font-semibold mt-2">
//                 KES {price}
//             </h4>
//         )}
//       </div>

//       <div className="mt-auto w-full">
//         <button className="bg-gray-400 text-white lg:text-lg  w-full p-2">{cta}</button>
//       </div>
//     </div>
//   </div>
// );

// const NewArrival: React.FC = () => {
//   const [newArrivals, setNewArrivals] = useState<NewArrivalCardProps[]>([]);

//   useEffect(() => {
//     const fetchNewArrivals = async () => {
//       try {
//         const response = await axios.get("https://lelann-bookshop.onrender.com/api/products?newarrival=true");
//         console.log("Fetched New Arrivals:", response.data);
//         setNewArrivals(response.data);
//       } catch (error) {
//         console.error("Error fetching New Arrivals:", error);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

  
//   return (
//     <>
//       <h1 className="text-4xl font-bold text-center mt-10 text-sunset">
//         Exciting New Arrivals
//       </h1>
//       <div className="flex flex-wrap justify-center  gap-4 mt-10  mb-10">
//         {newArrivals.map((product) => (
//           <NewArrivalCard
//             key={product.name}
//             name={product.name}
//             author={product.author}
//             price={product.price}
//             oldPrice={product.oldPrice}
//             discount={product.discount}
//             image={product.image}
//             cta={product.cta}
//           />
//         ))}
//       </div>
//       <div className="border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
//     </>
//   );
// };

// export default NewArrival;

import React from "react";

interface NewArrivalCardProps {
  image: string;
  name: string;
  author: { name: string };
  price: number;
  oldPrice?: number; // Optional for discounted products
  discount?: number;
  cta: string;
}

const NewArrivalCard: React.FC<NewArrivalCardProps> = ({
  image,
  name,
  author,
  price,
  oldPrice,
  discount,
  cta,
}) => (
  <div className="relative border rounded-md hover:border-sunset shadow-lg overflow-hidden bg-white w-36 md:w-48 lg:w-48 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105">
    {discount && (
      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 mt-2 text-sm font-bold">
        {discount}% OFF
      </div>
    )}
    <div className="flex justify-center items-center p-2">
      <img src={image} alt={name} className="h-36 w-36 md:w-38 md:h-38 lg:h-38" />
    </div>
    <div className="text-left">
      <div className="px-2">
        <h3 className="text-selective-yellow font-semibold">{name}</h3>
        <p className="text-gray-500">{author?.name || ""}</p>
        
        {oldPrice ? (
          <div className="flex flex-col mt-2">
            <h4 className="text-sm text-gray-400 line-through">KES {oldPrice}</h4>
            <h4 className="text-prussian-blue text-md lg:text-lg font-semibold">KES {price}</h4>
          </div>
        ) : (
          <h4 className="text-md text-prussian-blue lg:text-lg font-semibold mt-2">
            KES {price}
          </h4>
        )}
      </div>
      <div className="mt-auto w-full">
        <button className="bg-gray-400 text-white lg:text-lg w-full p-2">{cta}</button>
      </div>
    </div>
  </div>
);

const NewArrival: React.FC = () => {
  // Static data for new arrivals
  const newArrivals: NewArrivalCardProps[] = [
    {
      image: '/uploads/monk.jpeg',
      name: 'The Monk Who Sold His Ferrari',
      author: { name: 'Author One' },
      price: 1500,
      oldPrice: 2000, 
      discount: 25,
      cta: 'Buy Now',
    },
    {
      image: '/uploads/positive.jpeg',
      name: 'The Power of Positive Thinking',
      author: { name: 'Author Two' },
      price: 1800,
      cta: 'Buy Now',
    },
    {
      image: '/uploads/game.jpeg',
      name: 'The Game of Life and How to Play It',
      author: { name: 'Author Three' },
      price: 1200,
      oldPrice: 1500,
      discount: 20,
      cta: 'Buy Now',
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 text-sunset">
        Exciting New Arrivals
      </h1>
      <div className="flex flex-wrap justify-center gap-4 mt-10 mb-10">
        {newArrivals.map((product) => (
          <NewArrivalCard
            key={product.name}
            name={product.name}
            author={product.author}
            price={product.price}
            oldPrice={product.oldPrice}
            discount={product.discount}
            image={product.image}
            cta={product.cta}
          />
        ))}
      </div>
      <div className="border-b border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
    </>
  );
};

export default NewArrival;
