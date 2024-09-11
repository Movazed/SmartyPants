import { FC } from "react";
import { Button } from "@/components/ui/button";

interface TimerDialogBoxProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export const TimerDialogBox: FC<TimerDialogBoxProps> = ({ show, onConfirm, onCancel, title, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#263238] p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">{title || "Are you sure?"}</h2>
        <p className="text-gray-300 mb-6">{message || "Do you want to start the timer?"}</p>
        <div className="flex justify-center space-x-4">
          <Button
            className="bg-white text-[#263238] px-4 py-2 rounded hover:bg-gray-200 font-bold"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#4DD0E1] text-white px-4 py-2 rounded hover:bg-[#3cb6c8] font-bold"
            onClick={onConfirm}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};
