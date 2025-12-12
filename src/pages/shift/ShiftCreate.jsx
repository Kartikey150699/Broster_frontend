import { useEffect, useState, useRef } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import { useNavigate } from "react-router-dom";
import MiniTimePicker from "../../components/MiniTimePicker";
import AutoFillControls from "../../components/AutoFillControls";
import ShiftCell from "../../components/ShiftCell";

export default function ShiftCreate() {
  const navigate = useNavigate();
  const [selectedCell, setSelectedCell] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const tableRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedCell(null);   // ← disable autofill buttons
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  // ------------------------------------------
  // Dummy data (to replace by API later)
  // ------------------------------------------
  const TEMPLATE_SHIFT_MAP = {
    T01: "早番テンプレート",
    T02: "遅番テンプレート",
    T03: "標準勤務",
  };

  const BREAKTIME_MAP = {
    B0: "休憩無",
    B5: "5分",
    B10: "10分",
    B15: "15分",
    B30: "30分",
    B45: "45分",
    B60: "60分",
    B90: "90分",
    B120: "120分",
  };

  // ------------------------------------------
  // State Management
  // ------------------------------------------
  const [shiftName, setShiftName] = useState("");
  const [templateShiftId, setTemplateShiftId] = useState("");
  const [useHoliday, setUseHoliday] = useState(false);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // WEEK TABLE = 6 weeks × 7 days
  const initialRecord = Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => ({
      startTime1: "",
      endTime1: "",
      breakTime1: "",
      startTime2: "",
      endTime2: "",
      breakTime2: "",
      startTime3: "",
      endTime3: "",
      breakTime3: "",
      startTime4: "",
      endTime4: "",
      breakTime4: "",
      startTime5: "",
      endTime5: "",
      breakTime5: "",
      noWorkingDay: false,
    }))
  );

  const [recordTable, setRecordTable] = useState(initialRecord);

  // ------------------------------------------
  // Helper functions
  // ------------------------------------------
  const updateCell = (w, d, field, value) => {
    const newTable = [...recordTable];
    newTable[w][d][field] = value;
    setRecordTable(newTable);
  };

  // Bulk weekday clicking (月〜日)
  const handleBulkDayOff = (dayIndex, checked) => {
    const updated = recordTable.map((weekRow) => {
      const copy = [...weekRow];
      copy[dayIndex].noWorkingDay = checked;
      return copy;
    });
    setRecordTable(updated);
  };

  // ------------------------------------------
  // Submit (dummy)
  // ------------------------------------------
  const handleSubmit = () => {
    setInfoMessages(["（テスト）シフトを登録しました。"]);
    console.log("REGISTER SHIFT PAYLOAD:", {
      shiftName,
      templateShiftId,
      useHoliday,
      recordTable,
    });
  };

  // ------------------------------------------
  // Drag Feature
  // ------------------------------------------
 const handleDragStart = (w, d, shiftIndex) => {
  setDragStart({ w, d, shiftIndex });
  setDragEnd({ w, d, shiftIndex });
  setIsDragging(true);
};

const handleDragEnter = (w, d, shiftIndex) => {
  if (!isDragging) return;
  setDragEnd({ w, d, shiftIndex });
};

const handleDragEnd = () => {
  if (!dragStart || !dragEnd) {
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
    return;
  }

  const { w: sw, d: sd, shiftIndex: ss } = dragStart;
  const { w: ew, d: ed, shiftIndex: es } = dragEnd;

  const minW = Math.min(sw, ew);
  const maxW = Math.max(sw, ew);
  const minD = Math.min(sd, ed);
  const maxD = Math.max(sd, ed);
  const minS = Math.min(ss, es);
  const maxS = Math.max(ss, es);

  // values to copy
  const src = recordTable[sw][sd];
  
  const updated = [...recordTable];

  for (let w = minW; w <= maxW; w++) {
    for (let d = minD; d <= maxD; d++) {
      for (let s = minS; s <= maxS; s++) {

        const startKey = `startTime${s + 1}`;
        const endKey   = `endTime${s + 1}`;
        const breakKey = `breakTime${s + 1}`;

        updated[w][d][startKey] = src[`startTime${ss + 1}`];
        updated[w][d][endKey]   = src[`endTime${ss + 1}`];
        updated[w][d][breakKey] = src[`breakTime${ss + 1}`];
      }
    }
  }

  setRecordTable(updated);
  setIsDragging(false);
  setDragStart(null);
  setDragEnd(null);
};

