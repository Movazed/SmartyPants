import React from 'react';
import Image from 'next/image';
import book from "@/assets/local_library.png";
import game from "@/assets/stadia_controller.png";
import watch from "@/assets/timelapse.png";

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-md shadow text-center">
        <Image src={book} alt="Books" width={20} height={20} className="mx-auto mb-2" />
        <div className="text-lg font-semibold">3/7 courses</div>
      </div>
      <div className="bg-white p-4 rounded-md shadow text-center">
        <Image src={game} alt="Games" width={20} height={20} className="mx-auto mb-2" />
        <div className="text-lg font-semibold">2 Roadmaps</div>
      </div>
      <div className="bg-white p-4 rounded-md shadow text-center">
        <Image src={watch} alt="Time Spent" width={20} height={20} className="mx-auto mb-2" />
        <div className="text-lg font-semibold">2 hours learning</div>
      </div>
    </div>
  );
};

export default Stats;
