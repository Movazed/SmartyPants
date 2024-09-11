import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Next.js Link component
import Avatar from "@/assets/mascott.png"; // Replace with actual image path
import WifiRouter from "@/assets/wifi_tethering.png"; // Import the CSS file with animations

interface LiveEvent {
  name: string;
  description: string;
  time: string;
  link: string; // Add a link field to each event
}

interface LiveEventsProps {
  className?: string; // Allow className prop
}

const LiveEvents: React.FC<LiveEventsProps> = ({ className }) => {
  const liveEvents: LiveEvent[] = [
    { 
      name: 'Shayan', 
      description: 'Latest Codeforces Contest', 
      time: 'Live Now', 
      link: 'https://codeforces.com/contests/2005' // Add link for redirection
    },
  ];

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md ${className}`}>
      <h3 className="text-lg font-semibold mb-4">LIVE EVENTS</h3>
      {liveEvents.map((event, index) => (
        <div key={index} className="flex items-start mb-4">
          <Image
            src={Avatar}
            alt="Live Event"
            className="h-10 w-10 rounded-full mr-3 animate-tweak" // Apply tweaky animation here
            width={40}
            height={40}
          />
          <div className="flex-grow">
            <p className="text-sm font-medium">
              <strong>{event.name}</strong>
            </p>
            <p className="text-xs text-gray-500">
              {event.description}
            </p>
            <Link href={event.link} passHref> {/* Wrap Live Now with Link */}
              <a className="text-xs text-blue-500 mt-1 underline">
                {event.time}
              </a>
            </Link>
          </div>
          <div className="flex-shrink-0 ml-3">
            <Image
              src={WifiRouter}
              alt="WiFi Router"
              className="h-5 w-5 animate-blink" // Apply blinking animation here
              width={20}
              height={20}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveEvents;
