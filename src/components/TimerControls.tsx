import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  buttonState: 'start' | 'pause' | 'reset';
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export default function TimerControls({
  buttonState,
  startTimer,
  pauseTimer,
  resetTimer
}: TimerControlsProps) {
  return (
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
  );
}