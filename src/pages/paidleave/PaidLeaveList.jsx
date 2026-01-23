import { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/CommonButton";

export default function PaidLeaveList() {
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);
  const [targetYear, setTargetYear] = useState(2024);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ============================
  // MOCK DATA
  // ============================
  const mockYears = [2021, 2022, 2023, 2024, 2025];

  const requestHeaders = Array.from(
    { length: 40 },
    (_, i) => `申請${String(i + 1).padStart(2, "0")}`,
  );

  const mockEmployees = [
    {
      companyId: "C001",
      employeeId: "E001",
      employeeName: "田中 太郎",
      groupName: "営業部",
      hireDate: "2021-04-01",
      weekWorkDayCount: 5,

      firstGiveDate: "2021-10-01",
      firstGiveCount: 10,
      firstRemainingCount: 2,
      firstFixRemainingCount: 2,

      lastGiveCount: 12,
      lastRemainingCount: 5,
      lastFixRemainingCount: 3,

      currentGiveCount: 14,
      currentRemainingCount: 10,

      useDay: 4,
      totalRemainingCount: 18,

      paidAcquisitionDateList: [
        { targetDate: "1/12", requestFlag: "1" },
        { targetDate: "2/05", requestFlag: "0" },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "5/20", requestFlag: "1" },
        { targetDate: "", requestFlag: null },
        { targetDate: "7/02", requestFlag: "0" },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "10/11", requestFlag: "1" },
        { targetDate: "", requestFlag: null },
        { targetDate: "12/28", requestFlag: "1" },
      ],
    },

    {
      companyId: "C001",
      employeeId: "E002",
      employeeName: "山田 花子",
      groupName: "開発部",
      hireDate: "2022-06-01",
      weekWorkDayCount: 4,

      firstGiveDate: "2022-12-01",
      firstGiveCount: 7,
      firstRemainingCount: 1,
      firstFixRemainingCount: 1,

      lastGiveCount: 8,
      lastRemainingCount: 4,
      lastFixRemainingCount: 2,

      currentGiveCount: 10,
      currentRemainingCount: 8,

      useDay: 2,
      totalRemainingCount: 14,

      paidAcquisitionDateList: [
        { targetDate: "", requestFlag: null },
        { targetDate: "2/14", requestFlag: "1" },
        { targetDate: "", requestFlag: null },
        { targetDate: "4/21", requestFlag: "0" },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "8/03", requestFlag: "1" },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "11/09", requestFlag: "0" },
        { targetDate: "", requestFlag: null },
      ],
    },

    {
      companyId: "C001",
      employeeId: "E003",
      employeeName: "佐藤 健",
      groupName: "総務部",
      hireDate: "2020-02-10",
      weekWorkDayCount: 5,

      firstGiveDate: "2020-08-10",
      firstGiveCount: 10,
      firstRemainingCount: 0,
      firstFixRemainingCount: 0,

      lastGiveCount: 12,
      lastRemainingCount: 6,
      lastFixRemainingCount: 4,

      currentGiveCount: 14,
      currentRemainingCount: 12,

      useDay: 1,
      totalRemainingCount: 18,

      paidAcquisitionDateList: [
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "3/18", requestFlag: "1" },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
        { targetDate: "", requestFlag: null },
      ],
    },
  ];

  // ============================
  // Auto hide messages
  // ============================
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  return (
    <OwnerLayout title="有休取得履歴">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 有休取得履歴
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="row row-padding-top-1 search-area">
        <div className="col-md-8 col-sm-8 col-xs-12 search-left">
          <div className="form-inline search-controls">
            <label className="input-label">年度</label>

            <select
              className="form-control"
              value={targetYear}
              onChange={(e) => setTargetYear(e.target.value)}
            >
              {mockYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <button
              className="btn btn-primary search-btn"
              onClick={() => setInfoMessages(["検索しました。（モック）"])}
            >
              <i className="fa fa-search"></i> 検索
            </button>

            <button
              className="btn btn-primary csv-btn"
              onClick={() =>
                setInfoMessages(["CSVをダウンロードしました。（モック）"])
              }
            >
              <i className="fa fa-file-text-o"></i> CSV
            </button>
          </div>
        </div>

        <div className="col-md-4 col-sm-4 col-xs-12 text-right toggle-area">
          <div
            className={`btn btn-info btn-lg toggle-btn ${showDetails ? "selected-btn" : ""}`}
            onClick={() => setShowDetails(!showDetails)}
          >
            表示切替
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px" }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            height: 500,
            position: "relative",
            background: "white",
            paddingLeft: "0",
            clipPath: "inset(0 0 0 0)",
          }}
        >
          <table
            className="table table-bordered table-condensed table-hover"
            style={{
              width: "100%",
              whiteSpace: "nowrap",
              position: "relative",
            }}
          >
            <thead>
              <tr className="primary">
                {/* Headers */}
                <th
                  className="text-center primary"
                  style={{
                    position: "sticky",
                    left: 0,
                    top: 0,
                    zIndex: 5,
                    width: "18%",
                    background: "inherit",
                    borderLeft: "1px solid #ddd",
                    boxShadow: "2px 0 2px rgba(0,0,0,0.1)",
                  }}
                >
                  従業員
                </th>

                <th
                  className="text-center primary"
                  style={{
                    position: "sticky",
                    top: 0,
                    width: "13%",
                    zIndex: 2,
                  }}
                >
                  グループ
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  入社日
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  週所定
                  <br />
                  労働
                  <br />
                  日数
                </th>

                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  初回
                  <br />
                  基準日
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  初回
                  <br />
                  基準日
                  <br />
                  付与
                  <br />
                  日数
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  初回
                  <br />
                  基準日
                  <br />
                  付与
                  <br />
                  残日数
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  繰越
                  <br />
                  初回付与
                  <br />
                  残日数
                </th>

                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  前回
                  <br />
                  基準日
                  <br />
                  付与
                  <br />
                  日数
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  前回
                  <br />
                  基準日
                  <br />
                  付与
                  <br />
                  残日数
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  繰越
                  <br />
                  前期付与
                  <br />
                  残日数
                </th>

                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  今期
                  <br />
                  基準日
                  <br />
                  付与
                  <br />
                  日数
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "5%", zIndex: 2 }}
                >
                  今期
                  <br />
                  基準日
                  <br />
                  付与
                  <br />
                  残日数
                </th>

                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "7%", zIndex: 2 }}
                >
                  取得
                  <br />
                  日数
                </th>
                <th
                  className="text-center primary"
                  style={{ position: "sticky", top: 0, width: "7%", zIndex: 2 }}
                >
                  有休
                  <br />
                  残日数
                </th>

                {/* 申請01〜40 columns */}
                {requestHeaders.map((h, idx) => (
                  <th
                    key={idx}
                    className="text-center primary detail"
                    style={{
                      display: showDetails ? "" : "none",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {mockEmployees.map((e, idx) => (
                <tr key={idx} className="text-center">
                  {/* 従業員 */}
                  <td
                    className="text-left"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "white",
                      zIndex: 4,
                      width: "18%",
                      borderLeft: "1px solid #ddd",
                      boxShadow: "2px 0 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", color: "#337ab7" }}
                      onClick={() =>
                        navigate(
                          `/paid/edit/${e.companyId}/${e.employeeId}/${targetYear}`,
                        )
                      }
                    >
                      {e.employeeId} {e.employeeName}
                    </span>
                  </td>

                  {/* MAIN COLUMNS */}
                  <td>{e.groupName}</td>
                  <td>{e.hireDate}</td>
                  <td>{e.weekWorkDayCount}</td>

                  <td>{e.firstGiveDate}</td>
                  <td>{e.firstGiveCount}</td>
                  <td>{e.firstRemainingCount}</td>
                  <td>{e.firstFixRemainingCount}</td>

                  <td>{e.lastGiveCount}</td>
                  <td>{e.lastRemainingCount}</td>
                  <td>{e.lastFixRemainingCount}</td>

                  <td>{e.currentGiveCount}</td>
                  <td>{e.currentRemainingCount}</td>

                  <td>{e.useDay}</td>
                  <td>{e.totalRemainingCount}</td>

                  {/* 申請01〜40 */}
                  {requestHeaders.map((h, i) => {
                    const d = e.paidAcquisitionDateList[i] || {
                      targetDate: "",
                      requestFlag: null,
                    };

                    return (
                      <td
                        key={i}
                        className="detail"
                        style={{
                          display: showDetails ? "" : "none",
                          textDecoration:
                            d.requestFlag === "0" ? "underline" : "",
                        }}
                      >
                        {d.targetDate}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OwnerLayout>
  );
}
