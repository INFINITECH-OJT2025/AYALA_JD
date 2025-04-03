import React, { useEffect } from 'react';

const RoomPlannerPage: React.FC = () => {
  useEffect(() => {
    // Set the page title dynamically when the page loads
    document.title = 'AyalaLand Room Planner'; // This title will appear in the browser tab
  }, []);

  return (
    <div className="room-planner-container">
      <h1 className="text-center text-3xl mb-6">AyalaLand Room Planner</h1>
      <iframe
        src="https://roomplanner-nu.vercel.app/roomplanner/abic"
        title="AyalaLand Room Planner"
        width="100%"
        height="800px"
        frameBorder="0"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default RoomPlannerPage;
