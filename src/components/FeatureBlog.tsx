import React from 'react';
import { FaBook, FaClipboardList } from 'react-icons/fa';

const FeaturedBlog: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-md shadow flex items-start">
        <div className="text-blue-500 text-2xl mr-4">
          <FaBook />
        </div>
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-700">Codeforces round 970 solution</h3>
          <p className="text-sm text-gray-500 mb-2">Div 2 solution ABCDEFG.</p>
          <iframe 
            width="100%" 
            height="200" 
            src="https://www.youtube.com/embed/pZlCq4e21Cs?start=130" 
            title="C++ Complete Roadmap" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
          <p className="text-xs text-gray-400 mt-2">aryanc</p>
          <a 
            href="https://codeforces.com/blog/aryanc403" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Read the blog
          </a>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-md shadow flex items-start">
        <div className="text-white text-2xl mr-4">
          <FaClipboardList />
        </div>
        <div className="w-full">
          <h3 className="text-lg font-semibold text-white">Solution Div 4 Round 971.</h3>
          <p className="text-sm text-gray-300 mb-2">Recent Codeforces round Div 4 solutions by top 10 Global.</p>
          <iframe 
            width="100%" 
            height="200" 
            src="https://www.youtube.com/embed/OcYhGJe4rpI?start=360" 
            title="DSA Roadmap" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
          <p className="text-xs text-gray-400 mt-2">Shayan</p>
          <a 
            href="https://codeforces.com/blog/entry/133585" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Read the blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
