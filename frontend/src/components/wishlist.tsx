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
  <div className="relative group hover:border-2 hover:border-sunset rounded-lg shadow-lg hover:shadow-xl bg-white p-4 w-full h-auto lg:h-52 mb-14 transform transition-transform duration-300 hover:scale-95">
    {/* Image floating above the card */}
    <div className="absolute -top-8 right-4 w-16 md:w-24 lg:w-48 h-16 md:h-24 lg:h-48 z-10 shadow-xl transform transition-transform duration-300 group-hover:scale-110">
      <img
        src={image}
        alt="product"
        className="w-full h-full object-contain"
      />
    </div>

    {/* Text container - aligned to the top-left */}
    <div className="flex flex-col text-left">
      <h5 className="text-lg md:text-xl font-bold text-gray-900">{title}</h5>
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
    <>
    <h1 className="text-4xl font-bold text-center mt-10 text-sunset">Your WishList</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-20 justify-items-center max-w-full lg:max-w-7xl mx-auto">
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
    </>
  );
};

export default WishList;
