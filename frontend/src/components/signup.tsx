import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setMessage("SignUp created successfully!");
        navigate("/user-dashboard");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to create SignUp!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex md:flex-row bg-[#02364d] mt-10 rounded-lg max-w-5xl mx-auto mb-28 overflow-hidden shadow-lg">
      
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">
          Welcome to Lelann family
        </h1>

        {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className="p-2 rounded bg-gray-300 text-gray-700 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email address"
              className="p-2 rounded bg-gray-300 text-gray-700 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-white font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="p-2 rounded bg-gray-300 text-gray-700 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
            </span>

            <p className="text-xs text-gray-300 mt-1">
              Password must be at least 8 characters with capital and small
              letters and a special character.
            </p>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="confirmPassword" className="text-white font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="p-2 rounded bg-gray-300 text-gray-700 focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-100 text-prussian-blue rounded py-2 hover:bg-yellow-300 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <button className="mt-10 w-full bg-yellow-100 rounded py-2 flex items-center justify-center text-gray-700 hover:bg-yellow-300 transition duration-200">
          <img
            src="images/google-logo.png"
            alt="google-logo"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-yellow-300 hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <img
          src="images/signup-img.jpeg"
          alt="signup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
