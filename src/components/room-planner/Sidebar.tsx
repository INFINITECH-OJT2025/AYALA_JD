"use client";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  addRoom: () => void;
  addItemToGrid: (name: string, width: number, height: number, image: string) => void;
}

export default function Sidebar({ addRoom, addItemToGrid }: SidebarProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // ✅ Dynamic Data
  const categories = [
    {
      name: "Living Room",
      items: [{ name: "Sofa", width: 228, height: 99, image: "/living1.png" }],
    },
    {
      name: "Bedroom",
      items: [{ name: "Bed (Queen)", width: 200, height: 150, image: "/bedroom1.png" }],
    },
    {
      name: "Dining Room",
      items: [{ name: "Dining Table", width: 180, height: 100, image: "/dining1.png" }],
    },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r h-screen overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Room Planner</h2>

      {/* ✅ Add Room Button */}
      <button className="w-full bg-blue-500 text-white py-2 rounded mb-4" onClick={addRoom}>
        Add Room
      </button>

      {/* ✅ Dropdown Categories */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index}>
            {/* ✅ Clickable Category Header */}
            <button
              className="w-full text-left text-md font-semibold bg-blue-200 p-2 rounded"
              onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
            >
              {category.name}
            </button>

            {/* ✅ Show Items If Open */}
            {openCategory === category.name && (
              <div className="pl-4 mt-2 space-y-2">
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer border p-2 rounded hover:bg-gray-300"
                    onClick={() => addItemToGrid(item.name, item.width, item.height, item.image)}
                  >
                    <Image src={item.image} alt={item.name} width={60} height={60} />
                    <p className="text-sm text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
