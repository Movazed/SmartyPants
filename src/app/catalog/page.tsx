"use client";
import React, { useState } from "react";
import { HeaderLogin } from '@/sections/Header_login';
import { FooterLogin } from '@/sections/Footer_login';
import Sidebar from '@/components/Sidebar';

const Catalog: React.FC = () => {
  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // List of courses
  const courses = [
    {
      title: 'Uber-Clone End to End Project Course',
      description: 'Build an Uber Clone End to End includes backend.',
      creator: 'Js Mastery',
      lessons: '12 lessons · 7 quiz',
      src: 'https://www.youtube.com/embed/kmy_YNhl0mw',
      category: 'Web Development',
      href: 'https://github.com/cbedroid/Uber-Clone'
    },
    {
      title: 'Data Engineering AWS Course',
      description: 'Cloud + Data Enginnering playlist',
      creator: 'Code with Yu',
      lessons: '12 lessons · 7 quiz',
      src: 'https://www.youtube.com/embed/LSlt6iVI_9Y?list=PL_Ct8Cox2p8WjETeFftZePYTvuTRDx5h-',
      category: 'Cloud and DE',
      href: 'https://github.com/keenanromain/AWS-SAA-C02-Study-Guide'
    },
    {
      title: 'Advanced Web Development Course',
      description: 'Three.js and Advanced Web Development Concepts',
      creator: 'Js Mastery',
      lessons: '12 lessons · 7 quiz',
      src: 'https://www.youtube.com/embed/kRQbRAJ4-Fs?list=PL6QREj8te1P6CkO_4OIK1-nwG5OxCD5tR',
      category: 'Web Development',
      href: 'https://threejs.org/manual/#en/fundamentals'
    },
    {
      title: 'AI Course Text to Speech',
      description: 'API Implementation and model training',
      creator: 'Nicholas Renotte',
      lessons: '12 lessons · 7 quiz',
      src: 'https://www.youtube.com/embed/8k8S5ruFAUs?list=PLgNJO2hghbmjJv0tSpfiDGQhdLgKb-ZmU',
      category: 'AI/ML',
      href: 'https://github.com/coqui-ai/TTS'
    },
    {
      title: 'Competitive Programming Roadmap',
      description: 'Advanced C++ Course and CP',
      creator: 'Priyansh Agarwal',
      lessons: '12 lessons · 7 quiz',
      src: 'https://www.youtube.com/embed/n-Xkbqcfi9w',
      category: 'CP',
      href: 'https://codeforces.com/blog/entry/111099'
    },
    {
      title: 'Crew AI Course Advanced Gen AI Course',
      description: 'Model Training and Finetuning',
      creator: 'Krish Naik',
      lessons: '12 lessons · 7 quiz',
      src: 'https://www.youtube.com/embed/bFB4zqkcatU?list=PLZoTAELRMXVO_NfdHEBQylsAY2y789pXA',
      category: 'AI/ML',
      href: 'https://docs.crewai.com/'
    }
  ];

  // Filter courses based on the selected category
  const filteredCourses = courses.filter(course => 
    selectedCategory === 'All' || course.category === selectedCategory
  );

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

      <div className="flex min-h-screen animated-background">
        {/* Sidebar */}
        <div className="min-h-screen bg-gray-900">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-8 relative">
          {/* Bubble elements */}
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

          {/* Header */}
          <HeaderLogin />

          {/* Main Section */}
          <div className="p-6 bg-white shadow-lg rounded-lg m-6 flex-grow">
            {/* Filters */}
            <div className="mb-6 flex space-x-4">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded shadow-md ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 transition-transform transform hover:scale-105`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedCategory('AI/ML')}
                className={`px-4 py-2 rounded shadow-md ${selectedCategory === 'AI/ML' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition-transform transform hover:scale-105`}
              >
                AI/ML
              </button>
              <button 
                onClick={() => setSelectedCategory('Web Development')}
                className={`px-4 py-2 rounded shadow-md ${selectedCategory === 'Web Development' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition-transform transform hover:scale-105`}
              >
                Web Development
              </button>
              <button 
                onClick={() => setSelectedCategory('Cloud and DE')}
                className={`px-4 py-2 rounded shadow-md ${selectedCategory === 'Cloud and DE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition-transform transform hover:scale-105`}
              >
                Cloud and DE
              </button>
              <button 
                onClick={() => setSelectedCategory('CP')}
                className={`px-4 py-2 rounded shadow-md ${selectedCategory === 'CP' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition-transform transform hover:scale-105`}
              >
                CP
              </button>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <a 
                  key={index}
                  href={course.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow block hover:translate-y-[-4px]"
                >
                  <div className="bg-gradient-to-br from-cyan-800 to-blue-500 h-48 rounded-md mb-4 overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={course.src} 
                      title={`YouTube video player - ${course.title}`} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-500 mb-2">{course.description}</p>
                  <p className="text-gray-400">{course.creator}</p>
                  <p className="text-gray-400">{course.lessons}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
