// src/components/signin.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './context/AuthContext';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true,
      });

      const { token, user } = response.data;

      login(token, user); 

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "customer") {
        navigate("/user-dashboard");
      } else {
        setMessage("Unknown role. Contact admin.");
        // Optionally, log out the user if role is unknown
        // logout();
      }

    } catch (error: any) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || "An error occurred during sign-in. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex md:flex-row bg-[#02364d] mt-10 rounded-lg max-w-5xl md:mx-auto  mb-28 overflow-hidden">
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">
          Log in to your Lelann account
        </h1>

        {message && (
          <p className="text-center text-sm text-red-500 mb-4">{message}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border bg-gray-300 text-gray-700 rounded px-3 py-2 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading} 
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-white font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="border bg-gray-300 text-gray-700 rounded px-3 py-2 pr-10 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-100 text-prussian-blue rounded py-2 mt-4 hover:bg-yellow-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-yellow-300 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="w-full md:w-1/2 hidden md:block">
        <img
          src="images/signup-img.jpeg"
          alt="signin"
          className="w-full h-64 md:h-full object-cover shadow-md rounded-b-lg md:rounded-b-none md:rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default SignIn;