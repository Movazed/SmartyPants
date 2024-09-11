"use client";
import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import Overview from '@/sections/Overview';
import StudyStatistics from '@/components/StudyStatistics';
import MyCourses from '@/components/MyCourses';
import ProgressCircle from '@/components/ProgressCircle';
import ActivityFeed from '@/components/ActivityFeed';
import { HeaderLogin } from '@/sections/Header_login';
import { FooterLogin } from '@/sections/Footer_login';
import Sidebar from '@/components/Sidebar';
import LiveEvents from '@/components/LiveEvents';

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <HeaderLogin />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 ml-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            <div className="lg:col-span-3 space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold mb-4 font-roboto"
              >
                Dashboard
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-medium mb-4 font-openSans"
              >
                Overview
              </motion.h2>
              <Overview />

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center w-full h-[400px]"
                >
                  <StudyStatistics className="w-full h-full" />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center w-full h-[400px]"
                >
                  <ProgressCircle className="w-full h-full" />
                </motion.div>
              </motion.div>

              <MyCourses />
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="lg:col-span-1 flex flex-col space-y-6"
            >
              <div className="flex flex-col space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="flex-1"
                >
                  <LiveEvents className="w-full" />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex-1"
                >
                  <ActivityFeed className="w-full" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Bubbles Container */}
      <div className="bubbles-container absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <div className="bubble w-[100px] h-[100px] animation-duration-[10s] animation-delay-[0s]" />
        <div className="bubble w-[150px] h-[150px] animation-duration-[12s] animation-delay-[2s]" />
        <div className="bubble w-[200px] h-[200px] animation-duration-[15s] animation-delay-[4s]" />
        {/* Add more bubbles as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
