"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out both fields');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        router.push('/homepage');
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Side with Gradient Background and Animated 3D Circle */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb] relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-64 h-64 md:w-96 md:h-96"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbc2eb] to-[#ff9a9e] rounded-full shadow-lg shadow-[#fbc2eb]"/>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] rounded-full opacity-50 backdrop-blur-lg border border-white/30 shadow-md"/>
            </motion.div>
          </div>
        </div>

        {/* Right Side with the Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="bg-white shadow-md rounded-lg p-6 md:p-10 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Log in</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-gray-700">
                  Email address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 transform"
                  placeholder="Enter your email"
                  required
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.05 }}
                />
              </motion.div>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <motion.input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 transform"
                  placeholder="Enter your password"
                  required
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.05 }}
                />
              </motion.div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
              >
                Log in
              </button>
            </form>
            <p className="mt-6 text-center text-gray-500">
              Don’t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
