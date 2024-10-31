// import React, { useState, useEffect} from "react";
// import axios from "axios";

// interface BestSellerCardProps {
//   image: string;
//   name: string;
//   author: { name: string};
//   price: number;
//   originalPrice?: number; // Optional for discounted products
//   discountPercentage?: number; // Optional for discounted products
//   rating: number;
//   cta: string;
// }

// const BestSellerCard: React.FC<BestSellerCardProps> = ({
//   image,
//   name,
//   author,
//   price,
//   rating,
//   cta,
// }) => (
//   <div className="border rounded-lg hover:border-selective-yellow shadow-lg overflow-hidden bg-white w-36 md:w-48 lg:w-48 flex flex-col justify-between  transform transition-transform duration-300 hover:scale-105">

//     <div className="flex justify-center items-center p-2">
//       <img src={image} alt={name} className="h-36 w-36 md:w-38 md:h-38 lg:h-38" />
//     </div>
//     <div className="text-left ">
//       <div className="px-2">
//         <h3 className=" text-selective-yellow font-semibold">{name}</h3>
//         <p className="text-gray-500 ">{author.name}</p>
        
//         <div className="flex justify-between my-2">
//           <h4 className="text-md text-prussian-blue lg:text-lg font-semibold">
//             KES {price}
//           </h4>
//           <div className="rating text-right ">
//             <span className=" text-gray-400 text-lg font-semibold">
//               {rating}
//             </span>
//             <span className="text-selective-yellow text-lg ml-1">&#9733;</span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-auto w-full">
//         <button className="bg-gray-400 text-white lg:text-lg   w-full p-2">{cta}</button>
//       </div>
//     </div>
//   </div>
// );

// const BestSeller: React.FC = () => {
//   const [bestSellers, setBestSellers] = useState<BestSellerCardProps[]>([]);

//   useEffect(() => {
//     const fetchBestSellers = async () => {
//       try {
//         const response = await axios.get("https://lelann-bookshop.onrender.com/api/products?bestseller=true");
//         console.log("Fetched Best Sellers:", response.data);
//         setBestSellers(response.data);
//       } catch (error) {
//         console.error("Error fetching best sellers:", error);
//       }
//     };

//     fetchBestSellers();
//   }, []); // Empty dependency array to run once when the component mounts

//   return (
//     <>
//       <h1 className="text-4xl font-bold text-center mt-10 text-sunset">
//         Best Sellers
//       </h1>
//       <div className="flex flex-wrap justify-center  gap-4 mt-10  mb-10">
//         {bestSellers.map((product) => (
//           <BestSellerCard
//             key={product.name}
//             name={product.name}
//             author={product.author}
//             price={product.price}
//             image={product.image}
//             rating={5}
//             cta={product.cta}
//           />
//         ))}
//       </div>
//       <div className="border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
//     </>
//   );
// };

// export default BestSeller;




import React from "react";

interface BestSellerCardProps {
  image: string;
  name: string;
  author: { name: string };
  price: number;
  originalPrice?: number; // Optional for discounted products
  discountPercentage?: number; // Optional for discounted products
  rating: number;
  cta: string;
}

const BestSellerCard: React.FC<BestSellerCardProps> = ({
  image,
  name,
  author,
  price,
  rating,
  cta,
}) => (
  <div className="border rounded-lg hover:border-selective-yellow shadow-lg overflow-hidden bg-white w-36 md:w-48 lg:w-48 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105">
    <div className="flex justify-center items-center p-2">
      <img src={image} alt={name} className="h-36 w-36 md:w-38 md:h-38 lg:h-38" />
    </div>
    <div className="text-left">
      <div className="px-2">
        <h3 className="text-selective-yellow font-semibold">{name}</h3>
        <p className="text-gray-500">{author.name}</p>
        <div className="flex justify-between my-2">
          <h4 className="text-md text-prussian-blue lg:text-lg font-semibold">
            KES {price}
          </h4>
          <div className="rating text-right">
            <span className="text-gray-400 text-lg font-semibold">{rating}</span>
            <span className="text-selective-yellow text-lg ml-1">&#9733;</span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full">
        <button className="bg-gray-400 text-white lg:text-lg w-full p-2">{cta}</button>
      </div>
    </div>
  </div>
);

const BestSeller: React.FC = () => {
  const bestSellers: BestSellerCardProps[] = [
    {
      image: '/uploads/alchemist.jpeg',
      name: 'The Alchemist',
      author: { name: 'Paulo Coelho' },
      price: 1500,
      rating: 5,
      cta: 'Buy Now',
    },
    {
      image: '/uploads/lean-startup.jpeg',
      name: 'The Lean Startup',
      author: { name: 'Eric Ries' },
      price: 2000,
      rating: 4.5,
      cta: 'Buy Now',
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 text-sunset">Best Sellers</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-10 mb-10">
        {bestSellers.map((product) => (
          <BestSellerCard
            key={product.name}
            name={product.name}
            author={product.author}
            price={product.price}
            image={product.image}
            rating={product.rating}
            cta={product.cta}
          />
        ))}
      </div>
      <div className="border-b border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
    </>
  );
};

export default BestSeller;
