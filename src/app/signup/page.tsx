"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState<boolean>(false);
  const [notRobot, setNotRobot] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password || !agreeToTerms || !notRobot) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          agreeToTerms,
          subscribeNewsletter,
          notRobot,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side with Gradient Background and Animated 3D Circle */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-[#a3c5ff] via-[#d5afff] to-[#ffa994] relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-64 h-64 md:w-96 md:h-96"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffa994] to-[#a3c5ff] rounded-full shadow-lg shadow-[#ffa994]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#a3c5ff] to-[#d5afff] rounded-full opacity-50 backdrop-blur-lg border border-white/30 shadow-md" />
          </motion.div>
        </div>
      </div>

      {/* Right Side with the Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 md:p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <motion.input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 transform"
                placeholder="Enter your username"
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
              <label htmlFor="email" className="block text-gray-700">Email address</label>
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
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-gray-700">Password</label>
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
            <motion.div
              className="mb-4 flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-gray-700">
                Agree to our <a href="#" className="text-blue-500">Terms of use</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
              </label>
            </motion.div>
            <motion.div
              className="mb-4 flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <input
                type="checkbox"
                id="newsletter"
                checked={subscribeNewsletter}
                onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
                className="mr-2"
              />
              <label htmlFor="newsletter" className="text-gray-700">Subscribe to our monthly newsletter</label>
            </motion.div>
            <motion.div
              className="mb-4 flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <input
                type="checkbox"
                id="robot"
                checked={notRobot}
                onChange={() => setNotRobot(!notRobot)}
                className="mr-2"
                required
              />
              <label htmlFor="robot" className="text-gray-700">I am not a robot</label>
            </motion.div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
            >
              Sign up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500">
            Already have an account? <a href="/login" className="text-blue-500">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
