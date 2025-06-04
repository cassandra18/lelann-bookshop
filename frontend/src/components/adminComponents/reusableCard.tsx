// Reusable Card Component
interface CardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  className?: string;
}

const Card = ({ title, value, icon: Icon, className = '' }: CardProps) => (
  <div className={`bg-white p-6 rounded-xl shadow-md flex items-center justify-between ${className}`}>
    <div>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <div className="text-blue-500 bg-blue-100 p-3 rounded-full">
      <Icon size={32} />
    </div>
  </div>
);

export default Card;