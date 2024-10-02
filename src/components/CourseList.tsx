// CourseList.tsx

import React from 'react';
import Image from 'next/image';
import book1 from "@/assets/book1.png"; // Assuming these are the paths to your book logos
import book2 from "@/assets/book2.png";

interface Course {
  name: string;
  progress: number;
  modules: number;
  quizzes: number;
  completed: boolean;
}

interface CourseListProps {
  courses: Course[];
  onUnenroll: (course: string) => void; // Function to handle unenrollment
}

const CourseList: React.FC<CourseListProps> = ({ courses, onUnenroll }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow mb-6">
      {courses.map((course, index) => (
        <div key={index} className={`mb-6 ${index !== courses.length - 1 ? 'pb-6 border-b border-gray-300' : ''}`}>
          <div className="flex justify-between items-center">
            <div className="text-gray-800 font-semibold">{course.name}</div>
            <div className="text-sm text-gray-600">
              {course.completed ? (
                <span className="text-green-600">Completed</span>
              ) : (
                `${course.progress}%`
              )}
            </div>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <Image
              src={index % 2 === 0 ? book1 : book2}
              alt={`Book Logo ${index % 2 === 0 ? '1' : '2'}`}
              width={50}
              height={50}
              className="mr-2"
            />
            <div className="flex-grow bg-gray-300 h-2 rounded-full">
              <div
                className="bg-blue-700 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{course.modules}/10 Modules</span>
            <span>{course.quizzes}/5 Quizzes</span>
          </div>
          <button
            onClick={() => onUnenroll(course.name)}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Unenroll
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
