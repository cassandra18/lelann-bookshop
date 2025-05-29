// Dashboard Overview Component
import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book, ShoppingCart, Users, Package, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from './reusableCard';


const BASE_URL = 'http://localhost:5000/api';

// Mock Data (for Orders and Sales, as no backend endpoints were provided)
const mockOrders = [
  { id: 'ORD001', customer: 'Alice Smith', date: '2023-01-15', total: 22.49, status: 'Completed', items: [{bookId: '1', title: 'The Great Gatsby', quantity: 1}, {bookId: '2', title: '1984', quantity: 1}] },
  { id: 'ORD002', customer: 'Bob Johnson', date: '2023-01-16', total: 10.25, status: 'Pending', items: [{bookId: '3', title: 'To Kill a Mockingbird', quantity: 1}] },
  { id: 'ORD003', customer: 'Charlie Brown', date: '2023-01-17', total: 14.00, status: 'Shipped', items: [{bookId: '5', title: 'The Hobbit', quantity: 1}] },
  { id: 'ORD004', customer: 'Diana Prince', date: '2023-01-18', total: 21.74, status: 'Completed', items: [{bookId: '4', title: 'Pride and Prejudice', quantity: 1}, {bookId: '1', title: 'The Great Gatsby', quantity: 1}] },
];

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const DashboardOverview = () => {
  const { isAuthenticated } = useAuth();
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(order => order.status === 'Pending').length;

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
      setTotalBooks(booksResponse.data.length); // Assuming products endpoint returns an array

      // Fetch users count
      const usersResponse = await axios.get(`${BASE_URL}/user/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTotalUsers(usersResponse.data.length); // Assuming all-users endpoint returns an array

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
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
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Books" value={totalBooks} icon={Book} />
        <Card title="Total Orders" value={totalOrders} icon={ShoppingCart} />
        <Card title="Pending Orders" value={pendingOrders} icon={Package} className="bg-yellow-50 text-yellow-800" />
        <Card title="Total Users" value={totalUsers} icon={Users} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Performance (Mock Data)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default DashboardOverview;