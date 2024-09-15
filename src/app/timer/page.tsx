"use client"

import { useCallback, useState, useRef, useEffect } from "react";
import { HeaderLogin } from "@/sections/Header_login";
import Sidebar from "@/components/Sidebar";
import TimerDisplay from "@/components/TimerDisplay";
import TimerControls from "@/components/TimerControls";
import { TimerDialogBox } from "@/components/TimerDialogBox";
import { CameraDialogBox } from "@/components/CameraDialogBox";
import BubbleBackground from "@/components/BubbleBackground";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(25 * 60);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<string>("pomodoro");
  const [buttonState, setButtonState] = useState<'start' | 'pause' | 'reset'>('start');
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showCameraDialog, setShowCameraDialog] = useState<boolean>(false);
  const [faceDetectionRunning, setFaceDetectionRunning] = useState(false);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startFaceDetection = async () => {
    try {
      await fetch("/api/start_face_detection", { method: "POST" });
      setFaceDetectionRunning(true);
    } catch (error) {
      console.error("Error starting face detection:", error);
    }
  };

  const checkFaceDetectionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/check_face_status");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data.status === "no_face") {
        pauseTimer(); // Pause the timer when no face is detected
        setShowCameraDialog(true); // Show the camera dialog to the user
      }
    } catch (error) {
      console.error("Error checking face detection status:", error);
    }
  }, []);

  useEffect(() => {
    if (isRunning && faceDetectionRunning) {
      const interval = setInterval(() => {
        checkFaceDetectionStatus();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, faceDetectionRunning, checkFaceDetectionStatus]);

  const startTimer = () => {
    if (!isRunning) {
      setShowDialog(true); // Trigger Timer Dialog Box
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
    startFaceDetection(); // Start face detection when the timer starts
  };

  const resetTimer = () => {
    setIsRunning(false);
    setFaceDetectionRunning(false); // Stop face detection
    if (activeButton === "pomodoro") {
      setTime(25 * 60);
    } else if (activeButton === "stopwatch") {
      setElapsedTime(0);
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

  const handleConfirm = () => {
    setShowDialog(false);
    beginTimer();
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleCameraConfirm = () => {
    setShowCameraDialog(false);
    beginTimer(); // Continue the timer when the user confirms
  };

  const handleCameraCancel = () => {
    setShowCameraDialog(false);
    resetTimer(); // Reset the timer when the user cancels
  };

  return (
    <>
      <BubbleBackground />
      <HeaderLogin />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center min-h-screen flex-grow relative">
          <TimerDisplay
            activeButton={activeButton}
            time={time}
            elapsedTime={elapsedTime}
            sessionCount={sessionCount}
            setActiveButton={setActiveButton}
            resetTimer={resetTimer}
          />
          <TimerControls
            buttonState={buttonState}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />
        </div>
      </div>
      <TimerDialogBox
        show={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Start Pomodoro Timer"
        message="Are you sure you want to start the Pomodoro timer?"
      />
      <CameraDialogBox
        show={showCameraDialog}
        onConfirm={handleCameraConfirm}
        onCancel={handleCameraCancel}
        title="No Face Detected"
        message="We couldn't detect your face. The timer has been paused. Would you like to continue?"
      />
    </>
  );
}
