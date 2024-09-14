import React, { useState, useEffect } from "react";
import { CameraDialogBox } from "./CameraDialogBox"; // Adjust the import path as needed

const CameraComponent: React.FC = () => {
  const [isCameraStopped, setIsCameraStopped] = useState(false);

  // Simulate a function to check the camera status
  const checkCameraStatus = () => {
    // Replace this with actual logic to check the camera status
    // Example: Simulate a camera stop after 5 seconds
    setTimeout(() => {
      setIsCameraStopped(true);
    }, 5000);
  };

  useEffect(() => {
    checkCameraStatus();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const handleConfirm = () => {
    setIsCameraStopped(false);
    console.log("User confirmed. Restarting the camera...");
    // Implement camera restart logic here
  };

  const handleCancel = () => {
    setIsCameraStopped(false);
    console.log("User canceled the action.");
    // Implement what should happen if the user cancels
  };

  return (
    <div>
      {/* Your camera implementation here */}
      {/* Example camera view (replace with actual camera component) */}
      <div className="camera-view">
        <p>Camera feed goes here...</p>
      </div>

      <CameraDialogBox
        show={isCameraStopped}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Camera Error"
        message="You went off the camera. Do you want to continue?"
      />
    </div>
  );
};

export default CameraComponent;
