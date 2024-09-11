import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StudyStatisticsProps {
  className?: string;
}

const StudyStatistics: React.FC<StudyStatisticsProps> = ({ className }) => {
  const [view, setView] = useState<'week' | 'month'>('week');

  // Example data for weekly and monthly views
  const weekData = {
    labels: ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2, 3, 4, 5, 7, 4, 3],
        backgroundColor: [ 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6' 
        ],
      },
    ],
  };

  const monthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Study Hours',
        data: [15, 22, 18, 25],
        backgroundColor: [ 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6', 
          '#3b82f6'
        ],
      },
    ],
  };

  const getMaxValue = (data: number[]) => Math.max(...data);

  const updateColors = (data: number[]) => {
    const maxValue = getMaxValue(data);
    return data.map(value => value === maxValue ? '#2563eb' : '#3b82f6');
  };

  const chartData = view === 'week' ? weekData : monthData;
  chartData.datasets[0].backgroundColor = updateColors(chartData.datasets[0].data);

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 text-sm">STUDY STATISTICS</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-1 rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-1 rounded ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
            onClick={() => setView('month')}
          >
            Month
          </button>
        </div>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default StudyStatistics;
