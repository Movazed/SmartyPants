"use client";
import { useCallback, useState, useRef, useEffect } from "react";
import { HeaderLogin } from "@/sections/Header_login";
import Sidebar from "@/components/Sidebar";
import TimerDisplay from "@/components/TimerDisplay";
import TimerControls from "@/components/TimerControls";
import { TimerDialogBox } from "@/components/TimerDialogBox";
import { CameraDialogBox } from "@/components/CameraDialogBox";
import BubbleBackground from "@/components/BubbleBackground";
import React from "react";

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
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null); // Ref to track the start time
  const faceDetectionPollingRef = useRef<NodeJS.Timeout | null>(null); // Ref for face detection polling

  const stopFaceDetection = async () => {
    try {
      const response = await fetch('/api/face-detection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'stop' }), // Stop the face detection script
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Stop face detection response:', data);
    } catch (error) {
      console.error('Error during stopping face detection:', error);
    }
  };

  const startTimer = async () => {
    if (!isRunning) {
      if (activeButton === "pomodoro") {
        // Trigger Timer Dialog Box only for Pomodoro
        setShowDialog(true);

        // API call to start face detection for Pomodoro only
        try {
          const response = await fetch('/api/face-detection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'start' }), // Updated body content
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('API response:', data); // Handle API response here
        } catch (error) {
          console.error('Error during API call:', error);
        }

        startTimeRef.current = Date.now(); // Set start time when timer is started

        // Start polling for face detection for Pomodoro
        pollingIntervalRef.current = setInterval(async () => {
          try {
            const response = await fetch('/api/face-detection', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Face detection status:', data);

            const currentTime = Date.now();
            if (startTimeRef.current && currentTime - startTimeRef.current > 23000) {
              if (!data.faceDetected) {
                setShowCameraDialog(true); // Trigger Camera Dialog Box if no face is detected
                pauseTimer(); // Pause the timer if no face is detected
              }
            }
          } catch (error) {
            console.error('Error during face detection polling:', error);
          }
        }, 2000); // Poll every 2 seconds
      } else {
        // No Pomodoro-specific behavior for stopwatch
        beginTimer();
      }
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
        // Normal stopwatch behavior, simply incrementing elapsed time
        setElapsedTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    // Optionally handle face detection start for Pomodoro only
    if (activeButton === "pomodoro") {
      setFaceDetectionRunning(true);
    }
  };

  const resetTimer = async () => {
    setIsRunning(false);
    setFaceDetectionRunning(false); // Stop face detection for Pomodoro only
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
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (faceDetectionPollingRef.current) {
      clearInterval(faceDetectionPollingRef.current);
      faceDetectionPollingRef.current = null;
    }

    // Stop the face detection script for Pomodoro only
    if (activeButton === "pomodoro") {
      await stopFaceDetection();
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setButtonState('pause');
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (faceDetectionPollingRef.current) {
      clearInterval(faceDetectionPollingRef.current);
      faceDetectionPollingRef.current = null;
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

    // Start polling for face detection after CameraDialogBox confirmation
    faceDetectionPollingRef.current = setInterval(async () => {
      try {
        const response = await fetch('/api/face-detection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Face detection status:', data);

        if (!data.faceDetected) {
          setShowCameraDialog(true); // Trigger Camera Dialog Box if no face is detected
          pauseTimer(); // Pause the timer if no face is detected
        }
      } catch (error) {
        console.error('Error during face detection polling:', error);
      }
    }, 2000); // Poll every 2 seconds
  };

  const handleCameraCancel = async () => {
    setShowCameraDialog(false);
    await resetTimer(); // Reset the timer and stop face detection for Pomodoro

    // Ensure the face detection script is stopped for Pomodoro only
    await stopFaceDetection();
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
