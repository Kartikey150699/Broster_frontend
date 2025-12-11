import React from "react";

export default function AutoFillControls({ selectedCell, onAutoFillRow, onAutoFillColumn }) {
  const disabled = !selectedCell;

  return (
    <div style={{ textAlign: "right", marginBottom: 10 }}>
      <button
        className="btn btn-primary btn-sm"
        disabled={disabled}
        onClick={onAutoFillRow}
        style={{ marginRight: 8 }}
      >
        <i className="fa fa-arrows-h"></i> 行を自動入力
      </button>

      <button
        className="btn btn-primary btn-sm"
        disabled={disabled}
        onClick={onAutoFillColumn}
      >
        <i className="fa fa-arrows-v"></i> 列を自動入力
      </button>
    </div>
  );
}