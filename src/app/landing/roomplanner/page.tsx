import React from 'react';

const RoomPlanner = () => {
  return (
    <div className="h-screen">
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
