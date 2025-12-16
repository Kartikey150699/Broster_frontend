import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import AutoFillControls from "../../components/AutoFillControls";
import MiniTimePicker from "../../components/MiniTimePicker";
import ShiftCell from "../../components/ShiftCell";
import useGridDragSelection from "../../components/grid/useGridDragSelection";

export default function TemplateCreate() {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  // ---------------------------
  // FORM STATES
  // ---------------------------
  const [templateName, setTemplateName] = useState("");
  const [useHoliday, setUseHoliday] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ---------------------------
  // INITIAL TABLE (6×7 days)
  // ---------------------------
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

  // ---------------------------
  // BREAKTIME MAP
  // ---------------------------
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

  // ---------------------------
  // DRAG SELECT HOOK
  // ---------------------------
  const { handleDragStart, handleDragEnter, handleDragEnd, isCellHighlighted } =
    useGridDragSelection(recordTable, setRecordTable);

  // ---------------------------
  // Update single cell
  // ---------------------------
  const updateCell = (w, d, field, value) => {
    const newTable = [...recordTable];
    newTable[w][d][field] = value;
    setRecordTable(newTable);
  };

  // ---------------------------
  // Bulk day-off (月〜日)
  // ---------------------------
  const handleBulkDayOff = (dayIndex, checked) => {
    const updated = recordTable.map((week) => {
      const copy = [...week];
      copy[dayIndex].noWorkingDay = checked;
      return copy;
    });
    setRecordTable(updated);
  };

  // ---------------------------
  // Outside click - hide autofill panel
  // ---------------------------
  useEffect(() => {
    const handleClick = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        setSelectedCell(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ---------------------------
  // Submit (TEMPORARY MOCK)
  // ---------------------------
  const handleSubmit = () => {
    setInfoMessages(["（テスト）テンプレートを登録しました。"]);

    console.log("REGISTER TEMPLATE PAYLOAD:", {
      templateName,
      useHoliday,
      recordTable,
    });
  };

  return (
    <OwnerLayout title="テンプレート登録">
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw"></i> テンプレート登録
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* TEMPLATE NAME */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2 text-right">
          <label className="input-label">テンプレート名</label>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
      </div>

      {/* HOLIDAY OPTION */}
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
          <div
            className="col-md-12"
            style={{ overflowX: "scroll", height: "500px", padding: 0 }}
          >
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
                  {recordTable.map((week, w) =>
                    week.map((cell, d) => (
                      <tr key={`${w}-${d}`}>
                        {d === 0 && (
                          <td rowSpan="7" className="text-center">
                            {w + 1}
                          </td>
                        )}

                        <td className="text-center">
                          {["月", "火", "水", "木", "金", "土", "日"][d]}
                        </td>

                        {/* SHIFT 1 → 5 */}
                        {Array.from({ length: 5 }).map((_, s) => {
                          const startKey = `startTime${s + 1}`;
                          const endKey = `endTime${s + 1}`;
                          const breakKey = `breakTime${s + 1}`;

                          return (
                            <td key={s}>
                              <ShiftCell
                                w={w}
                                d={d}
                                shiftIndex={s}
                                isHighlighted={isCellHighlighted(w, d, s)}
                                onDragStart={handleDragStart}
                                onDragEnter={handleDragEnter}
                                onDragEnd={handleDragEnd}
                              >
                                <div
                                  className="form-inline"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <MiniTimePicker
                                    value={cell[startKey]}
                                    onChange={(val) => updateCell(w, d, startKey, val)}
                                    onSelect={() =>
                                      setSelectedCell({ weekIndex: w, dayIndex: d, shiftIndex: s })
                                    }
                                  />
                                  <span style={{ margin: "0 5px" }}>〜</span>
                                  <MiniTimePicker
                                    value={cell[endKey]}
                                    onChange={(val) => updateCell(w, d, endKey, val)}
                                    onSelect={() =>
                                      setSelectedCell({ weekIndex: w, dayIndex: d, shiftIndex: s })
                                    }
                                  />
                                  <select
                                    className="form-control input-sm"
                                    style={{ height: "34px", marginLeft: "5px" }}
                                    value={cell[breakKey]}
                                    onChange={(e) => updateCell(w, d, breakKey, e.target.value)}
                                  >
                                    {Object.entries(BREAKTIME_MAP).map(([k, v]) => (
                                      <option key={k} value={k}>
                                        {v}
                                      </option>
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
            onClick={() => navigate("/template/list")}
          >
            <i className="fa fa-ban fa-fw"></i> 戻る
          </button>
        </div>
      </div>
    </OwnerLayout>
  );
}