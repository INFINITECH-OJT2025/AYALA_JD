"use client";
import { useState } from "react";
import { Rnd, RndResizeCallback } from "react-rnd"; // ✅ Correct import

interface RoomProps {
    id: number;
    width: number;
    height: number;
    onUpdate: (id: number, width: number, height: number, x: number, y: number) => void;
    onSelect: (id: number) => void;
    isSelected: boolean;
    image?: string; // ✅ Ensure `image` is part of props
  }
  
  export default function Room({ id, width, height, onUpdate, onSelect, isSelected, image }: RoomProps) { // ✅ Destructure `image`
    const [position, setPosition] = useState({ x: 100, y: 100 });
  
    const handleResizeStop = (e: any, direction: any, ref: any, delta: any, pos: any) => {
      onUpdate(id, parseInt(ref.style.width), parseInt(ref.style.height), pos.x, pos.y);
    };
  
    return (
      <Rnd
        size={{ width, height }}
        position={position}
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResizeStop={handleResizeStop}
        className={`border ${isSelected ? "border-blue-500" : "border-gray-600"} bg-transparent`}
        style={{ position: "absolute" }}
        onClick={() => onSelect(id)}
      >
        <div className="relative w-full h-full flex items-center justify-center border-2 border-gray-700">
          {image ? (
            <img src={image} alt={`Item ${id}`} className="w-full h-full object-contain" /> // ✅ Show image if available
          ) : (
            <>Room {id + 1}</> // ✅ Default text for normal rooms
          )}
        </div>
      </Rnd>
    );
  }
  