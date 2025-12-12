import React from "react";

export default function AutoFillControls({ selectedCell, recordTable, setRecordTable }) {
  const disabled = !selectedCell;

  // ================================
  // AUTO FILL ENTIRE ROW
  // ================================
  const handleAutoFillRow = () => {
    if (!selectedCell) return;

    const { weekIndex, dayIndex, shiftIndex } = selectedCell;
    const src = recordTable[weekIndex][dayIndex];

    const updated = [...recordTable];

    // Copy selected shift to ALL 5 shifts of the SAME day
    for (let s = 0; s < 5; s++) {
      updated[weekIndex][dayIndex][`startTime${s + 1}`] =
        src[`startTime${shiftIndex + 1}`];

      updated[weekIndex][dayIndex][`endTime${s + 1}`] =
        src[`endTime${shiftIndex + 1}`];

      updated[weekIndex][dayIndex][`breakTime${s + 1}`] =
        src[`breakTime${shiftIndex + 1}`];
    }

    setRecordTable(updated);
  };

  // ================================
  // AUTO FILL ENTIRE COLUMN
  // ================================
  const handleAutoFillColumn = () => {
    if (!selectedCell) return;

    const { weekIndex, dayIndex, shiftIndex } = selectedCell;
    const src = recordTable[weekIndex][dayIndex];
    const updated = [...recordTable];

    // Copy selected shift to ALL days in ALL weeks
    for (let w = 0; w < 6; w++) {
      for (let d = 0; d < 7; d++) {
        updated[w][d][`startTime${shiftIndex + 1}`] =
          src[`startTime${shiftIndex + 1}`];

        updated[w][d][`endTime${shiftIndex + 1}`] =
          src[`endTime${shiftIndex + 1}`];

        updated[w][d][`breakTime${shiftIndex + 1}`] =
          src[`breakTime${shiftIndex + 1}`];
      }
    }

    setRecordTable(updated);
  };

  return (
    <div style={{ textAlign: "right", marginBottom: 10 }}>
      <button
        className="btn btn-primary btn-sm"
        disabled={disabled}
        onClick={handleAutoFillRow}
        style={{ marginRight: 8 }}
      >
        <i className="fa fa-arrows-h"></i> 行を自動入力
      </button>

      <button
        className="btn btn-primary btn-sm"
        disabled={disabled}
        onClick={handleAutoFillColumn}
      >
        <i className="fa fa-arrows-v"></i> 列を自動入力
      </button>
    </div>
  );
}