import { ReactNode } from "react";

interface GridWrapperProps {
  children: ReactNode;
  zoom: number;
}

export default function GridWrapper({ children, zoom }: GridWrapperProps) {
  const gridSize = 500 * 4 * 20; // 500 sqm * 4 tiles per sqm * 20px per tile

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-200 overflow-hidden">
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left", // ✅ Keeps the grid visible when zooming out
          backgroundSize: `${80 * zoom}px ${80 * zoom}px`, // ✅ Adjust grid tiles with zoom
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)
          `,
          width: `${gridSize}px`, // ✅ Set fixed grid size
          height: `${gridSize}px`, // ✅ Same as width
          border: "2px solid black", // ✅ Visible outline
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
