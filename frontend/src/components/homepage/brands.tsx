import React from "react";
import { motion } from "framer-motion";

interface BrandCardProps {
  image: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ image }) => (
  <div className="w-36 h-36 my-3 flex items-center justify-center bg-white backdrop-blur-md rounded-2xl shadow-lg border border-white/20 hover:scale-110 transition-transform duration-300">
    <img src={image} alt="brand" className="w-36 h-36 object-contain" />
  </div>
);

const Brands: React.FC = () => {
  const brands = [
    { image: "/images/mng.png" },
    { image: "/images/kartasi.png" },
    { image: "/images/crayola.png" },
    { image: "/images/pelikan.png" },
    { image: "/images/guaca.png" },
    { image: "/images/oxford.png" },
    { image: "/images/bic.png" },
    { image: "/images/mentor.png" },
    { image: "/images/spotlight.png" },
    { image: "/images/ladybird.png" },
    { image: "/images/queenex.png" },
  ];

  const doubledBrands = [...brands, ...brands]; // For infinite looping

  return (
    <section className="relative bg-[#02364d] text-white pt-20 pb-28 overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            fill="#001D29"
            d="M0,64L80,64C160,64,320,64,480,53.3C640,43,800,21,960,21.3C1120,21,1280,43,1360,53.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-300 mb-6">
        🤝 Trusted Brands
      </h1>
      <p className="text-center text-white mb-12 max-w-xl mx-auto px-4">
        Lelann proudly partners with globally trusted and loved brands to bring
        you the best in books, art supplies, stationery, and more.
      </p>

      {/* Scrolling Brand Marquee */}
      <div className="overflow-hidden relative w-full ">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {doubledBrands.map((brand, index) => (
            <BrandCard key={index} image={brand.image} />
          ))}
        </motion.div>
      </div>

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

export default Brands;
