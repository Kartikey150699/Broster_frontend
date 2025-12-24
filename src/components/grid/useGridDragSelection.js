import { useState } from "react";

export default function useGridDragSelection(recordTable, setRecordTable) {
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (w, d, s) => {
    setDragStart({ w, d, s });
    setDragEnd({ w, d, s });
    setIsDragging(true);
  };

  const handleDragEnter = (w, d, s) => {
    if (!isDragging) return;
    setDragEnd({ w, d, s });
  };

  const handleDragEnd = () => {
    if (!dragStart || !dragEnd) {
      resetDrag();
      return;
    }

    const { w: sw, d: sd, s: ss } = dragStart;
    const { w: ew, d: ed, s: es } = dragEnd;

    const minW = Math.min(sw, ew);
    const maxW = Math.max(sw, ew);
    const minD = Math.min(sd, ed);
    const maxD = Math.max(sd, ed);
    const minS = Math.min(ss, es);
    const maxS = Math.max(ss, es);

    const src = recordTable[sw][sd];

    const updated = [...recordTable];

    for (let w = minW; w <= maxW; w++) {
      for (let d = minD; d <= maxD; d++) {
        for (let s = minS; s <= maxS; s++) {
          updated[w][d][`startTime${s + 1}`] = src[`startTime${ss + 1}`];
          updated[w][d][`endTime${s + 1}`] = src[`endTime${ss + 1}`];
          updated[w][d][`breakTime${s + 1}`] = src[`breakTime${ss + 1}`];
        }
      }
    }

    setRecordTable(updated);
    resetDrag();
  };

  const resetDrag = () => {
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };

  const isCellHighlighted = (w, d, s) => {
    if (!isDragging || !dragStart || !dragEnd) return false;

    const { w: sw, d: sd, s: ss } = dragStart;
    const { w: ew, d: ed, s: es } = dragEnd;

    return (
      w >= Math.min(sw, ew) &&
      w <= Math.max(sw, ew) &&
      d >= Math.min(sd, ed) &&
      d <= Math.max(sd, ed) &&
      s >= Math.min(ss, es) &&
      s <= Math.max(ss, es)
    );
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    isCellHighlighted,
  };
}