// ------------------------------------------
// cell Highlighting
// ------------------------------------------
const isCellHighlighted = (w, d, shiftIndex) => {
  if (!isDragging || !dragStart || !dragEnd) return false;

  const { w: sw, d: sd, shiftIndex: ss } = dragStart;
  const { w: ew, d: ed, shiftIndex: es } = dragEnd;

  const minW = Math.min(sw, ew);
  const maxW = Math.max(sw, ew);
  const minD = Math.min(sd, ed);
  const maxD = Math.max(sd, ed);
  const minS = Math.min(ss, es);
  const maxS = Math.max(ss, es);

  return (
    w >= minW &&
    w <= maxW &&
    d >= minD &&
    d <= maxD &&
    shiftIndex >= minS &&
    shiftIndex <= maxS
  );
};

  // ------------------------------------------
  // UI RENDER
  // ------------------------------------------
  return (
    <OwnerLayout title="シフト登録">
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw"></i> シフト登録
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SHIFT NAME */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2 text-right">
          <label className="input-label">シフト名</label>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            value={shiftName}
            onChange={(e) => setShiftName(e.target.value)}
          />
        </div>
      </div>

      {/* TEMPLATE SELECT */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2 text-right">
          <label className="input-label">テンプレート</label>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={templateShiftId}
            onChange={(e) => setTemplateShiftId(e.target.value)}
          >
            <option value="">なし</option>
            {Object.entries(TEMPLATE_SHIFT_MAP).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* HOLIDAY CHECK */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2 text-right">
          <label className="input-label">休日設定</label>
        </div>
        <div className="col-md-8">
          <label>
            <input
              type="checkbox"
              checked={useHoliday}
              onChange={(e) => setUseHoliday(e.target.checked)}
            />
            &nbsp;祝日
          </label>
        </div>
      </div>

      {/* BULK DAY-OFF */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2 text-right">
          <label className="input-label">一括チェック</label>
        </div>
        <div className="col-md-8">
          {["月", "火", "水", "木", "金", "土", "日"].map((label, i) => (
            <label key={i} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                onChange={(e) => handleBulkDayOff(i, e.target.checked)}
              />
              &nbsp;{label}
            </label>
          ))}
        </div>
      </div>


      {/* MAIN TABLE */}
    <div ref={tableRef}>
    <AutoFillControls
        selectedCell={selectedCell}
        recordTable={recordTable}
        setRecordTable={setRecordTable}
    />
      <div className="row row-padding-top-1" style={{ padding: "10px 20px" }}>
        <div className="col-md-12" style={{ overflowX: "scroll", height: "500px", padding: 0 }}>
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr className="primary" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <th className="text-center" style={{ width: "5%" }}>週</th>
                  <th className="text-center" style={{ width: "5%" }}>曜日</th>
                  <th className="text-center" style={{ width: "17%" }}>早出</th>
                  <th className="text-center" style={{ width: "17%" }}>勤務１</th>
                  <th className="text-center" style={{ width: "17%" }}>勤務２</th>
                  <th className="text-center" style={{ width: "17%" }}>勤務３</th>
                  <th className="text-center" style={{ width: "17%" }}>勤務４</th>
                  <th className="text-center" style={{ width: "5%" }}>休日</th>
                </tr>
              </thead>

              <tbody>
                {recordTable.map((weekRow, w) =>
                  weekRow.map((cell, d) => (
                    <tr key={`${w}-${d}`}>
                      {/* WEEK NUMBER (rowspan=7 mimic) */}
                      {d === 0 && (
                        <td className="text-center" rowSpan="7">
                          {w + 1}
                        </td>
                      )}

                      {/* DAY LABEL */}
                      <td className="text-center">
                        {["月", "火", "水", "木", "金", "土", "日"][d]}
                      </td>

                      {/* 5 SHIFTS COLUMNS */}
                      {Array.from({ length: 5 }).map((_, shiftIndex) => {
                        const startKey = `startTime${shiftIndex + 1}`;
                        const endKey = `endTime${shiftIndex + 1}`;
                        const breakKey = `breakTime${shiftIndex + 1}`;

                        return (
                          <td key={shiftIndex}>
                            <ShiftCell
                                w={w}
                                d={d}
                                shiftIndex={shiftIndex}
                                isHighlighted={isCellHighlighted(w, d, shiftIndex)}
                                onDragStart={handleDragStart}
                                onDragEnter={handleDragEnter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="form-inline" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                                <MiniTimePicker
                                    value={cell[startKey]}
                                    onChange={(val) => updateCell(w, d, startKey, val)}
                                    onSelect={() => setSelectedCell({ weekIndex: w, dayIndex: d, shiftIndex })}
                                    style={{ marginRight: "5px" }}
                                />
                                <span style={{ marginRight: "5px", marginLeft: "5px" }}>〜</span>
                                <MiniTimePicker
                                    value={cell[endKey]}
                                    onChange={(val) => updateCell(w, d, endKey, val)}
                                    onSelect={() => setSelectedCell({ weekIndex: w, dayIndex: d, shiftIndex })}
                                    style={{ marginRight: "5px" }}
                                />
                                <select
                                    className="form-control input-sm"
                                    style={{ height: "34px", marginLeft: "5px" }}
                                    value={cell[breakKey]}
                                    onChange={(e) => updateCell(w, d, breakKey, e.target.value)}
                                >
                                    {Object.entries(BREAKTIME_MAP).map(([k, v]) => (
                                    <option key={k} value={k}>{v}</option>
                                    ))}
                                </select>

                            </div>
                            </ShiftCell>
                          </td>
                        );
                      })}

                      {/* NO WORKING DAY */}
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={cell.noWorkingDay}
                          onChange={(e) =>
                            updateCell(w, d, "noWorkingDay", e.target.checked)
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div> 

      {/* BUTTONS */}
      <div className="row row-padding-top-2">
        <div className="col-md-12 text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            <i className="fa fa-plus fa-fw"></i> 登録
          </button>

          <button
            className="btn btn-primary"
            style={{ marginLeft: 10 }}
            onClick={() => navigate("/shift/list")}
          >
            <i className="fa fa-ban fa-fw"></i> 戻る
          </button>
        </div>
      </div>
    </OwnerLayout>
  );
}