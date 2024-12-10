import React from 'react';
import { Link } from 'react-router-dom';

const Account: React.FC = () => {
    return (
        <>
            <div className='bg-slate-300 min-h-screen flex flex-row items-center justify-center'>
                <div className='p-8 rounded-lg shadow-md max-w-md w-full'>
                    <h1 className='text-2xl font-bold text-center mb-6'>Join Our Network</h1>

                    <form className='space-y-4'>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className='text-gray-700 text-sm font-medium mb-1'>
                                Name
                            </label>
                            <input 
                                id='name' 
                                type='text' 
                                className='border bg-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300' 
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-gray-700 text-sm font-medium mb-1'>
                                Email
                            </label>
                            <input 
                                id='email' 
                                type='email' 
                                className='border  bg-gray-300  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300' 
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='password' className='text-gray-700 text-sm font-medium mb-1'>
                                Password
                            </label>
                            <input 
                                id='password' 
                                type='password' 
                                className='border  bg-gray-300  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300' 
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='confirmPassword' className='text-gray-700 text-sm font-medium mb-1'>
                                Confirm Password
                            </label>
                            <input 
                                id='confirmPassword' 
                                type='password' 
                                className='border  bg-gray-300  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300' 
                            />
                        </div>

                        <button 
                            type='submit' 
                            className='w-full bg-indigo-600 text-white rounded py-2 mt-4 hover:bg-indigo-700 transition duration-200'>
                            Create Account
                        </button>
                    </form>

                    {/* Sign up with Google */}
                    <button className='mt-4 w-full bg-white border border-gray-300 rounded py-2 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition duration-200'>
                        <img src='images/google-logo.png' alt='google-logo' className='w-5 h-5 mr-2' />
                        Sign up with Google
                    </button>

                    <p className='mt-4 text-center text-sm text-gray-600'>
                        Already have an account?{' '}
                        <Link to='/sign-in' className='text-indigo-600 hover:underline'>
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className='mt-8'>
                    <img src='images/signup-img.jpeg' alt='signup' className='max-w-full rounded-lg shadow-md' />
                </div>
            </div>
        </>
    );
};

export default Account;
