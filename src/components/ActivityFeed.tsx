import React from 'react';
import Image, { StaticImageData } from 'next/image';
import ProfileImage1 from "@/assets/avatar-1.png"; // Replace with actual image path
import ProfileImage2 from "@/assets/avatar-2.png"; // Replace with actual image path
import ProfileImage3 from "@/assets/avatar-3.png"; // Replace with actual image path

interface Activity {
  name: string;
  action: string;
  title: string;
  time: string;
  profileImage: StaticImageData; // Use StaticImageData instead of string
}

interface ActivityFeedProps {
  className?: string; // Allow className prop
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ className }) => {
  const activities: Activity[] = [
    { name: 'Felix', action: 'replied on', title: 'Codeforces Round 967 Div 3', time: '25th Sep, 11:00 am', profileImage: ProfileImage1 },
    { name: 'Ludwig', action: 'invited you to', title: 'Open Orca LLM Community', time: '27th Sep, 11:00 am', profileImage: ProfileImage2 },
    { name: 'Edward', action: 'commented on', title: 'Dynamic Algorithms for Machine Learning', time: '30th Sep, 2:00 pm', profileImage: ProfileImage3 },
  ];

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md ${className}`}>
      <h3 className="text-lg font-semibold mb-4">ACTIVITY</h3>
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start mb-4"> {/* Flexbox for alignment */}
          <Image
            src={activity.profileImage} // Use profileImage from activity
            alt="Profile"
            className="h-10 w-10 rounded-full mr-3" /* Profile image */
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm">
              <strong>{activity.name}</strong> {activity.action} <strong>{activity.title}</strong>
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
