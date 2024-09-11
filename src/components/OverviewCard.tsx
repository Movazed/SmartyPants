import React from 'react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-4">
      <div className="bg-blue-100 p-2 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
