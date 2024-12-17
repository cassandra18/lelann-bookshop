import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const SignIn: React.FC = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // State to manage messages
    const [message, setMessage] = useState('');

    // React Router's navigation hook
    const navigate = useNavigate();

    // Handle input changes
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

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                // After login, verify user role on the backend
                const roleResponse = await fetch('http://localhost:5000/api/user/verify', {
                    method: 'GET',
                    credentials: 'include', // Send JWT cookie with the request
                });

                if (roleResponse.ok) {
                    const { role } = await roleResponse.json();
                    
                    if (role === 'customer') {
                        navigate('/user-dashboard');
                    } else {
                        setMessage('Invalid role. Please contact the administrator.');
                    }
                } else {
                    setMessage('Error verifying role.');
                }
            } else {
                const error = await response.json();
                setMessage(error.message || 'Sign-in failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again later.');
        }
    };


    return (
        <div className="flex bg-slate-300 mt-10 lg:ml-20 sm:ml-10 mb-28 rounded-tl-lg w-full h-screen">
            <div className="w-1/2 p-8 max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6 text-oxford-blue">Sign In to your Lelann account</h1>

                {/* Display message */}
                {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-20">
                        <label htmlFor="email" className="text-gray-700 text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="border bg-gray-300 text-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="border bg-gray-300 text-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white rounded py-2 mt-4 hover:bg-indigo-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/sign-up" className="text-indigo-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Image section */}
            <div className="w-1/2 h-full">
                <div className="h-full">
                    <img
                        src="images/signup-img.jpeg"
                        alt="signin"
                        className="w-full h-full object-cover shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
