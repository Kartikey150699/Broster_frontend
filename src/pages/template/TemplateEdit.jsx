import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import MiniTimePicker from "../../components/MiniTimePicker";
import AutoFillControls from "../../components/AutoFillControls";
import ShiftCell from "../../components/ShiftCell";
import useGridDragSelection from "../../components/grid/useGridDragSelection";
import CommonButton from "../../components/CommonButton";

export default function TemplateEdit() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const tableRef = useRef(null);

  const [selectedCell, setSelectedCell] = useState(null);

  const [templateName, setTemplateName] = useState("");
  const [useHoliday, setUseHoliday] = useState(false);

  const [recordTable, setRecordTable] = useState([]);
  const [loading, setLoading] = useState(true);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ------------------------------------------
  // Mock Data Loader (Replace with API later)
  // ------------------------------------------
  useEffect(() => {
    async function loadTemplate() {
      try {
        setLoading(true);

        // Mock template data (you can extend later)
        const mockTemplate = {
          templateId,
          templateName: "早番テンプレート（編集）",
          useHoliday: true,
          recordTable: Array.from({ length: 6 }, () =>
            Array.from({ length: 7 }, () => ({
              startTime1: "09:00",
              endTime1: "18:00",
              breakTime1: "B60",
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
          ),
        };

        setTemplateName(mockTemplate.templateName);
        setUseHoliday(mockTemplate.useHoliday);
        setRecordTable(mockTemplate.recordTable);
      } catch (e) {
        setErrorMessages(["テンプレートの読み込みに失敗しました。"]);
      } finally {
        setLoading(false);
      }
    }

    loadTemplate();
  }, [templateId]);

  // Hide AutoFill panel when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        setSelectedCell(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  // Bulk weekdays OFF
  const handleBulkDayOff = (dayIndex, checked) => {
    const updated = recordTable.map((weekRow) => {
      const copy = [...weekRow];
      copy[dayIndex].noWorkingDay = checked;
      return copy;
    });
    setRecordTable(updated);
  };

  // ---------------------------
  // Submit (TEMPORARY MOCK)
  // ---------------------------
  const handleUpdate = () => {
    setInfoMessages(["テンプレートを更新しました。（モック動作）"]);
    console.log("UPDATE PAYLOAD:", {
      templateId,
      templateName,
      useHoliday,
      recordTable,
    });
  };

  if (loading) {
    return <OwnerLayout title="テンプレート更新">読み込み中...</OwnerLayout>;
  }

  return (
    <OwnerLayout title="テンプレート更新">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw" /> テンプレート更新
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

      {/* BULK CHECK */}
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

      {/* MAIN GRID */}
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
                style={{ width: "100%" }}
              >
                <thead>
                  <tr
                    className="primary"
                    style={{ position: "sticky", top: 0, zIndex: 1 }}
                  >
                    <th className="text-center">週</th>
                    <th className="text-center">曜日</th>
                    <th className="text-center">早出</th>
                    <th className="text-center">勤務1</th>
                    <th className="text-center">勤務2</th>
                    <th className="text-center">勤務3</th>
                    <th className="text-center">勤務4</th>
                    <th className="text-center">休日</th>
                  </tr>
                </thead>

                <tbody>
                  {recordTable.map((weekRow, w) =>
                    weekRow.map((cell, d) => (
                      <tr key={`${w}-${d}`}>
                        {d === 0 && (
                          <td className="text-center" rowSpan="7">
                            {w + 1}
                          </td>
                        )}

                        <td className="text-center">
                          {["月", "火", "水", "木", "金", "土", "日"][d]}
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
                                    whiteSpace: "nowrap",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <MiniTimePicker
                                    value={cell[startKey]}
                                    onChange={(val) =>
                                      updateCell(w, d, startKey, val)
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
                                    onChange={(val) =>
                                      updateCell(w, d, endKey, val)
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
                                      marginLeft: "5px",
                                    }}
                                    value={cell[breakKey]}
                                    onChange={(e) =>
                                      updateCell(w, d, breakKey, e.target.value)
                                    }
                                  >
                                    {Object.entries(BREAKTIME_MAP).map(
                                      ([key, label]) => (
                                        <option key={key} value={key}>
                                          {label}
                                        </option>
                                      )
                                    )}
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
          <CommonButton label="更新" icon="pencil" onClick={handleUpdate} />

          <CommonButton
            label="戻る"
            icon="ban"
            onClick={() => navigate("/template/list")}
            style={{ marginLeft: 10 }}
          />
        </div>
      </div>
    </OwnerLayout>
  );
}
