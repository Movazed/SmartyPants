"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { HeaderLogin } from '@/sections/Header_login';
import { FooterLogin } from '@/sections/Footer_login';
import Sidebar from '@/components/Sidebar';
import ProgressBar from '@/components/ProgressBar';
import Stats from '@/components/Stats';
import CourseList from '@/components/CourseList';
import FeaturedBlog from '@/components/FeatureBlog';
import Calendar from '@/components/Calendar';
import Image from 'next/image';
import book from "@/assets/school.png"; // Assuming this is the book logo path

const BlankPage: React.FC = () => {
  const router = useRouter();

  const handleCourseCatalogClick = () => {
    router.push('/catalog'); // Replace with the actual path you want to navigate to
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        .animated-background {
          background: linear-gradient(120deg, #E3F2FD, #BBDEFB, #4DD0E1);
          background-size: 300% 300%;
          animation: gradientAnimation 10s ease infinite;
          position: relative;
          overflow: hidden;
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Bubble effect */
        .bubble {
          position: absolute;
          bottom: -50px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          opacity: 0.6;
          animation: bubbleUp 15s infinite ease-in-out;
        }

        @keyframes bubbleUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-300px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-600px) scale(1.5);
            opacity: 0;
          }
        }

        .bubble:nth-child(1) {
          width: 80px;
          height: 80px;
          left: 10%;
          animation-duration: 20s;
        }
        .bubble:nth-child(2) {
          width: 120px;
          height: 120px;
          left: 30%;
          animation-duration: 25s;
          animation-delay: 2s;
        }
        .bubble:nth-child(3) {
          width: 100px;
          height: 100px;
          left: 50%;
          animation-duration: 18s;
          animation-delay: 4s;
        }
        .bubble:nth-child(4) {
          width: 140px;
          height: 140px;
          left: 70%;
          animation-duration: 22s;
          animation-delay: 6s;
        }
        .bubble:nth-child(5) {
          width: 90px;
          height: 90px;
          left: 90%;
          animation-duration: 20s;
          animation-delay: 8s;
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar className="-72" /> {/* Adjust width as needed */}

        <div className="animated-background flex-1 flex flex-col ml-16 relative">
          {/* Bubble elements */}
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

          {/* Header */}
          <HeaderLogin />

          <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* New Heading for Roadmap */}
              {/* <h2 className="text-3xl font-semibold">Roadmap</h2> */}
              {/* Add your Roadmap component or content here */}
              {/* For example: <Roadmap /> */}

              {/* Heading above ProgressBar */}
              <h2 className="text-3xl font-semibold">Your Progress</h2>
              <ProgressBar />

              {/* Heading above Stats */}
              <h2 className="text-3xl font-semibold">Statistics Overview</h2>
              <Stats />

              {/* Heading and Button Row */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Available Courses</h2>
                <button
                  onClick={handleCourseCatalogClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                  <Image src={book} alt="Book Logo" width={20} height={20} className="mr-2" />
                  Course Catalog
                </button>
              </div>

              <CourseList />
            </div>

            <div className="flex flex-col space-y-6">
              {/* Heading above Calendar */}
              <h2 className="text-2xl font-semibold">Upcoming Events</h2>
              <Calendar />

              {/* Heading above FeaturedBlog */}
              <h2 className="text-2xl font-semibold">Featured Blog</h2>
              <FeaturedBlog />
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default BlankPage;
