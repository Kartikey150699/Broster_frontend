import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import MiniTimePicker from "../../components/MiniTimePicker";
import AutoFillControls from "../../components/AutoFillControls";
import ShiftCell from "../../components/ShiftCell";
import axios from "axios";
import useGridDragSelection from "../../components/grid/useGridDragSelection";

export default function ShiftEdit() {
  const { shiftId } = useParams();
  const navigate = useNavigate();
  const tableRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedCell(null);   // disable autofill buttons
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  // -----------------------------
  // State
  // -----------------------------
  const [loading, setLoading] = useState(true);
  const [shiftName, setShiftName] = useState("");
  const [templateShiftId, setTemplateShiftId] = useState("");
  const [useHoliday, setUseHoliday] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyDate, setApplyDate] = useState("");
  const [recordTable, setRecordTable] = useState([]);
  const {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    isCellHighlighted
  } = useGridDragSelection(recordTable, setRecordTable);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [selectedCell, setSelectedCell] = useState(null);

  // -----------------------------
  // Constants
  // -----------------------------
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

  const EMPTY_TABLE = Array.from({ length: 6 }, () =>
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

  // -----------------------------
  // Load Shift Data (EDIT MODE)
  // -----------------------------
  useEffect(() => {
    async function loadShift() {
      try {
        setLoading(true);

        // TODO: Replace with the actual API
        const res = await axios.get(`/api/shift/${shiftId}`);

        const data = res.data;

        setShiftName(data.shiftName);
        setTemplateShiftId(data.templateShiftId || "");
        setUseHoliday(data.useHoliday || false);
        setRecordTable(data.recordTable || EMPTY_TABLE);
        setSaveAsTemplate(data.saveAsTemplate || false);
        setApplyDate(data.applyDate || "");

      } catch (e) {
        console.error(e);
        setErrorMessages(["シフト情報の取得に失敗しました。"]);
        setRecordTable(EMPTY_TABLE);
      } finally {
        setLoading(false);
      }
    }
    loadShift();
  }, [shiftId]);

  // ------------------------------------------
  // Auto-hide notifications
  // ------------------------------------------
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  // ------------------------------------------
  // Update Cell
  // ------------------------------------------
  const updateCell = (w, d, field, value) => {
    const newTable = [...recordTable];
    newTable[w][d][field] = value;
    setRecordTable(newTable);
  };

  // ------------------------------------------
  // Bulk Day-off
  // ------------------------------------------
  const handleBulkDayOff = (dayIndex, checked) => {
    const updated = recordTable.map((week) => {
      const copy = [...week];
      copy[dayIndex].noWorkingDay = checked;
      return copy;
    });
    setRecordTable(updated);
  };

  // ------------------------------------------
  // Submit (UPDATE)
  // ------------------------------------------
  const handleSubmit = async () => {
    try {
      // TODO: Replace with real API
      await axios.put(`/api/shift/update/${shiftId}`, {
        shiftName,
        templateShiftId,
        saveAsTemplate,
        applyDate,
        useHoliday,
        recordTable,
      });

      setInfoMessages(["シフト情報を更新しました。"]);

    } catch (e) {
      console.error(e);
      setErrorMessages(["更新処理に失敗しました。"]);
    }
  };

  // ------------------------------------------
  // UI RENDER
  // ------------------------------------------
  return (
    <OwnerLayout title="シフト更新">
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw"></i> シフト更新
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

      {/* TEMPLATE */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2 text-right">
          <label className="input-label">テンプレート</label>
        </div>
        <div className="col-md-3 ">
          <select
            className="form-control"
            value={templateShiftId}
            onChange={(e) => setTemplateShiftId(e.target.value)}
          >
            <option value="">なし</option>
            {Object.entries(TEMPLATE_SHIFT_MAP).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      
    {/* SAVE AS TEMPLATE */}
    <div className="row row-padding-top-1">
    <div className="col-md-offset-2 col-md-2 text-right">
        <label className="input-label">テンプレートとして保存</label>
    </div>
        <div className="col-md-8">
            <label>
            <input
                type="checkbox"
                checked={saveAsTemplate}
                onChange={(e) => setSaveAsTemplate(e.target.checked)}
            />
            &nbsp;テンプレートとして保存
            </label>
        </div>
    </div>

    {/* APPLY DATE */}
    <div className="row row-padding-top-1">
    <div className="col-md-offset-2 col-md-2 text-right">
        <label className="input-label">適用日</label>
    </div>
     <div className="col-md-3">
        <input
        type="date"
        className="form-control"
        value={applyDate}
        onChange={(e) => setApplyDate(e.target.value)}
        />
    </div>
    </div>

      {/* HOLIDAY */}
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
          {["月","火","水","木","金","土","日"].map((label, i) => (
            <label key={i} style={{ marginRight: 10 }}>
              <input type="checkbox" onChange={(e) => handleBulkDayOff(i, e.target.checked)} />
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
              <table className="table table-bordered table-condensed"
                style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    borderCollapse: "collapse"
                }}
                >
                <thead>
                    <tr className="primary" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        <th className="text-center" style={{ width: "5%", whiteSpace: "nowrap" }}>週</th>
                        <th className="text-center" style={{ width: "5%", whiteSpace: "nowrap" }}>曜日</th>
                        <th className="text-center" style={{ width: "17%", whiteSpace: "nowrap" }}>早出</th>
                        <th className="text-center" style={{ width: "17%", whiteSpace: "nowrap" }}>勤務１</th>
                        <th className="text-center" style={{ width: "17%", whiteSpace: "nowrap" }}>勤務２</th>
                        <th className="text-center" style={{ width: "17%", whiteSpace: "nowrap" }}>勤務３</th>
                        <th className="text-center" style={{ width: "17%", whiteSpace: "nowrap" }}>勤務４</th>
                        <th className="text-center" style={{ width: "5%", whiteSpace: "nowrap" }}>休日</th>
                    </tr>
                </thead>

                <tbody>
                  {recordTable.map((weekRow, w) =>
                    weekRow.map((cell, d) => (
                      <tr key={`${w}-${d}`}>
                        {d === 0 && <td className="text-center" rowSpan="7">{w + 1}</td>}

                        <td className="text-center">{["月","火","水","木","金","土","日"][d]}</td>

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
                                <div className="form-inline" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                                  <MiniTimePicker
                                    value={cell[startKey]}
                                    onChange={(val) => updateCell(w, d, startKey, val)}
                                    onSelect={() => setSelectedCell({ weekIndex: w, dayIndex: d, shiftIndex: s })}
                                  />
                                  &nbsp;〜&nbsp;
                                  <MiniTimePicker
                                    value={cell[endKey]}
                                    onChange={(val) => updateCell(w, d, endKey, val)}
                                    onSelect={() => setSelectedCell({ weekIndex: w, dayIndex: d, shiftIndex: s })}
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

                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={cell.noWorkingDay}
                            onChange={(e) => updateCell(w, d, "noWorkingDay", e.target.checked)}
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
            <i className="fa fa-pencil fa-fw"></i> 更新
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