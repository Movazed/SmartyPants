import { Button } from "@/components/ui/button";

interface TimerDisplayProps {
  activeButton: string;
  time: number;
  elapsedTime: number;
  sessionCount: number;
  setActiveButton: (button: string) => void;
  resetTimer: () => void;
}

export default function TimerDisplay({
  activeButton,
  time,
  elapsedTime,
  sessionCount,
  setActiveButton,
  resetTimer
}: TimerDisplayProps) {
  const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
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
    </>
  );
}