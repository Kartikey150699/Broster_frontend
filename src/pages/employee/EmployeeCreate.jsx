import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import axios from "axios";
import CommonButton from "../../components/CommonButton";

export default function EmployeeCreate() {
  const navigate = useNavigate();

  // ----------------------------------------------------
  // STATE: Form
  // ----------------------------------------------------
  const [form, setForm] = useState({
    employeeName: "",
    employeeAddr: "",
    employeePassword: "",
    hireDate: "",
    weekWorkDayCount: "5",
    jobType: "1", // 社員
    breakTimeType: "1", // 自動控除
    groupId: "",
    shiftId: "",
    otherAppId: "",
    employeeStatus: "0", // 在職
  });

  // ----------------------------------------------------
  // Notifications
  // ----------------------------------------------------
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ----------------------------------------------------
  // Master Dropdown Data
  // ----------------------------------------------------
  const [groupList, setGroupList] = useState([]);
  const [shiftList, setShiftList] = useState([]);

  useEffect(() => {
    loadMasters();
  }, []);

  const loadMasters = () => {
    // Replace with actual API later
    setGroupList([
      { key: "G01", value: "営業部" },
      { key: "G02", value: "開発部" },
      { key: "G03", value: "総務部" },
    ]);

    setShiftList([
      { key: "S01", value: "日勤" },
      { key: "S02", value: "夜勤" },
      { key: "S03", value: "フレックス" },
    ]);
  };

  // ----------------------------------------------------
  // Field Update Helper
  // ----------------------------------------------------
  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ----------------------------------------------------
  // Submit Handler
  // ----------------------------------------------------
  const submitForm = async () => {
    try {
      const url = "http://localhost:8081/broster/v2/api/employee/regist";

      console.log("Submitting:", form);
      // await axios.post(url, form);

      setInfoMessages(["従業員を登録しました。"]);
      setErrorMessages([]);

      setTimeout(() => navigate("/employee/list"), 1500);
    } catch (err) {
      console.error(err);
      setErrorMessages(["登録に失敗しました。"]);
      setInfoMessages([]);
    }
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------
  return (
    <OwnerLayout title="従業員登録">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* Title */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-user-plus fa-fw" /> 従業員登録
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <div className="form-horizontal">
        {/* Employee Name */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            従業員名
          </label>
          <div className="col-md-2">
            <input
              className="form-control"
              value={form.employeeName}
              onChange={(e) => updateField("employeeName", e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            メールアドレス
          </label>
          <div className="col-md-2">
            <input
              className="form-control"
              value={form.employeeAddr}
              onChange={(e) => updateField("employeeAddr", e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            初期パスワード
          </label>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              value={form.employeePassword}
              onChange={(e) => updateField("employeePassword", e.target.value)}
            />
          </div>
        </div>

        {/* Hire Date */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">入社日</label>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={form.hireDate}
              onChange={(e) => updateField("hireDate", e.target.value)}
            />
          </div>
        </div>

        {/* Week Work Day Count */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            週所定労働日数
          </label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.weekWorkDayCount}
              onChange={(e) => updateField("weekWorkDayCount", e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Type */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            雇用形態
          </label>
          <div className="col-md-6">
            {[
              ["1", "社員"],
              ["2", "パート"],
              ["3", "アルバイト"],
            ].map(([value, label]) => (
              <label key={value} style={{ marginRight: 15 }}>
                <input
                  type="radio"
                  value={value}
                  checked={form.jobType === value}
                  onChange={(e) => updateField("jobType", e.target.value)}
                />{" "}
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Break Type */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            休憩打刻
          </label>
          <div className="col-md-6">
            <label style={{ marginRight: 15 }}>
              <input
                type="radio"
                value="1"
                checked={form.breakTimeType === "1"}
                onChange={(e) => updateField("breakTimeType", e.target.value)}
              />{" "}
              自動控除
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={form.breakTimeType === "2"}
                onChange={(e) => updateField("breakTimeType", e.target.value)}
              />{" "}
              休憩打刻を利用
            </label>
          </div>
        </div>

        {/* Group */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            グループ
          </label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.groupId}
              onChange={(e) => updateField("groupId", e.target.value)}
            >
              <option value="">未選択</option>
              {groupList.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Shift */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            個別シフト
          </label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.shiftId}
              onChange={(e) => updateField("shiftId", e.target.value)}
            >
              <option value="">未選択</option>
              {shiftList.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* External App ID */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            外部アプリID
          </label>
          <div className="col-md-2">
            <input
              className="form-control"
              value={form.otherAppId}
              onChange={(e) => updateField("otherAppId", e.target.value)}
            />
          </div>
        </div>

        {/* Status */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            ステータス
          </label>
          <div className="col-md-6">
            {[
              ["0", "在職"],
              ["1", "休職"],
              ["2", "退職"],
            ].map(([value, label]) => (
              <label key={value} style={{ marginRight: 15 }}>
                <input
                  type="radio"
                  value={value}
                  checked={form.employeeStatus === value}
                  onChange={(e) =>
                    updateField("employeeStatus", e.target.value)
                  }
                />{" "}
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="row row-padding-top-2">
          <div className="col-md-12 text-center" style={{ marginTop: 20 }}>
            <CommonButton
              label="登録"
              icon="plus"
              type="primary"
              size="md"
              onClick={submitForm}
            />

            <CommonButton
              label="戻る"
              icon="ban"
              type="primary"
              size="md"
              style={{ marginLeft: 10 }}
              onClick={() => (window.location.href = "/employee/list")}
            />
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
