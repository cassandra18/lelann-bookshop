import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "customer") {
          navigate("/user-dashboard");
        } else {
          setMessage("Unknown role. Contact admin.");
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex md:flex-row bg-[#02364d] mt-10 rounded-lg max-w-5xl md:mx-auto  mb-28 overflow-hidden">
      {/* Form section */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">
          Log in to your Lelann account
        </h1>

        {message && (
          <p className="text-center text-sm text-red-500 mb-4">{message}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email input */}
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
            />
          </div>

          {/* Password input with toggle */}
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
            className="w-full bg-yellow-100 text-prussian-blue rounded py-2 mt-4 hover:bg-yellow-300 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-yellow-300 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Image section */}
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
