"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeaderLogin } from "@/sections/Header_login";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import { TimerDialogBox } from "@/components/TimerDialogBox"; // Import TimerDialogBox component
import { CameraDialogBox } from "@/components/CameraDialogBox"; // Import CameraDialogBox component

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(25 * 60); // Initial time: 25 minutes
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Elapsed time for stopwatch
  const [activeButton, setActiveButton] = useState<string>("pomodoro");
  const [buttonState, setButtonState] = useState<'start' | 'pause' | 'reset'>('start');
  const [sessionCount, setSessionCount] = useState<number>(1); // Track session count
  const [showDialog, setShowDialog] = useState<boolean>(false); // State for timer dialog visibility
  const [showCameraDialog, setShowCameraDialog] = useState<boolean>(false); // State for camera dialog visibility

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start face detection via API
  const startFaceDetection = async () => {
    try {
      await fetch("/api/start_face_detection", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error starting face detection:", error);
    }
  };

  // Polling the server for face detection results
  useEffect(() => {
    const interval = setInterval(async () => {
      if (isRunning) {
        try {
          const response = await fetch("/api/check_face_status");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data.status === "no_face") {
            setShowCameraDialog(true); // Show the camera dialog if no face is detected
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      }
    }, 1000);
    return () => clearInterval(interval); // Clean up on unmount
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      if (activeButton === "pomodoro") {
        setShowDialog(true); // Show dialog if in pomodoro mode
      } else {
        beginTimer(); // Start timer immediately if not in pomodoro mode
      }
      startFaceDetection(); // Start face detection when timer starts
    }
  };

  const beginTimer = () => {
    setIsRunning(true);
    setButtonState('start');
    timerIntervalRef.current = setInterval(() => {
      if (activeButton === "pomodoro") {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerIntervalRef.current!);
            setIsRunning(false);
            setButtonState('reset');
            setSessionCount((prevCount) => prevCount + 1);
            return 0;
          }
          return prevTime - 1;
        });
      } else if (activeButton === "stopwatch") {
        setElapsedTime((prevTime) => prevTime + 1);
      }
    }, 1000);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (activeButton === "pomodoro") {
      setTime(25 * 60); // Reset time to 25 minutes
    } else if (activeButton === "stopwatch") {
      setElapsedTime(0); // Reset elapsed time
    }
    setButtonState('reset');
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setButtonState('pause');
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleConfirm = () => {
    setShowDialog(false);
    beginTimer(); // Start timer after confirming
  };

  const handleCancel = () => {
    setShowDialog(false); // Just close the dialog
  };

  const handleCameraConfirm = () => {
    setShowCameraDialog(false); // Close the camera dialog and continue
  };

  const handleCameraCancel = () => {
    setShowCameraDialog(false); // Stop the timer or other logic if needed
    resetTimer(); // Reset the timer when camera detection is declined
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(120deg, #E3F2FD, #BBDEFB, #4DD0E1);
          background-size: 300% 300%;
          animation: gradientAnimation 10s ease infinite;
          z-index: -1;
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

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
      <div className="animated-background"></div> {/* Background animation added */}

      <HeaderLogin />
      <div className="flex">
        <Sidebar /> {/* Sidebar component added here */}
        <div className="flex flex-col items-center justify-center min-h-screen flex-grow relative">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

          <div className="flex space-x-2 mb-8">
            <Button
              variant={activeButton === "pomodoro" ? "default" : "secondary"}
              size="default"
              className={`rounded-full font-bold px-6 py-2 text-sm tracking-wide ${
                activeButton === "pomodoro"
                  ? "bg-[#4DD0E1] text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => {
                setActiveButton("pomodoro");
                resetTimer();
              }}
            >
              POMODORO TIMER
            </Button>
            <Button
              variant={activeButton === "stopwatch" ? "default" : "secondary"}
              size="default"
              className={`rounded-full font-bold px-6 py-2 text-sm tracking-wide ${
                activeButton === "stopwatch"
                  ? "bg-[#4DD0E1] text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => {
                setActiveButton("stopwatch");
                resetTimer();
              }}
            >
              STOPWATCH
            </Button>
          </div>

          <div className="text-sm text-gray-600 mb-4 font-bold"> {sessionCount} of 4 </div>

          <div className="flex items-center mb-8">
            <div className="w-48 h-48 flex items-center justify-center bg-[#263238] text-white text-8xl rounded-lg font-['Roboto_Mono'] font-bold">
              {displayTime(activeButton === "pomodoro" ? time : elapsedTime).split(':')[0]}
            </div>
            <div className="text-8xl mx-4 text-[#263238] font-['Roboto_Mono'] font-bold">:</div>
            <div className="w-48 h-48 flex items-center justify-center bg-[#263238] text-white text-8xl rounded-lg font-['Roboto_Mono'] font-bold">
              {displayTime(activeButton === "pomodoro" ? time : elapsedTime).split(':')[1]}
            </div>
          </div>

          <div className="flex justify-between w-[calc(2*12rem+2rem)] mb-8">
            <div className="text-sm text-gray-600 font-medium tracking-wide">MINUTES</div>
            <div className="text-sm text-gray-600 font-medium tracking-wide">SECONDS</div>
          </div>

          <div className="flex space-x-4">
            <Button
              size="lg"
              variant="secondary"
              className={`rounded-md transform transition-all w-36 h-16 text-xl font-bold tracking-wide ${
                buttonState === 'pause' ? 'bg-[#4DD0E1] text-white' : 'bg-white text-[#263238]'
              }`}
              onClick={pauseTimer}
            >
              PAUSE
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className={`rounded-md transform transition-all w-36 h-16 text-xl font-bold tracking-wide ${
                buttonState === 'start' ? 'bg-[#4DD0E1] text-white' : 'bg-white text-[#263238]'
              }`}
              onClick={startTimer}
            >
              START
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className={`rounded-md transform transition-all w-36 h-16 text-xl font-bold tracking-wide ${
                buttonState === 'reset' ? 'bg-[#4DD0E1] text-white' : 'bg-white text-[#263238]'
              }`}
              onClick={resetTimer}
            >
              RESET
            </Button>
          </div>
        </div>
      </div>

      {/* Timer Dialog Box */}
      <TimerDialogBox
        show={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Start Pomodoro Timer"
        message="Are you sure you want to start the Pomodoro timer?"
      />

      {/* Camera Detection Dialog Box */}
      <CameraDialogBox
        show={showCameraDialog}
        onConfirm={handleCameraConfirm}
        onCancel={handleCameraCancel}
        title="No Face Detected"
        message="We couldn't detect your face. Would you like to continue?"
      />
    </>
  );
}
