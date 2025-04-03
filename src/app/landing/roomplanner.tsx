import React from 'react';

const RoomPlanner = () => {
  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl font-bold mb-4">AyalaLand Room Planner</h1>
      <iframe
        src="https://roomplanner-nu.vercel.app/roomplanner/abic"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default RoomPlanner;
