import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";

export default function WorkPlanView() {
  const navigate = useNavigate();
  const { month } = useParams();
  const targetMonth = month || "202503";

  // =========================================================
  // Generate 16th to next month 15th date range
  // =========================================================
  function generateDateRange(yyyyMM) {
    const year = parseInt(yyyyMM.substring(0, 4));
    const month = parseInt(yyyyMM.substring(4, 6));

    const start = new Date(year, month - 2, 16);
    const end = new Date(year, month - 1, 15);

    const list = [];
    let d = new Date(start);

    while (d <= end) {
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const week = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];

      list.push({
        day: `${mm}/${dd}`,
        week,
        shiftName: "abc",
        earlyStartTime: "",
        earlyEndTime: "",
        work1: "",
        work2: "",
        work3: "",
        work4: "",
        workAppsLabel: "",
        changeColor: dd % 5 === 0 ? "1" : "0",
        manualEditFlag: dd % 7 === 0 ? "1" : "0",
      });

      d.setDate(d.getDate() + 1);
    }

    return list;
  }

  // =========================================================
  // Mock Form
  // =========================================================
  const mockForm = {
    groupName: "システム部",
    employeeId: "000003",
    employeeName: "カルティケ",
    targetMonthLabel: "2025年03月度",
    lastTargetMonth: "202502",
    nextTargetMonth: "202504",

    lockFlag: "0",

    infoMessages: [],
    errorMessages: [],

    recordViewDtoList: generateDateRange(targetMonth),

    totalWorkDayCount: 0,
    totalHolidayCount: 28,
    earlyWorkTime: "0",
    contractualWorkTime: "0",
    contractualOverWorkTime: "0",
  };

  const [form, setForm] = useState(mockForm);
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    document.title = "勤務予定照会";
  }, []);

  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // =========================================================
  // Navigation
  // =========================================================
  const goPrev = () =>
    setInfoMessages([`前月(${form.lastTargetMonth}) を読み込み（モック）`]);

  const goNext = () =>
    setInfoMessages([`翌月(${form.nextTargetMonth}) を読み込み（モック）`]);

  const goBack = () => navigate("/workPlan/list");

  // Edit is always open now (as per request)
  const handleEdit = () => {
    setInfoMessages(["編集ページへ遷移（モック）"]);
  };

  // =========================================================
  // UI RENDER
  // =========================================================
  return (
    <OwnerLayout title="勤務予定照会">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-calendar fa-fw"></i> 勤務予定照会
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="row">
        <div className="col-sm-12" style={{ marginBottom: 10 }}>
          <label className="input-label" style={{ marginRight: 20 }}>
            グループ名：{form.groupName}
          </label>

          <label className="input-label" style={{ marginRight: 20 }}>
            従業員ID：{form.employeeId}
          </label>

          <label className="input-label" style={{ marginRight: 20 }}>
            従業員名：{form.employeeName}
          </label>
        </div>

        <div className="col-sm-12" style={{ marginBottom: 10 }}>
          <label className="input-label">
            対象年月：{form.targetMonthLabel}
          </label>
        </div>

        {/* Prev / Next */}
        <div className="col-sm-12" style={{ marginBottom: 10 }}>
          <button className="btn btn-primary" onClick={goPrev}>
            <i className="fa fa-caret-left fa-fw" />
          </button>

          <button
            className="btn btn-primary"
            style={{ marginLeft: 5 }}
            onClick={goNext}
          >
            <i className="fa fa-caret-right fa-fw" />
          </button>
        </div>

        {/* Edit / Back */}
        <div className="col-sm-12 text-right">
          <button className="btn btn-primary" onClick={handleEdit}>
            <i className="fa fa-pencil-square-o"></i> 編集
          </button>

          <button
            className="btn btn-primary"
            style={{ marginLeft: 5 }}
            onClick={goBack}
          >
            <i className="fa fa-ban"></i> 戻る
          </button>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="row" style={{ padding: "15px" }}>
        <div
          className="col-md-12"
          style={{ overflowX: "scroll", height: 500, padding: 0 }}
        >
          <table
            className="table table-bordered table-condensed table-hover"
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            {/* HEADER */}
            <thead>
              <tr
                className="primary"
                style={{
                  backgroundColor: "#0E7AC4",
                  color: "white",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                }}
              >
                <th className="text-center" style={{ width: 90 }}>
                  日
                </th>
                <th className="text-center" style={{ width: 150 }}>
                  シフト
                </th>
                <th className="text-center" style={{ width: 120 }}>
                  早出
                </th>
                <th className="text-center" style={{ width: 120 }}>
                  勤務１
                </th>
                <th className="text-center" style={{ width: 120 }}>
                  勤務２
                </th>
                <th className="text-center" style={{ width: 120 }}>
                  勤務３
                </th>
                <th className="text-center" style={{ width: 120 }}>
                  勤務４
                </th>
                <th className="text-center" style={{ width: 180 }}>
                  勤務申請
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {form.recordViewDtoList.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ background: "#FFF8DC" }}
                  className="text-center"
                >
                  {/* 日 */}
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>
                      {row.day}({row.week})
                    </span>
                  </td>

                  {/* シフト */}
                  <td className="text-center">{row.shiftName}</td>

                  {/* 早出 */}
                  <td className="text-center" style={{ whiteSpace: "nowrap" }}>
                    {row.earlyStartTime}
                    {(row.earlyStartTime || row.earlyEndTime) && "～"}
                    {row.earlyEndTime}
                  </td>

                  {/* 勤務１ */}
                  <td className="text-center">{row.work1}</td>

                  {/* 勤務２ */}
                  <td className="text-center">{row.work2}</td>

                  {/* 勤務３ */}
                  <td className="text-center">{row.work3}</td>

                  {/* 勤務４ */}
                  <td className="text-center">{row.work4}</td>

                  {/* 勤務申請 */}
                  <td className="text-center" style={{ whiteSpace: "nowrap" }}>
                    {row.workAppsLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-8 col-md-4">
          <table className="table table-bordered">
            <thead>
              <tr className="primary">
                <th className="text-center">出勤日数</th>
                <th className="text-center">休日数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{form.totalWorkDayCount}</td>
                <td className="text-center">{form.totalHolidayCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </OwnerLayout>
  );
}
