import React, { useState } from 'react';
import Image from 'next/image';
import Avatar from "@/assets/mascott.png";
import Dashboard from "@/assets/dashboard.png";
import Hat from "@/assets/school.png";
import Bulb from "@/assets/lightbulb.png";
import Chat from "@/assets/chat.png";
import Track from "@/assets/Track.png";
import ProfileIcon from '@/assets/icon.png';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = (page: string, href: string) => {
    setActive(page);
    router.push(href);
  };

  return (
    <aside className={`fixed top-0 w-16 h-full bg-gray-900 text-white flex flex-col items-center z-50 py-4${className}`}>
      <div className="w-10 h-10 mb-8 mt-4 animate-float">
        <Image src={Avatar} alt="Avatar" width={40} height={40} />
      </div>

      <nav className="flex flex-col space-y-6 items-center flex-grow mt-8">
        <div 
          aria-label="Dashboard" 
          onClick={() => handleClick('dashboard', '/dashboard')}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ${active === 'dashboard' ? 'bg-blue-500' : 'hover:bg-blue-400'} rounded-full`}
        >
          <Image src={Dashboard} alt="Dashboard" width={20} height={20} />
        </div>
        
        <div 
          aria-label="Courses" 
          onClick={() => handleClick('courses', '/homepage')}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ${active === 'courses' ? 'bg-blue-500' : 'hover:bg-blue-400'} rounded-full`}
        >
          <Image src={Hat} alt="Courses" width={20} height={20} />
        </div>

        <div 
          aria-label="Ideas" 
          onClick={() => handleClick('ideas', '/blogs')}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ${active === 'ideas' ? 'bg-blue-500' : 'hover:bg-blue-400'} rounded-full`}
        >
          <Image 
            src={Bulb} 
            alt="Ideas" 
            width={20} 
            height={20} 
            style={{ filter: 'invert(100%) brightness(100%)' }} 
          />
        </div>

        <div 
          aria-label="Chat" 
          onClick={() => handleClick('chat', '/transcriber')}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ${active === 'chat' ? 'bg-blue-500' : 'hover:bg-blue-400'} rounded-full`}
        >
          <Image src={Chat} alt="Chat" width={20} height={20} />
        </div>

        <div 
          aria-label="Tracker" 
          onClick={() => handleClick('tracker', '/timer')}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ${active === 'tracker' ? 'bg-blue-500' : 'hover:bg-blue-400'} rounded-full`}
        >
          <Image src={Track} alt="Tracker" width={20} height={20} />
        </div>
      </nav>

      <div className="mt-auto mb-4">
        <div 
          aria-label="Profile" 
          className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full cursor-pointer"
        >
          <Image src={ProfileIcon} alt="Profile Icon" width={20} height={20} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
