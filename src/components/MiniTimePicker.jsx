import { useState, useRef, useEffect } from "react";

export default function MiniTimePicker({ value, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(value || "");
  const ref = useRef();

  // Sync internal time whenever parent value changes
  useEffect(() => {
    setTime(value || "");
  }, [value]);

  // 外側クリックでドロップダウンを閉じる
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Update parent + update UI
  const update = (newTime) => {
    setTime(newTime);
    if (onChange) onChange(newTime); // Always update parent
  };

  // Adjust hour/minute
  const adjustTime = (field, step) => {
    let [h, m] = (time || "00:00").split(":").map(Number);

    if (field === "h") {
      h = (h + step + 24) % 24;
    } else {
      m = (m + step + 60) % 60;
    }

    const finalTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    update(finalTime); // Parent updates immediately
  };

  return (
    <div
      ref={ref}
      className="mini-picker-wrap"
      style={{ position: "relative", display: "inline-block" }}
    >
      <input
        type="text"
        value={time}
        onChange={(e) => update(e.target.value)}
        onClick={() => {
          setOpen(true);

          // Tell ShiftCreate which cell is selected
          if (onSelect) onSelect();

          // Also sync parent immediately
          if (onChange) onChange(time);
        }}
        placeholder="--:--"
        className="form-control mini-picker-input"
        style={{ width: 70, textAlign: "center" }}
      />

      {open && (
        <div
          className="mini-picker-panel"
          style={{
            position: "absolute",
            top: "34px",
            left: 0,
            width: 120,
            padding: 8,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: 3,
            zIndex: 999,
          }}
        >
          {/* TIME */}
          <div className="mini-picker-grid">
            {/* Hour */}
            <button
              className="mini-picker-btn"
              onClick={() => adjustTime("h", +1)}
            >
              ▲
            </button>
            <span>時</span>
            <button
              className="mini-picker-btn"
              onClick={() => adjustTime("h", -1)}
            >
              ▼
            </button>

            {/* Minute */}
            <button
              className="mini-picker-btn"
              onClick={() => adjustTime("m", +1)}
            >
              ▲
            </button>
            <span>分</span>
            <button
              className="mini-picker-btn"
              onClick={() => adjustTime("m", -1)}
            >
              ▼
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
