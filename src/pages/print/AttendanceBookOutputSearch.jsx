import { useState, useEffect } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import { ja } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// Mock data
const mockGroups = [
  { key: "G001", label: "営業部" },
  { key: "G002", label: "開発部" },
  { key: "G003", label: "総務部" },
];

const mockEmployees = [
  { employeeId: "E001", employeeName: "田中 太郎", groupId: "G001" },
  { employeeId: "E002", employeeName: "山田 花子", groupId: "G002" },
  { employeeId: "E003", employeeName: "佐藤 光", groupId: "G003" },
];

export default function AttendanceBookOutputSearch() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const [requestDateFrom, setRequestDateFrom] = useState(null);
  const [requestDateTo, setRequestDateTo] = useState(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const showModal = (msg) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  // Filter employees by group
  const filteredEmployees =
    selectedGroup === ""
      ? mockEmployees
      : mockEmployees.filter((e) => e.groupId === selectedGroup);

  // Auto-clear messages
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // Validate date range
  const validateDateRange = () => {
    if (!employeeId) {
      showModal("従業員を選択してください。");
      return false;
    }

    if (!requestDateFrom || !requestDateTo) {
      showModal("開始月、終了月を選択してください。");
      return false;
    }

    const diff =
      (requestDateTo.getFullYear() - requestDateFrom.getFullYear()) * 12 +
      (requestDateTo.getMonth() - requestDateFrom.getMonth());

    if (diff > 60) {
      showModal("開始月と終了月の範囲は5年以内にしてください。");
      return false;
    }

    return true;
  };

  // Format yyyy/MM
  const formatYm = (date) => (date ? format(date, "yyyy/MM") : "");

  // Submit
  const handleShow = () => {
  if (!validateDateRange()) return;

  const url = `/print/show?emp=${employeeId}&from=${formatYm(requestDateFrom)}&to=${formatYm(requestDateTo)}`;

  window.open(url, "_blank");

  setInfoMessages(["出勤簿を表示しました（モック）"]);
};

  return (
    <OwnerLayout title="出勤簿出力">
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* Title */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw"></i>出勤簿出力
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <div className="form-horizontal" onSubmit={(e) => e.preventDefault()}>

        {/* GROUP BUTTONS */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">グループ</label>
          </div>

          <div className="col-md-6 col-sm-4">
            <div className="form-group">
              {mockGroups.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  className="btn btn-info btn-lg"
                  style={{ width: 165, margin: "2px 1px" }}
                  onClick={() => setSelectedGroup(g.key)}
                >
                  {g.label}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: 6 }}
                onClick={() => setSelectedGroup("")}
              >
                クリア
              </button>
            </div>
          </div>
        </div>

        {/* EMPLOYEE SELECT */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">社員名</label>
          </div>
          <div className="col-md-2 col-sm-6">
            <select
              className="form-control"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">選択してください</option>
              {filteredEmployees.map((emp) => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.employeeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* START MONTH */}
        <div className="row row-padding-top-1 form-inline">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">開始月</label>
          </div>
          <div className="col-md-3 col-sm-4">
            <DatePicker
              selected={requestDateFrom}
              onChange={(date) => {
                setRequestDateFrom(date);
                setRequestDateTo(date);
              }}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              locale={ja}
              className="form-control"
              placeholderText="yyyy/mm"
            />
          </div>
        </div>

        {/* END MONTH */}
        <div className="row row-padding-top-1 form-inline">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">終了月</label>
          </div>
          <div className="col-md-3 col-sm-4">
            <DatePicker
              selected={requestDateTo}
              onChange={(date) => setRequestDateTo(date)}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              locale={ja}
              className="form-control"
              placeholderText="yyyy/mm"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="row row-padding-top-2">
          <div className="col-md-12 text-center">
            <button type="button" className="btn btn-primary btn-lg" onClick={handleShow}>
              <i className="fa fa-plus fa-fw"></i>表示
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <UniversalModal
        isOpen={modalOpen}
        title="確認"
        onClose={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
      >
        <p>{modalMsg}</p>
      </UniversalModal>
    </OwnerLayout>
  );
}