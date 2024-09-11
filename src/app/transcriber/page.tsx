"use client";

import React, { useState } from 'react';
import { HeaderLogin } from '@/sections/Header_login';
import { FooterLogin } from '@/sections/Footer_login';
import Sidebar from '@/components/Sidebar';

const NoteGenerator: React.FC = () => {
  const [videoLink, setVideoLink] = useState('');
  const [notes, setNotes] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNotes = async () => {
    if (!videoLink) {
      alert('Please enter a YouTube link');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generateSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeLink: videoLink }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }

      const rawData = await response.json();
      console.log('Raw response:', rawData);

      // Parse the nested JSON string
      const nestedSummary = JSON.parse(rawData.summary);

      setNotes(nestedSummary);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to generate notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to convert markdown-like **bold** and *bullet points* to HTML
  const convertToHtml = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong>
      .replace(/\n/g, '<br />') // Convert new lines to <br>
      .replace(/^\* (.+)$/gm, '<b>• $1</b>') // Convert * bullet points to • <li>
      .replace(/(<li>.+<\/li>)/g, '<ul>$1</ul>') // Wrap <li> items in <ul>
      .replace(/<\/ul>\s*<\/ul>/g, '</ul>'); // Handle multiple <ul> tags in case of nested lists
  };

  const renderNotes = (summary: any) => {
    if (typeof summary !== 'object' || summary === null) {
      console.error('Unexpected format for summary:', summary);
      return <p className="text-red-500">Invalid note format</p>;
    }

    const renderValue = (value: any) => {
      if (typeof value === 'string') {
        return (
          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: convertToHtml(value) }} />
        );
      } else if (Array.isArray(value)) {
        return (
          <ul className="list-disc ml-5">
            {value.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: convertToHtml(item) }} />
            ))}
          </ul>
        );
      } else if (typeof value === 'object') {
        return renderNotes(value);
      } else {
        return <p className="text-gray-700">Unsupported format</p>;
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-inner">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">{key.toUpperCase()}</h3>
            {renderValue(value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        .animated-background {
          background: linear-gradient(120deg, #E3F2FD, #BBDEFB, #4DD0E1);
          background-size: 300% 300%;
          animation: gradientAnimation 10s ease infinite;
          position: relative;
          overflow: hidden;
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Bubble effect */
        .bubble {
          position: absolute;
          bottom: -50px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          opacity: 0.6;
          animation: bubbleUp 15s infinite ease-in-out;
        }

        @keyframes bubbleUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-300px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-600px) scale(1.5);
            opacity: 0;
          }
        }

        .bubble:nth-child(1) {
          width: 80px;
          height: 80px;
          left: 10%;
          animation-duration: 20s;
        }
        .bubble:nth-child(2) {
          width: 120px;
          height: 120px;
          left: 30%;
          animation-duration: 25s;
          animation-delay: 2s;
        }
        .bubble:nth-child(3) {
          width: 100px;
          height: 100px;
          left: 50%;
          animation-duration: 18s;
          animation-delay: 4s;
        }
        .bubble:nth-child(4) {
          width: 140px;
          height: 140px;
          left: 70%;
          animation-duration: 22s;
          animation-delay: 6s;
        }
        .bubble:nth-child(5) {
          width: 90px;
          height: 90px;
          left: 90%;
          animation-duration: 20s;
          animation-delay: 8s;
        }
      `}</style>
      <HeaderLogin />
      <div className="flex flex-grow animated-background">
        <Sidebar />
        <div className="flex-grow p-8 relative">
          {/* Bubble elements */}
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                Generate Your Notes<br />with One Single Click
              </h1>
              <p className="text-cyan-700 text-lg">
                SMARTYPANTS offers a tool that generates smart notes from any video you give to it, so that<br />
                when you need, you have the best notes summarized for you with a single click!
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">ENTER VIDEO LINK</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="Your video link here"
                  className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={generateNotes}
                  className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'GENERATE NOTES'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-500">
                <p>{error}</p>
              </div>
            )}

            {notes && (
              <div className="mt-8 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-lg p-8 transition duration-500 hover:shadow-xl">
                <h3 className="text-2xl font-semibold text-cyan-700 mb-6">Here are the Summarized Notes for You!</h3>
                {renderNotes(notes)}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default NoteGenerator;
