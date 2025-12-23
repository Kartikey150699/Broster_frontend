import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import MiniTimePicker from "../../components/MiniTimePicker";
import AutoFillControls from "../../components/AutoFillControls";
import ShiftCell from "../../components/ShiftCell";
import axios from "axios";
import useGridDragSelection from "../../components/grid/useGridDragSelection";

export default function WorkPlanEdit() {
  const { month } = useParams();
  const navigate = useNavigate();
  const tableRef = useRef(null);

  const [selectedCell, setSelectedCell] = useState(null);
  const [recordTable, setRecordTable] = useState([]);
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("システム部");
  const [employeeId, setEmployeeId] = useState("000003");
  const [employeeName, setEmployeeName] = useState("カルティケ");
  const [targetMonthLabel, setTargetMonthLabel] = useState("2025年11月度");

  const { handleDragStart, handleDragEnter, handleDragEnd, isCellHighlighted } =
    useGridDragSelection(recordTable, setRecordTable);

  // --------------------------
  // MOCK DATA LIKE SHIFTEDIT
  // --------------------------
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

  function buildMock(month) {
    const year = parseInt(month.substring(0, 4));
    const m = parseInt(month.substring(4, 6));

    const start = new Date(year, m - 2, 16);
    const end = new Date(year, m - 1, 15);

    const flatRows = [];
    let d = new Date(start);

    while (d <= end) {
      const mm = d.getMonth() + 1;
      const dd = d.getDate();
      const week = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];

      flatRows.push({
        dayLabel: `${mm}/${dd}`,
        weekLabel: week,
        shiftName: "シフトA",
        startTime1: "",
        endTime1: "",
        breakTime1: "",
        startTime2: "",
        endTime2: "",
        breakTime2: "",
        changeColor: dd % 5 === 0 ? "1" : "0",
      });

      d.setDate(d.getDate() + 1);
    }

    const grid = [];
    let cursor = 0;

    for (let w = 0; w < 6; w++) {
      const row = [];
      for (let d = 0; d < 7; d++) {
        row.push(flatRows[cursor] || {});
        cursor++;
      }
      grid.push(row);
    }

    return grid;
  }

  // --------------------------
  // CLICK OUTSIDE TO CLEAR selectedCell
  // --------------------------
  useEffect(() => {
    const handler = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        setSelectedCell(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // --------------------------
  // GLOBAL mouseup LISTENER FOR DRAG-AND-DROP
  // --------------------------
  useEffect(() => {
    const onUp = () => handleDragEnd();
    document.addEventListener("mouseup", onUp);
    return () => document.removeEventListener("mouseup", onUp);
  }, [handleDragEnd]);

  // --------------------------
  // LOAD DATA
  // --------------------------
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // use mock(load api later)
        const mock = buildMock(month);
        setRecordTable(mock);
      } catch (err) {
        console.error(err);
        setRecordTable(buildMock(month));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [month]);

  // --------------------------
  // Auto-hide notifications
  // --------------------------
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // --------------------------
  // Update cell
  // --------------------------
  const updateCell = (w, d, key, value) => {
    const copy = [...recordTable];
    copy[w][d][key] = value;
    setRecordTable(copy);
  };

  // --------------------------
  // Submit
  // --------------------------
  const handleSubmit = async () => {
    try {
      await axios.put(`/api/workplan/update/${month}`, {
        recordTable,
      });
      setInfoMessages(["勤務予定を更新しました。"]);
    } catch (err) {
      console.error(err);
      setErrorMessages(["更新処理に失敗しました。"]);
    }
  };

  const filteredRows = recordTable
    .flat()
    .filter((row) => row.dayLabel && !row.dayLabel.includes("("));

  // --------------------------
  // UI RENDER
  // --------------------------
  return (
    <OwnerLayout title="勤務予定編集">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-calendar fa-fw"></i> 勤務予定編集
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* EMPLOYEE INFO BLOCK */}
      <div className="row row-padding-top-1" style={{ marginBottom: "10px" }}>
        {/* FIRST ROW: グループ名 / 従業員ID / 従業員名 */}
        <div
          className="col-md-12"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          <label className="input-label">グループ名：{groupName}</label>
          <label className="input-label">従業員ID：{employeeId}</label>
          <label className="input-label">従業員名：{employeeName}</label>
        </div>

        {/* SECOND ROW: 対象年月 */}
        <div className="col-md-12" style={{ marginTop: "8px" }}>
          <label className="input-label">対象年月：{targetMonthLabel}</label>
        </div>
      </div>

      <div ref={tableRef}>
        {/* AUTOFILL LEFT + RIGHT BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {/* Autofill */}
          <div className="autofill-left">
            <AutoFillControls
              position="left"
              selectedCell={selectedCell}
              recordTable={recordTable}
              setRecordTable={setRecordTable}
            />
          </div>

          {/* 更新 + 戻る */}
          <div className="action-right">
            <button className="btn btn-primary btn-md" onClick={handleSubmit}>
              <i className="fa fa-pencil fa-fw"></i> 更新
            </button>

            <button
              className="btn btn-primary btn-md"
              style={{ marginLeft: "5px" }}
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-ban fa-fw"></i> 戻る
            </button>
          </div>
        </div>

        <div className="row row-padding-top-1" style={{ padding: "10px 10px" }}>
          <div
            className="col-md-12"
            style={{ overflowX: "scroll", height: "500px", padding: 0 }}
          >
            <div className="panel panel-default">
              <table
                className="table table-bordered table-condensed"
                style={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    className="primary"
                    style={{ position: "sticky", top: 0, zIndex: 1 }}
                  >
                    <th className="text-center" style={{ width: "10%" }}>
                      日
                    </th>
                    <th className="text-center" style={{ width: "18%" }}>
                      早出
                    </th>
                    <th className="text-center" style={{ width: "18%" }}>
                      勤務１
                    </th>
                    <th className="text-center" style={{ width: "18%" }}>
                      勤務２
                    </th>
                    <th className="text-center" style={{ width: "18%" }}>
                      勤務３
                    </th>
                    <th className="text-center" style={{ width: "18%" }}>
                      勤務４
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recordTable.map((weekRow, w) =>
                    weekRow.map(
                      (cell, d) =>
                        cell.dayLabel && (
                          <tr key={`${w}-${d}`} className="warning">
                            {/* 日付 */}
                            <td
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              {cell.dayLabel}({cell.weekLabel})
                            </td>

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
                                        onChange={(v) =>
                                          updateCell(w, d, startKey, v)
                                        }
                                        onSelect={() =>
                                          setSelectedCell({
                                            weekIndex: w,
                                            dayIndex: d,
                                            shiftIndex: s,
                                          })
                                        }
                                      />
                                      &nbsp;〜&nbsp;
                                      <MiniTimePicker
                                        value={cell[endKey]}
                                        onChange={(v) =>
                                          updateCell(w, d, endKey, v)
                                        }
                                        onSelect={() =>
                                          setSelectedCell({
                                            weekIndex: w,
                                            dayIndex: d,
                                            shiftIndex: s,
                                          })
                                        }
                                      />
                                      <select
                                        className="form-control input-sm"
                                        style={{
                                          height: "34px",
                                          marginLeft: "6px",
                                        }}
                                        value={cell[breakKey]}
                                        onChange={(e) => {
                                          updateCell(
                                            w,
                                            d,
                                            breakKey,
                                            e.target.value
                                          );
                                          setSelectedCell({
                                            weekIndex: w,
                                            dayIndex: d,
                                            shiftIndex: s,
                                          });
                                        }}
                                      >
                                        {Object.entries(BREAKTIME_MAP).map(
                                          ([k, v]) => (
                                            <option key={k} value={k}>
                                              {v}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  </ShiftCell>
                                </td>
                              );
                            })}
                          </tr>
                        )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
