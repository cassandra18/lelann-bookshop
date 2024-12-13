import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    // state to hold form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // state to manage success or error message
    const [ message, setMessage ] = useState("");

    // Navigate to dashborad
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        // Send form data to backend
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
            // Handle response
            if (response.ok) {
                setMessage('SignUp created successfully!');
                navigate('/user-dashboard'); // Redirect to dashborad
                setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
            } else {
                const error = await response.json();
                setMessage(error.message || 'Failed to create SignUp!');
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        }
    }
    return (
    <>
      <div className="flex bg-slate-300 mt-10 lg:ml-20 ml-10 rounded-tl-lg w-full h-screen mb-28">
        <div className="w-1/2 p-8  max-w-md mx-auto ">
          <h1 className="text-2xl font-bold text-center mb-6 text-oxford-blue">
            Welcome to Lelann family
          </h1>

           {/* Display message */}
           {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}


          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="name"
                className="text-gray-700 text-sm font-medium"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="border border-gray-200 text-gray-700 focus:border-none bg-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-700 text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border border-gray-200 text-gray-700 focus:border-none bg-gray-300  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="border border-gray-200 text-gray-700 focus:border-none bg-gray-300  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500">
                {" "}
                Password must be atleast 8 characters with capital and small
                letters and a speial character.
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="border border-gray-200 text-gray-700 focus:border-none bg-gray-300  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-600 transition duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Sign up with Google */}
          <button className="mt-12 w-full bg-white border border-gray-300 rounded py-2 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition duration-200">
            <img
              src="images/google-logo.png"
              alt="google-logo"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an SignUp?{" "}
            <Link to="/sign-in" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Image section */}
        <div className="w-1/2 h-full">
          <div className="h-full">
            <img
              src="images/signup-img.jpeg"
              alt="signup"
              className="w-full h-full mt-1 object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
