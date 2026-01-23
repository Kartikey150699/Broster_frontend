import { useState, useEffect } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import MiniTimePicker from "../../components/MiniTimePicker";
import CommonButton from "../../components/CommonButton";

export default function ApplyCreate() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  // ==============
  // MOCK LOOKUP DATA
  // ==============
  const mockGroupMap = {
    G001: "営業部",
    G002: "開発部",
    G003: "総務部",
  };

  const mockEmployeeMap = {
    E001: { employeeName: "田中 太郎", groupId: "G001" },
    E002: { employeeName: "山田 花子", groupId: "G002" },
    E003: { employeeName: "佐藤 健", groupId: "G003" },
  };

  const mockApplyCodeMap = {
    100: "有給休暇（全日）",
    110: "有給休暇（半日）",
    120: "慶弔休暇",
    130: "欠勤",
    140: "直行",
    150: "直帰",
    160: "直行直帰",
    170: "出張",
    180: "遅刻",
    190: "早退",
    200: "振替休日",
    210: "早出",
  };

  const [filteredGroup, setFilteredGroup] = useState("");
  const [remainingDays, setRemainingDays] = useState("--日");

  // FORM VALUES
  const [form, setForm] = useState({
    employeeId: "",
    applyCode: "",
    requestDateFrom: "",
    requestDateTo: "",
    requestBiko: "",
    requestTimeFrom: "",
    requestTimeTo: "",
  });

  // Form updater
  const updateForm = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  // Auto copy start date to end date
  useEffect(() => {
    if (form.requestDateFrom) {
      updateForm("requestDateTo", form.requestDateFrom);
    }
  }, [form.requestDateFrom]);

  // Auto-clear messages
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // Mock (add api later)
  const handleRemainingDay = () => {
    if (!form.employeeId) {
      alert("従業員を選択してください");
      return;
    }
    setRemainingDays("12日"); // mock
  };

  // Submit mock
  const submitForm = (e) => {
    e.preventDefault();
    setInfoMessages(["申請登録（モック）成功しました"]);
  };

  return (
    <OwnerLayout title="申請登録">
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
      <form className="form-horizontal" onSubmit={submitForm}>
        {/* GROUP FILTER */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">グループ</label>
          </div>
          <div className="col-md-6">
            {Object.entries(mockGroupMap).map(([gid, gname]) => (
              <button
                key={gid}
                type="button"
                className={`btn btn-info btn-lg ${filteredGroup === gid ? "selected-btn" : ""}`}
                style={{ width: 165, margin: "3px" }}
                onClick={() => setFilteredGroup(gid)}
              >
                {gname}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => setFilteredGroup("")}
              style={{ marginLeft: 8 }}
            >
              クリア
            </button>
          </div>
        </div>

        {/* EMPLOYEE NAME */}
        <div className="row form-inline row-padding-top-1">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">従業員名</label>
          </div>
          <div className="col-md-6">
            <select
              className="form-control"
              value={form.employeeId}
              onChange={(e) => updateForm("employeeId", e.target.value)}
            >
              <option value="">未選択</option>

              {Object.entries(mockEmployeeMap)
                .filter(([id, emp]) =>
                  !filteredGroup ? true : emp.groupId === filteredGroup,
                )
                .map(([id, emp]) => (
                  <option key={id} value={id}>
                    {emp.employeeName}
                  </option>
                ))}
            </select>

            <button
              type="button"
              className="btn btn-link"
              style={{ marginLeft: 10 }}
              onClick={handleRemainingDay}
            >
              <i className="fa fa-check-square-o"></i> 有休残日数確認：
            </button>

            <label>{remainingDays}</label>
          </div>
        </div>

        {/* APPLY CODE */}
        <div className="row row-padding-top-1 form-inline">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">申請項目</label>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={form.applyCode}
              onChange={(e) => updateForm("applyCode", e.target.value)}
            >
              <option value="">未選択</option>
              {Object.entries(mockApplyCodeMap).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* START DATE */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">開始日</label>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={form.requestDateFrom}
              onChange={(e) => updateForm("requestDateFrom", e.target.value)}
            />
          </div>
        </div>

        {/* END DATE */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">終了日</label>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={form.requestDateTo}
              onChange={(e) => updateForm("requestDateTo", e.target.value)}
            />
          </div>
        </div>

        {/* REASON */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">申請理由</label>
          </div>
          <div className="col-md-4">
            <textarea
              rows="3"
              className="form-control"
              value={form.requestBiko}
              onChange={(e) => updateForm("requestBiko", e.target.value)}
            />
          </div>
        </div>

        {/* TIME */}
        <div className="row row-padding-top-1 form-inline">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">申請時間</label>
          </div>

          <div className="col-md-6">
            <MiniTimePicker
              value={form.requestTimeFrom}
              onChange={(val) => updateForm("requestTimeFrom", val)}
            />
            ～
            <MiniTimePicker
              value={form.requestTimeTo}
              onChange={(val) => updateForm("requestTimeTo", val)}
            />
            <div style={{ marginTop: 5 }}>
              ※半休・早退・遅刻・早出は必須入力
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="row row-padding-top-2">
          <div className="col-md-12 text-center">
            {/* SUBMIT */}
            <CommonButton
              icon="plus"
              label="申請"
              size="md"
              type="submit" // FORM SUBMIT
              style={{ marginRight: "10px" }}
            />

            {/* BACK */}
            <CommonButton
              icon="ban"
              label="戻る"
              size="md"
              onClick={() => (window.location.href = "/apply/list")}
            />
          </div>
        </div>
      </form>
    </OwnerLayout>
  );
}
