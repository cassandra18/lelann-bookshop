import React from 'react';
import { motion } from 'framer-motion';

interface PromotionCardProps {
  image: string;
  title: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const PromotionCard: React.FC<PromotionCardProps & { index: number }> = ({ image, title, index }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
    className="relative w-64 h-72 rounded-3xl bg-white/10 backdrop-blur-md overflow-hidden shadow-xl flex-shrink-0 border border-yellow-100  transition-shadow duration-300"
  >
    <img src={image} loading='lazy' alt={title} className="w-full h-full object-cover opacity-90" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm whitespace-nowrap">
      {title}
    </div>
  </motion.div>
);

const Promotions: React.FC = () => {
  const promotions = [
    { title: 'Discounts', image: '/images/notebook.jpg' },
    { title: 'Gifts to give', image: '/images/stickynotes.jpg' },
    { title: 'Sign up now!!!', image: '/images/lelann-kids-club.jpeg' },
    { title: 'Lelann Membership', image: '/images/lelann-membership.jpeg' },
  ];

  return (
    <section className=" text-white py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-5xl font-bold text-center text-yellow-300 mb-4"
      >
        🎁 Promotions
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-gray-200 max-w-xl mx-auto mb-12"
      >
        Don’t miss out on exciting deals, giveaways, and club perks — made just for our awesome Lelann customers.
      </motion.p>

      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory py-5 px-2 md:px-4">
        <div className="flex gap-6 w-max md:justify-center md:w-full px-2 md:px-4">
          {promotions.map((promo, idx) => (
            <PromotionCard key={idx} index={idx} {...promo} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Promotions;
