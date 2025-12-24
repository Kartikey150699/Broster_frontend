import React from "react";

export default function ShiftCell({
  children,
  w,
  d,
  shiftIndex,
  isHighlighted,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) {
  return (
    <div
      className="shift-cell"
      style={{
        position: "relative",
        padding: 4,
        background: isHighlighted ? "#cce5ff" : "white",
        border: isHighlighted ? "2px solid #3399ff" : "1px solid #ddd",
      }}
      onMouseEnter={() => onDragEnter(w, d, shiftIndex)}
      onMouseUp={onDragEnd}
    >
      {children}

      {/* DRAG HANDLE (only this triggers dragging) */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          onDragStart(w, d, shiftIndex);
        }}
        style={{
          width: 10,
          height: 10,
          background: "#3399ff",
          position: "absolute",
          bottom: 2,
          right: 2,
          cursor: "crosshair",
        }}
      ></div>
    </div>
  );
}
