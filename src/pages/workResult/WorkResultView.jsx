import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import CommonButton from "../../components/CommonButton";

export default function WorkResultView() {
  const { month, companyId, groupId, employeeId } = useParams();
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // STATE
  // ------------------------------------------------------------
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [headerInfo, setHeaderInfo] = useState({
    groupName: "営業部",
    employeeName: "田中 太郎",
    employeeId: employeeId,
    targetMonth: month, // YYYYMM
    lockFlag: "0",
  });

  const [dailyRows, setDailyRows] = useState([]);
  const [weekSummary, setWeekSummary] = useState({});
  const [monthSummary, setMonthSummary] = useState({});

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  // ------------------------------------------------------------
  // MOCK DATA LOADING
  // ------------------------------------------------------------
  useEffect(() => {
    const ym = month;
    const year = ym.slice(0, 4);
    const mm = ym.slice(4, 6);
    setHeaderInfo((prev) => ({ ...prev, targetMonth: month }));

    // fake 30 days data
    const dayCount = getDaysInMonth(year, mm);
    const mockDaily = Array.from({ length: dayCount }, (_, i) => ({
      day: i + 1,
      week: ["日", "月", "火", "水", "木", "金", "土"][
        new Date(year, mm - 1, i + 1).getDay()
      ],
      workStatus: "出勤",
      applyList: i % 5 === 0 ? ["早退"] : [],
      planStart: "09:00",
      planEnd: "18:00",
      stampStart: "09:05",
      stampEnd: "18:02",
      modifyStart: "09:05",
      modifyEnd: "18:02",
      breakTime: "01:00",
      actualWork: "08:00",
      late: i % 3 === 0 ? "00:05" : "00:00",
      early: "00:00",
      comp: "00:00",
      manualEdit: i % 7 === 0,
      highlight: i % 6 === 0 ? "warning" : "",
    }));

    const mockWeekSummary = {
      w1: "40:00",
      w2: "38:00",
      w3: "42:00",
      w4: "40:00",
      w5: "20:00",
      w6: "",
    };

    const mockMonthSummary = {
      workDays: 20,
      absentDays: 1,
      totalWork: "160:00",
      legal: "150:00",
      over: "10:00",
      lateTimes: "3回 (00:15)",
      earlyTimes: "1回 (00:10)",
      paid: "1日 (08:00)",
      special: "0日 (00:00)",
    };

    setDailyRows(mockDaily);
    setWeekSummary(mockWeekSummary);
    setMonthSummary(mockMonthSummary);
  }, [month]);

  // ------------------------------------------------------------
  // AUTO HIDE NOTIFICATION (4 seconds)
  // ------------------------------------------------------------
  useEffect(() => {
    if (!infoMessages.length && !errorMessages.length) return;

    const timer = setTimeout(() => {
      setInfoMessages([]);
      setErrorMessages([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [infoMessages, errorMessages]);

  // ------------------------------------------------------------
  // CHANGE MONTH (← → buttons)
  // ------------------------------------------------------------
  const goPrevMonth = () => {
    let y = parseInt(month.slice(0, 4));
    let m = parseInt(month.slice(4, 6));

    m -= 1;
    if (m === 0) {
      m = 12;
      y -= 1;
    }
    navigate(
      `/result/view/${y}${String(m).padStart(2, "0")}/${companyId}/${groupId}/${employeeId}`,
    );
  };

  const goNextMonth = () => {
    let y = parseInt(month.slice(0, 4));
    let m = parseInt(month.slice(4, 6));

    m += 1;
    if (m === 13) {
      m = 1;
      y += 1;
    }
    navigate(
      `/result/view/${y}${String(m).padStart(2, "0")}/${companyId}/${groupId}/${employeeId}`,
    );
  };

  // Check if the month is editable (this month or previous month)
  const isEditableMonth = () => {
    const y = parseInt(month.slice(0, 4));
    const m = parseInt(month.slice(4, 6));
    const target = new Date(y, m - 1);

    const now = new Date();
    const previous = new Date(now.getFullYear(), now.getMonth() - 1); // previous month

    // editable when target >= previous month
    return target.getTime() >= previous.getTime();
  };

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  return (
    <OwnerLayout title="勤務実績照会">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o"></i> 勤務実績照会
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* HEADER INFO */}
      <div className="row">
        <div className="col-md-8 broster-mobile-buttons broster-mobile-left">
          <label className="broster-label">
            グループ名：{headerInfo.groupName}
          </label>
          　
          <label className="broster-label">
            従業員ID：{headerInfo.employeeId}
          </label>
          　
          <label className="broster-label">
            従業員名：{headerInfo.employeeName}
          </label>
        </div>

        <div className="col-md-8" style={{ marginTop: 5 }}>
          <label className="broster-label">
            対象年月：
            {headerInfo.targetMonth.slice(0, 4)}年{" "}
            {headerInfo.targetMonth.slice(4)}月
          </label>
        </div>
      </div>

      {/* MONTH NAVIGATION */}
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-md-8 broster-nav-left">
          {/* Arrow Row */}
          <div className="broster-arrow-row">
            <CommonButton icon="caret-left" onClick={goPrevMonth} />
            <CommonButton icon="caret-right" onClick={goNextMonth} />
          </div>

          {/* Calendar Button */}
          <div className="broster-calendar-btn">
            <CommonButton
              icon="calendar"
              label="勤務予定を見る"
              onClick={() =>
                navigate(
                  `/workPlan/view/${month}/${companyId}/${groupId}/${employeeId}`,
                )
              }
            />
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="col-md-4 text-right broster-mobile-buttons">
          {/* 編集 / 編集不可 */}
          {/* -------------------- 編集ボタンロジック -------------------- */}

          {/* EDIT ALLOWED - only when lockFlag=0 AND target month = this or prev month */}
          {headerInfo.lockFlag === "0" && isEditableMonth() && (
            <CommonButton
              icon="edit"
              label="編集"
              onClick={() =>
                navigate(
                  `/result/edit/${month}/${companyId}/${groupId}/${employeeId}`,
                )
              }
              style={{ marginRight: 10 }}
            />
          )}

          {/* EDIT NOT ALLOWED - lockFlag=0 but month is too old or future */}
          {headerInfo.lockFlag === "0" && !isEditableMonth() && (
            <CommonButton
              icon="edit"
              label="編集不可"
              disabled
              style={{
                marginRight: 10,
                backgroundColor: "#d9534f",
                borderColor: "#d43f3a",
                opacity: 0.8,
              }}
            />
          )}

          {/* EDIT NOT ALLOWED - lockFlag=1 (締め済) */}
          {headerInfo.lockFlag === "1" && (
            <CommonButton
              icon="edit"
              label="編集不可"
              disabled
              style={{
                marginRight: 10,
                backgroundColor: "#d9534f",
                borderColor: "#d43f3a",
                opacity: 0.8,
              }}
            />
          )}

          {/* EDIT NOT ALLOWED - lockFlag=9 (異常) */}
          {headerInfo.lockFlag === "9" && (
            <CommonButton
              icon="edit"
              label="編集不可"
              disabled
              style={{
                marginRight: 10,
                backgroundColor: "#d9534f",
                borderColor: "#d43f3a",
                opacity: 0.8,
              }}
            />
          )}

          {/* 月末締め (lockFlag=0 only) */}
          {headerInfo.lockFlag === "0" && (
            <CommonButton
              icon="lock"
              label="月末締め"
              onClick={() => {
                setInfoMessages([
                  "勤務実績の締め状態を更新しました。（モック）",
                ]);
                setHeaderInfo((prev) => ({ ...prev, lockFlag: "1" }));
              }}
              style={{ marginRight: 10 }}
            />
          )}

          {/* 月末締め解除 (lockFlag=1 only) */}
          {headerInfo.lockFlag === "1" && (
            <CommonButton
              icon="unlock"
              label="月末締め解除"
              onClick={() => {
                setInfoMessages([
                  "勤務実績の締め状態を更新しました。（モック）",
                ]);
                setHeaderInfo((prev) => ({ ...prev, lockFlag: "0" }));
              }}
              style={{
                marginRight: 10,
                backgroundColor: "#d9534f",
                borderColor: "#d43f3a",
              }}
            />
          )}

          {/* 戻る */}
          <CommonButton
            icon="ban"
            label="勤務実績一覧に戻る"
            onClick={() => navigate("/result/list")}
            color="secondary"
          />
        </div>
      </div>

      {/* DAILY TABLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <div
            className="panel panel-default"
            style={{ overflowX: "scroll", height: 400 }}
          >
            <table className="table table-bordered table-condensed table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 20 }}>
                <tr className="primary">
                  <th className="text-center">日</th>
                  <th className="text-center">状況</th>
                  <th className="text-center">申請</th>
                  <th className="text-center">予定(出)</th>
                  <th className="text-center">予定(退)</th>
                  <th className="text-center">打刻(出)</th>
                  <th className="text-center">打刻(退)</th>
                  <th className="text-center">出勤</th>
                  <th className="text-center">退勤</th>
                  <th className="text-center">休憩</th>
                  <th className="text-center">実労働時間</th>
                  <th className="text-center">遅刻</th>
                  <th className="text-center">早退</th>
                  <th className="text-center">補正時間</th>
                </tr>
              </thead>

              <tbody>
                {dailyRows.map((d, i) => (
                  <tr
                    key={i}
                    className="text-center warning"
                    style={{
                      backgroundColor: "#fae7b5",
                      borderBottom:
                        d.week === "土" ? "3px solid #ddd" : "1px solid #ddd",
                    }}
                  >
                    <td style={{ color: "red" }}>
                      {d.day} ({d.week})
                    </td>
                    <td>{d.workStatus}</td>
                    <td>{d.applyList.join(" ")}</td>
                    <td>{d.planStart}</td>
                    <td>{d.planEnd}</td>
                    <td>{d.stampStart}</td>
                    <td>{d.stampEnd}</td>
                    <td>{d.modifyStart}</td>
                    <td>{d.modifyEnd}</td>
                    <td>{d.breakTime}</td>
                    <td>{d.actualWork}</td>
                    <td>{d.late}</td>
                    <td>{d.early}</td>
                    <td>{d.comp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* WEEK SUMMARY */}
      <div className="row">
        <div className="col-md-offset-3 col-md-9">
          <table className="table table-bordered text-center week-summary-table">
            <thead>
              <tr className="primary">
                <th className="text-center"></th>
                <th className="text-center">1週</th>
                <th className="text-center">2週</th>
                <th className="text-center">3週</th>
                <th className="text-center">4週</th>
                <th className="text-center">5週</th>
                <th className="text-center">6週</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  className="primary text-center"
                  style={{ width: "160px", whiteSpace: "nowrap" }}
                >
                  労働時間
                </th>
                {["w1", "w2", "w3", "w4", "w5", "w6"].map((w) => (
                  <td key={w} className="text-center">
                    {weekSummary[w]}
                  </td>
                ))}
              </tr>

              <tr>
                <th className="primary text-center">残業時間</th>
                {["w1", "w2", "w3", "w4", "w5", "w6"].map((w) => (
                  <td key={w} className="text-center">
                    {weekSummary[w]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MONTH SUMMARY */}
      <div className="row">
        <div className="col-md-offset-3 col-md-9">
          <table className="table table-bordered text-center month-summary-table">
            <thead>
              <tr className="primary">
                <th className="text-center">出勤日数</th>
                <th className="text-center">欠勤日数</th>
                <th className="text-center">総労働時間</th>
                <th className="text-center">総残業時間</th>
                <th className="text-center">遅刻(時間)</th>
                <th className="text-center">早退(時間)</th>
                <th className="text-center">早退(時間)</th>
                <th className="text-center">有休(時間)</th>
                <th className="text-center">特休(時間)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ height: "60px" }}>
                <td>{monthSummary.workDays}</td>
                <td>{monthSummary.absentDays}</td>
                <td>{monthSummary.totalWork}</td>
                <td>{monthSummary.legal}</td>
                <td>{monthSummary.over}</td>

                <td>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {monthSummary.lateTimes?.replace(" ", "\n") || ""}
                  </div>
                </td>

                <td>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {monthSummary.earlyTimes?.replace(" ", "\n") || ""}
                  </div>
                </td>

                <td>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {(() => {
                      if (!monthSummary.paid) return "";

                      // Example: "1日 (08:00)"
                      const match = monthSummary.paid.match(
                        /(\d+)\s*日\s*\((.*?)\)/,
                      );

                      if (!match) return monthSummary.paid.replace(" ", "\n");

                      const rawDays = Number(match[1]); // 1
                      const formattedDays = rawDays.toFixed(1); // "1.0"
                      const hours = match[2]; // "08:00"

                      return `${formattedDays}日\n(${hours})`;
                    })()}
                  </div>
                </td>

                <td>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {monthSummary.special?.replace(" ", "\n") || ""}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </OwnerLayout>
  );
}
