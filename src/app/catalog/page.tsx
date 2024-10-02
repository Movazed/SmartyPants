"use client";

import React, { useState, useEffect } from "react";
import { HeaderLogin } from "@/sections/Header_login";
import Sidebar from "@/components/Sidebar";
import StylesCatalog from "@/components/StylesCatalog";

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]); 

  const courses = [
    {
      title: "Uber-Clone End to End Project Course",
      description: "Build an Uber Clone End to End includes backend.",
      creator: "Js Mastery",
      lessons: "12 lessons · 7 quiz",
      src: "https://www.youtube.com/embed/kmy_YNhl0mw",
      category: "Web Development",
      href: "https://github.com/cbedroid/Uber-Clone",
    },
    {
      title: "Data Engineering AWS Course",
      description: "Cloud + Data Engineering playlist",
      creator: "Code with Yu",
      lessons: "12 lessons · 7 quiz",
      src: "https://www.youtube.com/embed/LSlt6iVI_9Y?list=PL_Ct8Cox2p8WjETeFftZePYTvuTRDx5h-",
      category: "Cloud and DE",
      href: "https://github.com/keenanromain/AWS-SAA-C02-Study-Guide",
    },
  ];

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledCourses(storedCourses);
  }, []);

  const filteredCourses = courses.filter(
    (course) => selectedCategory === "All" || course.category === selectedCategory
  );

  const handleEnroll = (courseTitle: string) => {
    setEnrolledCourses((prev) => {
      const updatedCourses = prev.includes(courseTitle) ? prev : [...prev, courseTitle];
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses)); // Store enrolled courses locally
      return updatedCourses;
    });
  };

  return (
    <>
      <StylesCatalog />
      <div className="flex min-h-screen animated-background">
        <div className="min-h-screen bg-gray-900">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col ml-8 relative">
          <HeaderLogin />
          <div className="p-6 bg-white shadow-lg rounded-lg m-6 flex-grow">
            <div className="mb-6 flex space-x-4">
              {/* Category Buttons */}
              {/* Add category buttons here */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => {
                const isEnrolled = enrolledCourses.includes(course.title);
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow block hover:translate-y-[-4px]"
                  >
                    <div className="bg-gradient-to-br from-cyan-800 to-blue-500 h-48 rounded-md mb-4 overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={course.src}
                        title={`YouTube video player - ${course.title}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                    <p className="text-gray-500 mb-2">{course.description}</p>
                    <p className="text-gray-400 mb-4">{course.creator}</p>
                    <p className="text-gray-400 mb-4">{course.lessons}</p>
                    {/* Enroll Button */}
                    <button
                      onClick={() => handleEnroll(course.title)}
                      className={`px-4 py-2 rounded shadow-md ${
                        isEnrolled ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                      } transition-transform transform hover:scale-105`}
                    >
                      {isEnrolled ? "Enrolled" : "Enroll"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
