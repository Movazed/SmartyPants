import React from 'react';
import OverviewCard from '@/components/OverviewCard';
import { FaBook, FaCogs, FaClock, FaChartLine } from 'react-icons/fa';

const Overview: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <OverviewCard title="Courses in progress" value="3" icon={<FaBook />} />
      <OverviewCard title="Active Prototypes" value="7" icon={<FaCogs />} />
      <OverviewCard title="Hours Learning" value="3h 15m" icon={<FaClock />} />
      <OverviewCard title="Roadmap Score" value="240" icon={<FaChartLine />} />
    </div>
  );
};

export default Overview;
