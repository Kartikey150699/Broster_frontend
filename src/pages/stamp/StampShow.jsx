import { useEffect, useState, useMemo } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import NotificationBar from "../../components/NotificationBar";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function StampShow() {
  // ===========================
  // STATE
  // ===========================
  const [clock, setClock] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [breakFlag, setBreakFlag] = useState(0); // 0 initial - 1 working - 2 break - 3 end

  // ===========================
  // DUMMY DATA (replace with API)
  // ===========================
  const groupList = ["営業部", "開発部", "人事部"];

  const employeeList = [
    { id: "E001", name: "山田太郎", group: "営業部", companyId: 1 },
    { id: "E002", name: "佐藤花子", group: "開発部", companyId: 1 },
    { id: "E003", name: "鈴木翔", group: "人事部", companyId: 1 },
  ];

  // ===========================
  // LIVE CLOCK
  // ===========================
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const colon = now.getSeconds() % 2 === 0 ? ":" : " ";

      setClock(`${hh}${colon}${mm}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ===========================
  // FILTER EMPLOYEE LIST
  // ===========================
  const filteredEmployees = useMemo(() => {
    if (!filter) return employeeList;
    return employeeList.filter((e) => {
      return (
        e.id.includes(filter) ||
        e.name.includes(filter) ||
        e.group.includes(filter)
      );
    });
  }, [filter]);

  // ===========================
  // CLICK EMPLOYEE then OPEN MODAL
  // ===========================
  const openStampModal = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  // ===========================
  // HANDLE STAMP ACTION
  // ===========================
  const handleStamp = (type) => {
    try {
      let msg = "";
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const timeStamp = `${hh}:${mm}`;

      if (type === "start") {
        setBreakFlag(1);
        msg = "出勤しました";
      } else if (type === "end") {
        setBreakFlag(3);
        msg = "退勤しました";
      } else if (type === "break") {
        if (breakFlag === 2) {
          setBreakFlag(1);
          msg = "休憩終了しました";
        } else {
          setBreakFlag(2);
          msg = "休憩開始しました";
        }
      }

      // build final message
      const notification = `${selectedEmployee.name} さん：${msg}（${timeStamp}）`;

      // keep only last success message
      setInfoMessages([notification]);

      setShowModal(false);
    } catch (err) {
      // show error notification
      setErrorMessages([
        "システムエラーが発生しました。もう一度お試しください。",
      ]);

      // auto-remove error in 3 seconds
      setTimeout(() => setErrorMessages([]), 3000);
    }
  };

  return (
    <EmployeeLayout
      title="打刻"
      employeeName="打刻パネル"
      headerType="one"
      companyId={selectedEmployee?.companyId ?? null}
      groupId={selectedEmployee?.group ?? null}
      employeeId={selectedEmployee?.id ?? null}
    >
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />
      {/* CLOCK */}
      <div className="clock-glass-wrapper">
        <div className="clock-glass">
          <i className="fa fa-clock-o" /> {clock}
        </div>
      </div>
      {/* FILTER BAR */}
      <div className="row" style={{ marginTop: 25 }}>
        <div className="col-md-3 text-right">
          <label style={{ fontSize: 22, fontWeight: "bold", color: "#0E7AC4" }}>
            絞り込み
          </label>
        </div>

        <div className="col-md-6">
          <input
            className="form-control input-lg"
            placeholder="ID、名前を入力"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setFilter("")}
          >
            クリア
          </button>
        </div>
      </div>
      {/* GROUP FILTER BUTTONS */}
      <div className="text-center" style={{ marginTop: 20 }}>
        {groupList.map((g) => (
          <button
            key={g}
            className="btn btn-info btn-lg"
            style={{ margin: 5 }}
            onClick={() => setFilter(g)}
          >
            {g}
          </button>
        ))}
      </div>
      {/* EMPLOYEE TABLE */}
      <div className="row" style={{ marginTop: 25 }}>
        <div className="col-md-10 col-md-offset-1">
          {/* Centered table */}
          <div
            style={{
              maxWidth: "900px", // change this to adjust table width
              margin: "0 auto", // center horizontally
              width: "100%", // responsive
            }}
          >
            <div className="stamp-table-box">
              {/* TABLE HEADER */}
              <table
                className="table table-bordered text-center stamp-table"
                style={{ marginBottom: 0 }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>ID</th>
                    <th style={{ width: "45%" }}>名前</th>
                    <th style={{ width: "40%" }}>グループ</th>
                  </tr>
                </thead>
              </table>

              {/* SCROLL BODY */}
              <div className="stamp-scroll">
                <table
                  className="table table-bordered text-center stamp-table"
                  style={{ marginBottom: 0 }}
                >
                  <tbody>
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="stamp-row">
                        <td style={{ width: "15%" }}>{emp.id}</td>

                        <td
                          className="stamp-name"
                          style={{
                            width: "45%",
                            cursor: "pointer",
                          }}
                          onClick={() => openStampModal(emp)}
                        >
                          {emp.name}
                        </td>

                        <td style={{ width: "40%" }}>{emp.group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL — STAMP ACTIONS */}
      {showModal && selectedEmployee && (
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          overlayClassName="stamp-overlay"
          className="stamp-modal"
          shouldCloseOnOverlayClick={true}
        >
          {/* HEADER */}
          <div className="stamp-modal-header">
            <h3>
              <i className="fa fa-user" /> 打刻
            </h3>

            <button
              className="stamp-close-btn"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>

          {/* EMPLOYEE INFO */}
          <div className="stamp-info-block">
            <p className="stamp-id">
              <i className="fa fa-id-card" /> ID：{selectedEmployee.id || "---"}
            </p>
          </div>

          <div className="stamp-divider"></div>

          {/* CLOCK */}
          <div className="stamp-clock-display">
            <i className="fa fa-clock-o" /> {clock}
          </div>

          {/* NAME */}
          <div className="stamp-name-display">{selectedEmployee.name} さん</div>

          <div className="stamp-divider"></div>

          {/* BUTTON GRID */}
          <div className="stamp-btn-section">
            <button
              className="stamp-btn start"
              onClick={() => handleStamp("start")}
            >
              <i className="fa fa-sign-in" /> 出勤
            </button>

            <button
              className="stamp-btn end"
              onClick={() => handleStamp("end")}
            >
              <i className="fa fa-sign-out" /> 退勤
            </button>

            <button
              className="stamp-btn break"
              onClick={() => handleStamp("break")}
            >
              <i className="fa fa-play" /> 休憩
            </button>

            <button
              className="stamp-btn apply"
              onClick={() => {
                navigate(
                  `/stamp/applyRequest/${selectedEmployee.companyId}/${selectedEmployee.groupId}/${selectedEmployee.employeeId}`,
                );
              }}
            >
              <i className="fa fa-file" /> 勤務申請
            </button>
          </div>
        </Modal>
      )}
    </EmployeeLayout>
  );
}
