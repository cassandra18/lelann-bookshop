import React from "react";

interface WishListCardProps {
  title: string;
  owner?: string;
  price: number;
  image: string;
}

const WishListCard: React.FC<WishListCardProps> = ({
  title,
  owner,
  price,
  image,
}) => (
  <div className="relative group hover:border-2 hover:border-sunset rounded-lg shadow-lg hover:shadow-xl bg-white p-4 w-full h-auto lg:h-52  transform transition-transform duration-300 hover:scale-95">
    <div className="absolute -top-8 right-4 w-16 md:w-24 lg:w-48 h-16 md:h-24 lg:h-48 z-10 shadow-xl transform transition-transform duration-300 group-hover:scale-110">
      <img src={image} alt="product" className="w-full h-full object-contain" />
    </div>

    <div className="flex flex-col text-left">
      <h5 className="text-lg md:text-xl font-bold text-selective-yellow">{title}</h5>
      {owner && <p className="text-sm text-gray-600">{owner}</p>}
      <h4 className="text-base md:text-lg font-semibold text-gray-800 mt-2">
        KES {price}
      </h4>
    </div>
  </div>
);

const WishList: React.FC = () => {
  const wishList = [
    {
      title: "Coloring Book",
      owner: "Kartasi",
      price: 500,
      image: "/images/coloring-book.jpeg",
    },
    {
      title: "Barbie School Bag",
      owner: "King's Collection",
      price: 2000,
      image: "/images/barbie-bag.jpeg",
    },
    {
      title: "Scrabble",
      owner: "Hasbro",
      price: 1500,
      image: "/images/scrabble.jpeg",
    },
    {
      title: "Examination Kit",
      owner: "Lelann",
      price: 3000,
      image: "/images/exam.jpeg",
    },
    {
      title: "The Lean Startup",
      owner: "Eric Ries",
      price: 2500,
      image: "/images/lean-startup.jpeg",
    },
    {
      title: "The Power of Habit",
      owner: "Charles Duhigg",
      price: 1800,
      image: "/images/power-of-habit.jpeg",
    },
    {
      title: "The 5 AM Club",
      owner: "Robin Sharma",
      price: 2200,
      image: "/images/5-am-club.jpeg",
    },
  ];

  return (
    <section className="relative bg-[#1e87b5] text-white overflow-hidden pt-20 pb-28 my-20 ">
{/* Top Wavy SVG */}
<div className="absolute top-0 left-0 w-full">
  <svg
    className="w-full h-[80px]"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,30 
         C150,80 350,-20 600,30 
         C850,80 1050,-20 1200,30 
         L1200,0 
         L0,0 
         Z"
      fill="#001D29"
    />
  </svg>
</div>



      <div className="">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-300 mb-6">🪄 Your Wishlist</h1>
        <p className="text-white text-md md:text-lg text-center mt-4 mb-20 ">
          Browse your saved items. Add them to your cart whenever you're ready to shop!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 md:px-10 justify-items-center max-w-full mx-auto">
          {wishList.map((item, index) => (
            <WishListCard
              key={index}
              title={item.title}
              owner={item.owner}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>

     {/* Bottom Wavy SVG */}
     <div className="absolute bottom-0 left-0 w-full leading-none">
        <svg
          className="w-full h-[100px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#001D29"
            d="M0,100 C480,0 960,100 1440,0 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

    </section>
  );
};

export default WishList;
