import React from 'react';
import ProgressImage from '@/assets/Progress.png';

const ProgressBar: React.FC = () => {
  return (
    <div
      className="bg-white rounded-md shadow p-4 mb-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(${ProgressImage.src})`,
        backgroundSize: '150%', // Increase the size of the background image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Progress Content */}
      <div className="relative z-10 h-32">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 text-sm pt-16">Your Progress</span>
          <span className="text-gray-600 text-sm pt-16">30%</span>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded-full">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
