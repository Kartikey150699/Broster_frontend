import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale";

export default function ApplyRequestHistory() {
  const { companyId, groupId, employeeId } = useParams();

  // ===========================
  // STATE
  // ===========================
  const [applyCode, setApplyCode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusGroup, setStatusGroup] = useState("");

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // Universal modal states
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);

  // ===========================
  // MOCK DATA
  // ===========================
  const requestTypes = [
    { key: "1", value: "有休" },
    { key: "2", value: "半休" },
    { key: "3", value: "遅刻" },
    { key: "4", value: "早退" },
  ];

  const applyStatusMap = [
    { key: "0", value: "承認中" },
    { key: "1", value: "承認済" },
    { key: "9", value: "否認" },
  ];

  const mockHistory = [
    {
      requestId: "REQ001",
      applyRequestDate: "2025/01/12",
      applyCode: "1",
      applyCodeLabel: "有休",
      requestDateFrom: "2025/01/20",
      requestDateTo: "2025/01/20",
      requestBikoShort: "通院のため",
      requestTimeFrom: "",
      requestTimeTo: "",
      applyStatus: "0",
      applyStatusLabel: "承認中",
      detailList: [
        { name: "上長A", statusLabel: "承認中", status: 0 },
        { name: "管理者B", statusLabel: "未承認", status: 1 },
      ],
    },
    {
      requestId: "REQ002",
      applyRequestDate: "2025/01/05",
      applyCode: "2",
      applyCodeLabel: "半休",
      requestDateFrom: "2025/01/10",
      requestDateTo: "2025/01/10",
      requestBikoShort: "家庭都合",
      requestTimeFrom: "09:00",
      requestTimeTo: "12:00",
      applyStatus: "9",
      applyStatusLabel: "否認",
      detailList: [{ name: "上長A", statusLabel: "否認", status: 9 }],
    },
  ];

  useEffect(() => {
    if (infoMessages.length > 0 || errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  // ===========================
  // FILTER SUBMIT
  // ===========================
  const search = (e) => {
    e.preventDefault();
    setInfoMessages(["検索しました（モック動作）"]);
  };

  return (
    <EmployeeLayout title="勤務申請履歴">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw" /> 勤務申請履歴
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH AREA */}
      <form className="form-horizontal" onSubmit={search}>
        <div className="row row-padding-top-1">
          <div className="col-sm-12">
            <div className="form-inline">
              {/* Apply Code */}
              <label className="input-label">申請項目</label>
              <select
                value={applyCode}
                onChange={(e) => setApplyCode(e.target.value)}
                className="form-control"
                style={{ width: 150 }}
              >
                <option value="">未選択</option>
                {requestTypes.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.value}
                  </option>
                ))}
              </select>

              {/* Date */}
              <label className="input-label" style={{ marginLeft: 20 }}>
                日付
              </label>

              <div style={{ display: "inline-block" }}>
                <DatePicker
                  selected={dateFrom}
                  onChange={(date) => {
                    setDateFrom(date);
                    setDateTo(date); // same as JSP
                  }}
                  dateFormat="yyyy/MM/dd"
                  locale={ja}
                  className="form-control"
                  placeholderText="日付を選択"
                />
              </div>

              <span style={{ margin: "0 8px" }}>〜</span>

              <div style={{ display: "inline-block" }}>
                <DatePicker
                  selected={dateTo}
                  onChange={(date) => setDateTo(date)}
                  dateFormat="yyyy/MM/dd"
                  locale={ja}
                  className="form-control"
                  placeholderText="日付を選択"
                />
              </div>

              {/* Status */}
              <label className="input-label" style={{ marginLeft: 20 }}>
                承認状況
              </label>
              <select
                value={statusGroup}
                onChange={(e) => setStatusGroup(e.target.value)}
                className="form-control"
                style={{ width: 150 }}
              >
                <option value="">未選択</option>
                {applyStatusMap.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.value}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginLeft: 20 }}
              >
                <i className="fa fa-search" /> 検索
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: 10 }}>
        <div className="col-md-12" style={{ overflowX: "scroll", height: 500 }}>
          <table
            className="table table-bordered table-hover"
            style={{ width: "120%" }}
          >
            <thead>
              <tr className="primary text-center">
                <th>申請日</th>
                <th>申請項目</th>
                <th>開始日</th>
                <th>終了日</th>

                {/* Wider column */}
                <th style={{ width: "30%" }}>申請理由</th>

                <th>申請時間</th>
                <th>承認状況</th>
                <th>再申請</th>
              </tr>
            </thead>

            <tbody>
              {mockHistory.map((h) => (
                <tr key={h.requestId} className="text-center">
                  <td>{h.applyRequestDate}</td>
                  <td>{h.applyCodeLabel}</td>
                  <td>{h.requestDateFrom}</td>
                  <td>{h.requestDateTo}</td>

                  <td className="text-left" style={{ width: "30%" }}>
                    {h.requestBikoShort}
                  </td>

                  <td>
                    {h.requestTimeFrom
                      ? `${h.requestTimeFrom}〜${h.requestTimeTo}`
                      : ""}
                  </td>

                  <td>
                    <span
                      className={
                        h.applyStatus === "9"
                          ? "label label-danger"
                          : h.applyStatus === "1"
                            ? "label label-default"
                            : "label label-info"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        // Convert mock data into UniversalModal format
                        const converted = h.detailList.map((d) => ({
                          detailApplyStatus: d.status,
                          detailApplyStatusLabel: d.statusLabel,
                          employeeName: d.name,
                          applyLevel: 0,
                        }));

                        setModalDetails(converted);
                        setShowModal(true);
                      }}
                    >
                      {h.applyStatusLabel}
                    </span>
                  </td>

                  <td>
                    {h.applyStatus === "9" ? (
                      <a
                        href={`/stamp/reapply/${h.companyId}/${h.employeeId}/${h.requestId}`}
                      >
                        <i className="fa fa-pencil-square-o" /> 再申請
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UNIVERSAL MODAL */}
      <UniversalModal
        visible={showModal}
        mode="details"
        title="承認状況詳細"
        detailList={modalDetails}
        onCancel={() => setShowModal(false)}
      />
    </EmployeeLayout>
  );
}
