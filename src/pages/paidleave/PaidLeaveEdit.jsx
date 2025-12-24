import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import CommonButton from "../../components/CommonButton";

export default function PaidLeaveEdit() {
  const navigate = useNavigate();
  const { companyId, employeeId, targetYear } = useParams();

  // =====================
  // MOCK DATA (Add API Later)
  // =====================
  const mockData = {
    employeeId: employeeId,
    employeeName: "田中 太郎",
    targetYear: targetYear,
    firstGiveCount: 10,
    firstRemainingCount: 2,
    firstFixRemainingCount: 2,
    lastGiveCount: 12,
    lastRemainingCount: 5,
    lastFixRemainingCount: 3,
    currentGiveCount: 14,
    currentRemainingCount: 10,
  };

  const [form, setForm] = useState(mockData);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  function updateField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleUpdate() {
    setInfoMessages(["更新しました。（モック）"]);
    setTimeout(() => navigate("/paid/show"), 1200);
  }

  return (
    <OwnerLayout title="有休取得履歴">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i>
            有休日数修正
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <div className="form-horizontal">
        {/* Employee ID */}
        <div className="row form-inline row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">従業員ID</label>
          </div>
          <div className="col-md-3 col-sm-4">
            <label className="input-label" style={{ color: "red" }}>
              {form.employeeId}
            </label>
          </div>
        </div>

        {/* Employee Name */}
        <div className="row form-inline row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">従業員名</label>
          </div>
          <div className="col-md-3 col-sm-4">
            <label className="input-label" style={{ color: "red" }}>
              {form.employeeName}
            </label>
          </div>
        </div>

        {/* Target Year */}
        <div className="row form-inline row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">年度</label>
          </div>
          <div className="col-md-3 col-sm-4">
            <label className="input-label" style={{ color: "red" }}>
              {form.targetYear}年
            </label>
          </div>
        </div>

        {/* Input rows — EXACT JSP structure */}
        {/* firstGiveCount */}
        <FormRow
          label="初回基準日付与日数"
          value={form.firstGiveCount}
          onChange={(v) => updateField("firstGiveCount", v)}
        />

        {/* firstRemainingCount */}
        <FormRow
          label="初回基準日付与残日数"
          value={form.firstRemainingCount}
          onChange={(v) => updateField("firstRemainingCount", v)}
        />

        {/* firstFixRemainingCount */}
        <FormRow
          label="繰越初回付与残日数"
          value={form.firstFixRemainingCount}
          onChange={(v) => updateField("firstFixRemainingCount", v)}
        />

        {/* lastGiveCount */}
        <FormRow
          label="前回基準日付与日数"
          value={form.lastGiveCount}
          onChange={(v) => updateField("lastGiveCount", v)}
        />

        {/* lastRemainingCount */}
        <FormRow
          label="前回基準日付与残日数"
          value={form.lastRemainingCount}
          onChange={(v) => updateField("lastRemainingCount", v)}
        />

        {/* lastFixRemainingCount */}
        <FormRow
          label="繰越前期付与残日数"
          value={form.lastFixRemainingCount}
          onChange={(v) => updateField("lastFixRemainingCount", v)}
        />

        {/* currentGiveCount */}
        <FormRow
          label="今期基準日付与日数"
          value={form.currentGiveCount}
          onChange={(v) => updateField("currentGiveCount", v)}
        />

        {/* currentRemainingCount */}
        <FormRow
          label="今期基準日付与残日数"
          value={form.currentRemainingCount}
          onChange={(v) => updateField("currentRemainingCount", v)}
        />

        {/* BUTTONS */}
        <div className="row row-padding-top-2">
          <div className="col-md-12 text-center">
            <CommonButton
              label="更新"
              icon="pencil"
              color="primary"
              onClick={handleUpdate}
            />

            <CommonButton
              label="戻る"
              icon="ban"
              color="secondary"
              onClick={() => navigate(-1)}
              style={{ marginLeft: 10 }}
            />
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}

function FormRow({ label, value, onChange }) {
  return (
    <div className="row form-inline row-padding-top-1">
      <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
        <label className="input-label">{label}</label>
      </div>

      <div className="col-md-3 col-sm-4">
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
