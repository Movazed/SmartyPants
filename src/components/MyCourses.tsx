"use client";

import React from 'react';

interface Course {
  title: string;
  instructor: string;
  videoUrl?: string; // Optional property for the video URL
  embedUrl?: string; // Optional property for the embed URL
}

const MyCourses: React.FC = () => {
  const courses: Course[] = [
    {
      title: 'Striver DP playlist',
      instructor: 'Striver',
      videoUrl: 'https://www.youtube.com/watch?v=tyB0ztf0DNY&list=PLbgVysG3YYf1vPn2OO1pNrJfHGQXydxX7',
      embedUrl: 'https://www.youtube.com/embed/tyB0ztf0DNY', // YouTube embed URL
    },
    {
      title: 'Google Gemini Playlist GenAI',
      instructor: 'Kirsh Naik',
      videoUrl: 'https://www.youtube.com/watch?v=it0l6lx3qI0&list=PLZoTAELRMXVNbDmGZlcgCA3a8mRQp5axb',
      embedUrl: 'https://www.youtube.com/embed/it0l6lx3qI0', // New YouTube embed URL
    },  
    
    {
      title: 'Love Babbar DSA Placement',
      instructor: 'Love Babbar',
      videoUrl: 'https://www.youtube.com/watch?v=WQoB2z67hvY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA',
      embedUrl: 'https://www.youtube.com/embed/WQoB2z67hvY', // New YouTube embed URL
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">MY COURSES</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            {course.embedUrl ? (
              <div className="aspect-w-16 aspect-h-9 mb-2">
                <iframe
                  width="500"
                  height="300"
                  src={course.embedUrl}
                  title={course.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-auto rounded-md"
                />
              </div>
            ) : null}
            <h4 className="text-md font-semibold">{course.title}</h4>
            <p className="text-sm text-gray-500">{course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
