import React from "react";

const ContextMenu: React.FC<{ x: number; y: number; onDelete: () => void }> = ({
  x,
  y,
  onDelete,
}) => {
  return (
    <div
      className="fade-in-componen absolute p-2 bg-white border rounded shadow"
      style={{ top: y, left: x }}
    >
      <div onClick={onDelete} 
        className="rounded-md p-2 text-white text-bold cursor-pointer w-100 bg-red-500 hover:bg-red-600 transition"

      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;