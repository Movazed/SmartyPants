import { FC } from "react";
import { Button } from "@/components/ui/button";

interface CameraDialogBoxProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export const CameraDialogBox: FC<CameraDialogBoxProps> = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#263238] p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">You went off the camera. Do you want to continue?</h2>
        <p className="text-gray-300 mb-6">{message || ""}</p>
        <div className="flex justify-center space-x-4">
          <Button
            className="bg-white text-[#263238] px-4 py-2 rounded hover:bg-gray-200 font-bold"
            onClick={onCancel}
          >
            No
          </Button>
          <Button
            className="bg-[#4DD0E1] text-white px-4 py-2 rounded hover:bg-[#3cb6c8] font-bold"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};
