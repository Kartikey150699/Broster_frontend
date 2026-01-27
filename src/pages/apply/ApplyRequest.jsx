import { useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import NotificationBar from "../../components/NotificationBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale";

export default function ApplyRequest() {
  // ===========================
  // URL PARAMS
  // ===========================
  const { companyId, groupId, employeeId } = useParams();

  // Replace this with API call later
  const employee = {
    groupName: groupId || "---",
    employeeName: "従業員名(仮)", // Will replace with backend value later
    employeeId: employeeId || "---",
  };

  // ===========================
  // STATE
  // ===========================
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [applyCode, setApplyCode] = useState("");
  const [requestDateFrom, setRequestDateFrom] = useState(null);
  const [requestDateTo, setRequestDateTo] = useState(null);
  const [requestReason, setRequestReason] = useState("");
  const [requestTimeFrom, setRequestTimeFrom] = useState("");
  const [requestTimeTo, setRequestTimeTo] = useState("");
  const [remainingDay, setRemainingDay] = useState("--日");
  const [showRemaining, setShowRemaining] = useState(false);

  // Request types (static for now)
  const requestTypes = [
    { key: "1", value: "有休" },
    { key: "2", value: "半休" },
    { key: "3", value: "遅刻" },
    { key: "4", value: "早退" },
  ];

  // ===========================
  // FORM SUBMIT
  // ===========================
  const submitForm = (e) => {
    e.preventDefault();

    if (!applyCode) {
      setErrorMessages(["申請項目を選択してください"]);
      setInfoMessages([]);
      return;
    }

    setErrorMessages([]);
    setInfoMessages([`${employee.employeeName} さん：勤務申請を送信しました`]);
  };

  // ===========================
  // REMAINING DAY CHECK HANDLER
  // ===========================
  const fetchRemainingDays = () => {
    // Example: backend returns integer 10
    const day = 10;

    // return float format like 10.0
    return day.toFixed(1);
  };

  const handleRemainingToggle = () => {
    if (showRemaining) {
      setShowRemaining(false);
      setRemainingDay("--日");
    } else {
      const day = fetchRemainingDays();
      setShowRemaining(true);
      setRemainingDay(`${day}日`);
    }
  };

  return (
    <EmployeeLayout
      title="勤務申請"
      headerType="two"
      companyId={companyId}
      groupId={groupId}
      employeeId={employeeId}
    >
      <div
        className="container-fluid apply-request-page"
        style={{ maxWidth: 1500, paddingLeft: 0, paddingRight: 0 }}
      >
        {/* NOTIFICATION AREA */}
        <NotificationBar
          infoMessages={infoMessages}
          errorMessages={errorMessages}
        />

        {/* TITLE */}
        <div className="row row-padding-top-1">
          <div className="col-md-12">
            <h2>
              <i className="fa fa-file fa-fw"></i> 申請登録
            </h2>
            <hr className="star-primary" />
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={submitForm} className="form-horizontal">
          {/* GROUP NAME */}
          <div className="row row-padding-top-1">
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">グループ</label>
            </div>
            <div className="col-md-6">
              <label style={{ color: "red" }}>{employee.groupName}</label>
            </div>
          </div>

          {/* EMPLOYEE NAME */}
          <div className="row row-padding-top-1">
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">従業員名</label>
            </div>
            <div className="col-md-6">
              <label style={{ color: "red" }}>{employee.employeeName}</label>
            </div>
          </div>

          {/* APPLY TYPE */}
          <div className="row row-padding-top-1">
            {/* LABEL */}
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">申請項目</label>
            </div>

            {/* SELECT BOX */}
            <div className="col-md-3">
              <select
                className="form-control"
                style={{ width: "200px" }}
                value={applyCode}
                onChange={(e) => setApplyCode(e.target.value)}
              >
                <option value="">未選択</option>
                {requestTypes.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.value}
                  </option>
                ))}
              </select>
            </div>

            {/* CHECKBOX + REMAINING DAYS */}
            <div className="col-md-4" style={{ marginTop: 5 }}>
              <label style={{ cursor: "pointer", userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={showRemaining}
                  onChange={handleRemainingToggle}
                  style={{
                    marginRight: 6,
                    accentColor: "#0E7AC4",
                  }}
                />
                有休残日数確認：
              </label>

              <span style={{ fontWeight: "bold", marginLeft: 4 }}>
                {remainingDay}
              </span>
            </div>
          </div>

          {/* START DATE */}
          <div className="row row-padding-top-1">
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">開始日</label>
            </div>
            <div className="col-md-3">
              <DatePicker
                selected={requestDateFrom}
                onChange={(date) => {
                  setRequestDateFrom(date);
                  setRequestDateTo(date);
                }}
                dateFormat="yyyy/MM/dd"
                locale={ja}
                className="form-control"
                placeholderText="日付を選択"
              />
            </div>
          </div>

          {/* END DATE */}
          <div className="row row-padding-top-1">
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">終了日</label>
            </div>
            <div className="col-md-3">
              <DatePicker
                selected={requestDateTo}
                onChange={(date) => setRequestDateTo(date)}
                dateFormat="yyyy/MM/dd"
                locale={ja}
                className="form-control"
                placeholderText="日付を選択"
              />
            </div>
          </div>

          {/* REASON */}
          <div className="row row-padding-top-1">
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">申請理由</label>
            </div>
            <div className="col-md-6">
              <textarea
                rows="4"
                className="form-control"
                style={{ width: "500px" }}
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* TIME RANGE */}
          <div className="row row-padding-top-1">
            <div className="col-md-offset-2 col-md-2">
              <label className="input-label">申請時間</label>
            </div>
            <div className="col-md-4 form-inline">
              <input
                type="text"
                className="form-control"
                placeholder="09:00"
                style={{ width: 100 }}
                value={requestTimeFrom}
                onChange={(e) => setRequestTimeFrom(e.target.value)}
              />
              ～
              <input
                type="text"
                className="form-control"
                placeholder="18:00"
                style={{ width: 100 }}
                value={requestTimeTo}
                onChange={(e) => setRequestTimeTo(e.target.value)}
              />
            </div>

            <div className="col-md-8 col-md-offset-4" style={{ marginTop: 5 }}>
              ※半休・早退・遅刻・早出は必須入力
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div
            className="row"
            style={{ marginTop: "10px", marginBottom: "0px" }}
          >
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-plus fa-fw"></i> 申請登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </EmployeeLayout>
  );
}
