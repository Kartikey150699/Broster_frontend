import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import CommonButton from "../../components/CommonButton";
import MiniTimePicker from "../../components/MiniTimePicker";

export default function WorkResultEdit() {
  const { month, companyId, groupId, employeeId } = useParams();
  const navigate = useNavigate();

  // -------------------------------------------------------
  // NOTIFICATIONS
  // -------------------------------------------------------
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // -------------------------------------------------------
  // MOCK HEADER DATA (Replace with API later)
  // -------------------------------------------------------
  const [header, setHeader] = useState({
    groupName: "営業部",
    employeeId: employeeId,
    employeeName: "田中 太郎",
    targetMonthLabel: `${month.slice(0, 4)}年${month.slice(4)}月`,
  });

  // -------------------------------------------------------
  // MOCK DAILY ROWS (Replace with API response)
  // -------------------------------------------------------
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Create 31 mock days
    const mock = Array.from({ length: 31 }, (_, i) => {
      const d = i + 1;
      return {
        day: d,
        week: ["月", "火", "水", "木", "金", "土", "日"][d % 7],
        workStatusLabel: "",
        applyRequestLabelList: [],
        stampStartTime: "09:00",
        stampEndTime: "18:00",
        totalWorkTime: "08:00",

        manualStartTime: "",
        manualEndTime: "",
        manualBreakTime: "",

        clearResultFlag: false,
        changeColor: d % 7 === 0 ? "1" : "0",
      };
    });
    setRows(mock);
  }, [month]);

  // -------------------------------------------------------
  // Update Cell
  // -------------------------------------------------------
  const updateRow = (index, field, value) => {
    const copy = [...rows];
    copy[index][field] = value;
    setRows(copy);
  };

  // -------------------------------------------------------
  // UPDATE ACTION
  // -------------------------------------------------------
  const handleUpdate = () => {
    setInfoMessages(["勤務実績を更新しました。（モック動作）"]);
    console.log("UPDATE PAYLOAD:", rows);
  };

  return (
    <OwnerLayout title="勤務実績編集">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw" /> 勤務実績編集
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* HEADER INFO */}
      <div className="row row-padding-top-1">
        <div className="col-md-8">
          <label className="input-label">グループ名：{header.groupName}</label>{" "}
          　<label className="input-label">従業員ID：{header.employeeId}</label>
          　
          <label className="input-label">従業員名：{header.employeeName}</label>
        </div>

        <div className="col-md-8">
          <label className="input-label">
            対象年月：{header.targetMonthLabel}
          </label>
        </div>

        <div className="col-md-4 text-right">
          <CommonButton label="更新" icon="pencil" onClick={handleUpdate} />
          <CommonButton
            label="戻る"
            icon="ban"
            style={{ marginLeft: 10 }}
            onClick={() =>
              navigate(
                `/result/view/${month}/${companyId}/${groupId}/${employeeId}`,
              )
            }
          />
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px" }}>
        <div
          className="col-md-12"
          style={{ overflowX: "scroll", height: 500, padding: 0 }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                whiteSpace: "nowrap",
              }}
            >
              <thead>
                <tr
                  className="primary"
                  style={{ position: "sticky", top: 0, zIndex: 2 }}
                >
                  <th className="text-center" style={{ width: 60 }}>
                    日
                  </th>
                  <th className="text-center" style={{ width: 80 }}>
                    状況
                  </th>

                  <th className="text-center" style={{ width: 220 }}>
                    申請
                  </th>

                  <th className="text-center" style={{ width: 90 }}>
                    打刻(出)
                  </th>
                  <th className="text-center" style={{ width: 90 }}>
                    打刻(退)
                  </th>
                  <th className="text-center" style={{ width: 90 }}>
                    労働時間
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    出勤(手修正)
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    退勤(手修正)
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    休憩(手修正)
                  </th>
                  <th className="text-center" style={{ width: 60 }}>
                    実績削除
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className="text-center warning"
                    style={{
                      backgroundColor: "#fae7b5 !important",
                      borderBottom:
                        r.week === "土" ? "3px solid #ddd" : "1px solid #ddd",
                    }}
                  >
                    {/* 日 - always red */}
                    <td style={{ color: "red" }}>
                      {r.day} ({r.week})
                    </td>

                    {/* 状況 */}
                    <td>{r.workStatusLabel}</td>

                    {/* 申請 */}
                    <td>{r.applyRequestLabelList.join(" ")}</td>

                    {/* 打刻 */}
                    <td>{r.stampStartTime}</td>
                    <td>{r.stampEndTime}</td>

                    {/* 労働時間 */}
                    <td>{r.totalWorkTime}</td>

                    {/* 出勤(手修正) */}
                    <td>
                      <MiniTimePicker
                        value={r.manualStartTime}
                        onChange={(v) => updateRow(i, "manualStartTime", v)}
                      />
                    </td>

                    {/* 退勤(手修正) */}
                    <td>
                      <MiniTimePicker
                        value={r.manualEndTime}
                        onChange={(v) => updateRow(i, "manualEndTime", v)}
                      />
                    </td>

                    {/* 休憩(手修正) */}
                    <td>
                      <MiniTimePicker
                        value={r.manualBreakTime}
                        onChange={(v) => updateRow(i, "manualBreakTime", v)}
                      />
                    </td>

                    {/* 削除 */}
                    <td>
                      <input
                        type="checkbox"
                        checked={r.clearResultFlag}
                        onChange={(e) =>
                          updateRow(i, "clearResultFlag", e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
