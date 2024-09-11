import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressCircleProps {
  className?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ className }) => {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-md flex flex-col items-center ${className}`}>
      <h3 className="text-gray-600 text-sm mb-4">PROGRESS</h3>
      <CircularProgressbar
        value={45}
        text={`${45}%`}
        styles={buildStyles({
          textColor: '#3b82f6',
          pathColor: '#3b82f6',
          trailColor: '#e5e7eb',
        })}
      />
      <p className="text-sm text-gray-500 mt-4">Courses</p>
    </div>
  );
};

export default ProgressCircle;
