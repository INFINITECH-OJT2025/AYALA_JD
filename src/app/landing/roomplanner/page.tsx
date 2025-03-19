"use client";
import GridWrapper from "@/components/room-planner/Grid";
import Sidebar from "@/components/room-planner/Sidebar";
import Room from "@/components/room-planner/Room";
import { useState } from "react";

interface RoomData {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  image?: string; // ✅ Allow images (for furniture)
}

export default function RoomPlanner() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);

  // ✅ Add Room Manually
  const addRoom = () => {
    const newRoom: RoomData = {
      id: rooms.length,
      width: 200,
      height: 150,
      x: 100,
      y: 100,
    };
    setRooms([...rooms, newRoom]);
  };

  // ✅ Add Item (from Sidebar)
  const addItemToGrid = (name: string, width: number, height: number, image: string) => {
    const newItem: RoomData = {
      id: rooms.length,
      width,
      height,
      x: 100,
      y: 100,
      image, // ✅ Add image-based item
    };
    setRooms([...rooms, newItem]);
  };

  // ✅ Update Room (Resize, Move)
  const updateRoom = (id: number, width: number, height: number, x: number, y: number) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, width, height, x, y } : room)));
  };

  // ✅ Delete Selected Room
  const deleteRoom = () => {
    if (selectedRoom !== null) {
      setRooms(rooms.filter((room) => room.id !== selectedRoom));
      setSelectedRoom(null);
    }
  };

  // ✅ Export Layout as JSON
  const exportLayout = () => {
    const data = JSON.stringify(rooms);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "room-planner-layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar */}
      <Sidebar addRoom={addRoom} addItemToGrid={addItemToGrid} />

      {/* ✅ Main Content */}
      <div className="flex flex-col flex-1">
        {/* ✅ Toolbar */}
        <div className="bg-blue-500 text-white p-3 flex justify-center space-x-4">
          <button className="bg-white text-blue-500 px-4 py-2 rounded">New</button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={addRoom}>
            Add Room
          </button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded">Add Text</button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={deleteRoom}>
            Delete
          </button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={() => setZoom(zoom + 0.1)}>
            Zoom In
          </button>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded"
            onClick={() => setZoom((prevZoom) => (prevZoom > 0.5 ? prevZoom - 0.1 : prevZoom))} // ✅ Limit to 5 clicks
          >
            Zoom Out
          </button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={exportLayout}>
            Export
          </button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={() => setShowLabels(!showLabels)}>
            On/Off Label
          </button>
        </div>

        {/* ✅ Main Grid */}
        <div className="flex-1 overflow-hidden">
          <GridWrapper zoom={zoom}>
            <div className="relative w-full h-full">
              {rooms.map((room) => (
                <Room
                  key={room.id}
                  id={room.id}
                  width={room.width}
                  height={room.height}
                  onUpdate={updateRoom}
                  onSelect={setSelectedRoom}
                  isSelected={selectedRoom === room.id}
                  image={room.image} // ✅ Display furniture images if available
                />
              ))}
            </div>
          </GridWrapper>
        </div>
      </div>
    </div>
  );
}
