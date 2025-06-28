import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Book, ShoppingCart, Users, Package, Loader2, DollarSign, TrendingUp, Clock } from 'lucide-react'; // Added DollarSign, TrendingUp, TrendingDown, Clock icons
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from './reusableCard'; // Assuming your Card component is flexible enough
import { Link } from 'react-router-dom'; // Import Link for quick actions

const BASE_URL = 'http://localhost:5000/api';

// --- BEGIN MOCK DATA (REPLACE WITH REAL API CALLS) ---
// In a real application, you'd fetch this data from your backend.
// These mocks demonstrate the *type* of data you'd expect.

// Mock data for recent orders
const mockRecentOrders = [
  { id: 'ORD005', customer: 'Eve Davis', date: '2025-06-03', total: 35.00, status: 'Completed' },
  { id: 'ORD006', customer: 'Frank White', date: '2025-06-02', total: 18.50, status: 'Pending' },
  { id: 'ORD007', customer: 'Grace Lee', date: '2025-06-02', total: 29.99, status: 'Shipped' },
  { id: 'ORD008', customer: 'Henry King', date: '2025-06-01', total: 12.00, status: 'Completed' },
  { id: 'ORD009', customer: 'Ivy Chen', date: '2025-05-31', total: 50.25, status: 'Pending' },
];

// Mock data for sales overview (e.g., last 7 days)
const mockDailySales = [
  { date: 'Jun 2', sales: 1200 },
  { date: 'Jun 3', sales: 1500 },
  { date: 'Jun 4', sales: 1350 }, // Today's mock sales
  { date: 'Jun 5', sales: 1700 },
  { date: 'Jun 6', sales: 1400 },
  { date: 'Jun 7', sales: 1900 },
  { date: 'Jun 8', sales: 1600 },
];

// Mock data for top-selling categories (replace with actual book categories)
const mockTopCategories = [
    { name: 'Fiction', sales: 7500 },
    { name: 'Non-Fiction', sales: 6000 },
    { name: 'Educational', sales: 9000 },
    { name: 'Fantasy', sales: 4000 },
    { name: 'Science', sales: 3000 },
];

// --- END MOCK DATA ---

const DashboardOverview = () => {
  const { isAuthenticated } = useAuth();
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0); // New: Total Revenue
  const [newUsersToday, setNewUsersToday] = useState<number>(0); // New: New Users Today
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Derive from mock data for now, but these would also be from API calls
  const totalOrders = mockRecentOrders.length; // You'd fetch total orders from backend
  const pendingOrders = mockRecentOrders.filter(order => order.status === 'Pending').length;
  const averageOrderValue = totalOrders > 0 ? mockRecentOrders.reduce((acc, order) => acc + order.total, 0) / totalOrders : 0;


  const fetchDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      // Fetch books count
      const booksResponse = await axios.get(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTotalBooks(booksResponse.data.length);

      // Fetch users count & new users today
      // In a real scenario, your user endpoint might return more aggregated data.
      const usersResponse = await axios.get(`${BASE_URL}/user/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTotalUsers(usersResponse.data.length);
      // Mocking new users for today
      setNewUsersToday(usersResponse.data.filter((user: any) => new Date(user.createdAt).toDateString() === new Date().toDateString()).length);

      // Fetch total revenue (This would be a dedicated backend endpoint)
      // For now, let's sum up mock sales data as a placeholder
      setTotalRevenue(mockDailySales.reduce((sum, day) => sum + day.sales, 0));

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="ml-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-4xl font-extrabold text-yellow-300 mb-8 tracking-tight">📊 Dashboard Overview</h2>


      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Books" value={totalBooks} icon={Book} />
        <Card title="Total Orders" value={totalOrders} icon={ShoppingCart} />
        <Card title="Pending Orders" value={pendingOrders} icon={Package} className="bg-yellow-50 text-yellow-800" />
        <Card title="Total Users" value={totalUsers} icon={Users} />
        <Card title="Total Revenue" value={`Ksh ${totalRevenue.toLocaleString()}`} icon={DollarSign} className="bg-green-50 text-green-800" />
        <Card title="New Users Today" value={newUsersToday} icon={TrendingUp} />
        <Card title="Avg. Order Value" value={`Ksh ${averageOrderValue.toFixed(2)}`} icon={ShoppingCart} />
      </div>

      {/* Sales Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-300 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" size={20} /> Sales Performance (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockDailySales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} name="Sales (Ksh)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Categories Chart */}
        <div className="bg-gray-300 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Book className="mr-2 text-purple-600" size={20} /> Top Selling Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockTopCategories} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#82ca9d" name="Sales (Ksh)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-gray-300 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 text-indigo-600" size={20} /> Recent Orders
          </h3>
          <ul className="divide-y divide-gray-200">
            {mockRecentOrders.slice(0, 5).map((order) => ( // Show top 5 recent orders
              <li key={order.id} className="py-3 flex justify-between items-center text-gray-700">
                <div>
                  <span className="font-medium">{order.customer}</span> - {order.id}
                  <p className="text-sm text-gray-500">Ksh {order.total.toFixed(2)} on {order.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </li>
            ))}
            {mockRecentOrders.length > 0 && (
                <li className="pt-4 text-right">
                    <Link to="/admin/orders" className="text-blue-600 hover:underline text-sm">View All Orders &rarr;</Link>
                </li>
            )}
          </ul>
           {mockRecentOrders.length === 0 && <p className="text-gray-500">No recent orders to display.</p>}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-300 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Package className="mr-2 text-red-600" size={20} /> Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/products/add" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-200">
              Add New Product
            </Link>
            <Link to="/admin/products" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-200">
              Manage Products
            </Link>
            <Link to="/admin/orders?status=pending" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-200">
              Process Pending Orders
            </Link>
            <Link to="/admin/users" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-200">
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;