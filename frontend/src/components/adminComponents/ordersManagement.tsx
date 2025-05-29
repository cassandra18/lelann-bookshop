import { useState } from 'react';
import { Search } from 'lucide-react';


const mockOrders = [
  { id: 'ORD001', customer: 'Alice Smith', date: '2023-01-15', total: 22.49, status: 'Completed', items: [{bookId: '1', title: 'The Great Gatsby', quantity: 1}, {bookId: '2', title: '1984', quantity: 1}] },
  { id: 'ORD002', customer: 'Bob Johnson', date: '2023-01-16', total: 10.25, status: 'Pending', items: [{bookId: '3', title: 'To Kill a Mockingbird', quantity: 1}] },
  { id: 'ORD003', customer: 'Charlie Brown', date: '2023-01-17', total: 14.00, status: 'Shipped', items: [{bookId: '5', title: 'The Hobbit', quantity: 1}] },
  { id: 'ORD004', customer: 'Diana Prince', date: '2023-01-18', total: 21.74, status: 'Completed', items: [{bookId: '4', title: 'Pride and Prejudice', quantity: 1}, {bookId: '1', title: 'The Great Gatsby', quantity: 1}] },
];

const OrdersManagement = () => {
  // This section uses mock data as no backend endpoints for orders were provided.
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(order => (order.id === id ? { ...order, status: newStatus } : order)));
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders Management (Mock Data)</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;
