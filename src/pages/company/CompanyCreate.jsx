import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import CommonButton from "../../components/CommonButton";
import axios from "axios";

export default function CompanyCreate() {
  const navigate = useNavigate();

  // -------------------------------
  // State (Form)
  // -------------------------------
  const [form, setForm] = useState({
    adminName: "",
    adminPassword: "",
    adminMailaddress: "",
    companyName: "",
    selectedTodofuken: "",
    companyAddr: "",
    companyTel: "",
    calcLogicName:
      "jp.co.ifnt.broster.v2.api.calc.component.impl.RosterDailyMtk",
    workingType: "1",
    dateChangeTime: "24:00",
    weekWorkFlag1: "0",
    weekWorkFlag2: "0",
    weekWorkFlag3: "0",
    weekWorkFlag4: "0",
    weekWorkFlag5: "0",
    weekWorkFlag6: "0",
    weekWorkFlag7: "0",
    weekWorkFlag0: "0",
    stepSize: "",
    fixBreakTimeDeduction: "",
    selectedFixDate: "",
    yearEndDate: "",
    adjustPlanStartTimeFlag: "0",
  });

  // -------------------------------
  // Notifications
  // -------------------------------
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // -------------------------------
  // Master Data (Dropdowns)
  // -------------------------------
  const [todofukenMap, setTodofukenMap] = useState([]);
  const [stepsizeMap, setStepsizeMap] = useState([]);
  const [fixBreakTimeMap, setFixBreakTimeMap] = useState([]);
  const [fixdateMap, setFixdateMap] = useState([]);

  // -------------------------------
  // Load master data on mount
  // -------------------------------
  useEffect(() => {
    loadMasters();
  }, []);

  function loadMasters() {
    setTodofukenMap([
      { key: "13", value: "東京都" },
      { key: "27", value: "大阪府" },
      { key: "14", value: "神奈川県" },
    ]);

    setStepsizeMap([
      { key: "15", value: "15分" },
      { key: "30", value: "30分" },
      { key: "60", value: "60分" },
    ]);

    setFixBreakTimeMap([
      { key: "60", value: "60分" },
      { key: "90", value: "90分" },
      { key: "120", value: "120分" },
    ]);

    setFixdateMap([
      { key: "25", value: "25日締め" },
      { key: "31", value: "月末締め" },
    ]);
  }

  // -------------------------------
  // Update field helper
  // -------------------------------
  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // -------------------------------
  // Submit handler
  // -------------------------------
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting:", form);

      // await axios.post("http://localhost:8081/broster/v2/api/company/regist", form);

      setInfoMessages(["会社を登録しました。"]);
      setErrorMessages([]);

      setTimeout(() => navigate("/status/show"), 1500);
    } catch (err) {
      setErrorMessages(["登録に失敗しました。"]);
      setInfoMessages([]);
      console.error(err);
    }
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <OwnerLayout title="会社登録">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-user-plus fa-fw"></i> 利用登録
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <form className="form-horizontal" onSubmit={submitForm}>
        {/* Admin Section */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            管理者名(初期登録)
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              value={form.adminName}
              onChange={(e) => updateField("adminName", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            パスワード
          </label>
          <div className="col-md-2">
            <input
              type="password"
              className="form-control"
              value={form.adminPassword}
              onChange={(e) => updateField("adminPassword", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            メールアドレス
          </label>
          <div className="col-md-2">
            <input
              className="form-control"
              value={form.adminMailaddress}
              onChange={(e) => updateField("adminMailaddress", e.target.value)}
            />
          </div>
        </div>

        {/* Company Info */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">会社名</label>
          <div className="col-md-4">
            <input
              className="form-control"
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            会社住所
          </label>

          <div className="col-md-1">
            <select
              className="form-control"
              value={form.selectedTodofuken}
              onChange={(e) => updateField("selectedTodofuken", e.target.value)}
            >
              <option value="">未選択</option>
              {todofukenMap.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.value}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              value={form.companyAddr}
              onChange={(e) => updateField("companyAddr", e.target.value)}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            会社TEL
          </label>
          <div className="col-md-2">
            <input
              className="form-control"
              value={form.companyTel}
              onChange={(e) => updateField("companyTel", e.target.value)}
            />
          </div>
        </div>

        {/* Working Type */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            就業形態
          </label>
          <div className="col-md-2">
            <label>
              <input
                type="radio"
                value="1"
                checked={form.workingType === "1"}
                onChange={(e) => updateField("workingType", e.target.value)}
              />{" "}
              通常
            </label>{" "}
            <label>
              <input
                type="radio"
                value="2"
                checked={form.workingType === "2"}
                onChange={(e) => updateField("workingType", e.target.value)}
              />{" "}
              フレックス
            </label>
          </div>
        </div>

        {/* Date Change Time */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            日付変更時刻
          </label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.dateChangeTime}
              onChange={(e) => updateField("dateChangeTime", e.target.value)}
            >
              {[
                "24:00",
                "25:00",
                "26:00",
                "27:00",
                "28:00",
                "29:00",
                "30:00",
                "31:00",
                "32:00",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Week Flags */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            休日設定
          </label>
          <div className="col-md-8">
            {[
              ["weekWorkFlag1", "月"],
              ["weekWorkFlag2", "火"],
              ["weekWorkFlag3", "水"],
              ["weekWorkFlag4", "木"],
              ["weekWorkFlag5", "金"],
              ["weekWorkFlag6", "土"],
              ["weekWorkFlag7", "日"],
              ["weekWorkFlag0", "祝日"],
            ].map(([key, label]) => (
              <label key={key} style={{ marginRight: 10 }}>
                <input
                  type="checkbox"
                  checked={form[key] === "1"}
                  onChange={(e) =>
                    updateField(key, e.target.checked ? "1" : "0")
                  }
                />{" "}
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Step Size */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">刻み幅</label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.stepSize}
              onChange={(e) => updateField("stepSize", e.target.value)}
            >
              {stepsizeMap.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fixed Break Deduction */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            固定休憩控除閾値
          </label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.fixBreakTimeDeduction}
              onChange={(e) =>
                updateField("fixBreakTimeDeduction", e.target.value)
              }
            >
              {fixBreakTimeMap.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fix Date */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">締日</label>
          <div className="col-md-2">
            <select
              className="form-control"
              value={form.selectedFixDate}
              onChange={(e) => updateField("selectedFixDate", e.target.value)}
            >
              {fixdateMap.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Year End Date */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            年度切替日
          </label>
          <div className="col-md-2">
            <input
              className="form-control"
              value={form.yearEndDate}
              onChange={(e) => updateField("yearEndDate", e.target.value)}
            />
          </div>
        </div>

        {/* Start Time Adjust */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">
            開始時間補正
          </label>
          <div className="col-md-2">
            <label>
              <input
                type="radio"
                value="0"
                checked={form.adjustPlanStartTimeFlag === "0"}
                onChange={(e) =>
                  updateField("adjustPlanStartTimeFlag", e.target.value)
                }
              />{" "}
              補正しない
            </label>{" "}
            <label>
              <input
                type="radio"
                value="1"
                checked={form.adjustPlanStartTimeFlag === "1"}
                onChange={(e) =>
                  updateField("adjustPlanStartTimeFlag", e.target.value)
                }
              />{" "}
              補正する
            </label>
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
              onClick={() => (window.location.href = "/status/show")}
            />
          </div>
        </div>
      </form>
    </OwnerLayout>
  );
}
