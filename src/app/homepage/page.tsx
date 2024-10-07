"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderLogin } from '@/sections/Header_login';
import Sidebar from '@/components/Sidebar';
import ProgressBar from '@/components/ProgressBar';
import Stats from '@/components/Stats';
import CourseList from '@/components/CourseList';
import FeaturedBlog from '@/components/FeatureBlog';
import Calendar from '@/components/Calendar';
import Image from 'next/image';
import book from "@/assets/school.png";
import StylesHomePage from '@/components/StylesHomePage';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(30); // Example initial progress

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledCourses(storedCourses);
    
    // Example: Dynamically set progress based on enrolled courses (optional)
    const dynamicProgress = Math.floor((storedCourses.length / 10) * 100); // Assuming 10 is the max number of courses
    setProgress(dynamicProgress); // Update the progress based on enrollment
  }, []);

  const handleCourseCatalogClick = () => {
    router.push('/catalog');
  };

  const handleUnenroll = (course: string) => {
    const updatedCourses = enrolledCourses.filter((c) => c !== course);
    setEnrolledCourses(updatedCourses);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));

    // Update progress after unenrolling a course
    const dynamicProgress = Math.floor((updatedCourses.length / 10) * 100); // Adjust based on the new number of courses
    setProgress(dynamicProgress);
  };

  // The enrolled courses will be the only ones displayed
  const enrolledCourseData = enrolledCourses.map(course => ({
    name: course,
    progress: Math.floor(Math.random() * 101), // Placeholder for random progress
    modules: Math.floor(Math.random() * 10),   // Placeholder for random modules
    quizzes: Math.floor(Math.random() * 5),    // Placeholder for random quizzes
    completed: Math.random() > 0.5,              // Randomly decide if completed
  }));

  return (
    <>
      <StylesHomePage />
      <div className="flex min-h-screen">
        <Sidebar className="-72" />
        <div className="animated-background flex-1 flex flex-col ml-16 relative">
          {/* Bubble elements */}
          <div className="bubble-container">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>

          <HeaderLogin />
          <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-semibold">Your Progress</h2>
              <ProgressBar progress={progress} /> {/* Pass the progress prop here */}

              <h2 className="text-3xl font-semibold">Statistics Overview</h2>
              <Stats />

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

              {/* Pass the enrolled courses data and unenroll function */}
              <CourseList courses={enrolledCourseData} onUnenroll={handleUnenroll} />
            </div>

            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-semibold">Upcoming Events</h2>
              <Calendar />
              <h2 className="text-2xl font-semibold">Featured Blog</h2>
              <FeaturedBlog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
