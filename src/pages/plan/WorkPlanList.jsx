import { useState, useEffect } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";

// ------------------------------
// MOCK DATA (Replace with API later)
// ------------------------------
const mockYearOptions = {
  2023: "2023",
  2024: "2024",
  2025: "2025",
};

// Generate YYYYMM list
function generateYearMonths(year) {
  const list = [];
  for (let m = 1; m <= 12; m++) {
    const mm = m.toString().padStart(2, "0");
    list.push(`${year}${mm}`);
  }
  return list;
}

const mockGridList = [
  {
    groupName: "営業部",
    employeeId: "E001",
    employeeName: "田中 太郎",
    companyId: 1,
    groupId: 1,
  },
  {
    groupName: "開発部",
    employeeId: "E002",
    employeeName: "山田 花子",
    companyId: 1,
    groupId: 2,
  },
];

// ------------------------------

export default function WorkPlanList() {
  const currentYear = new Date().getFullYear();

  const [targetYear, setTargetYear] = useState(currentYear);
  const [tableHeader, setTableHeader] = useState([]);
  const [gridData, setGridData] = useState([]);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // PAGE TITLE
  useEffect(() => {
    document.title = "勤務予定一覧";
  }, []);

  // AUTO-HIDE NOTIFICATION
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  // ------------------------------
  // AUTO LOAD CURRENT YEAR DATA
  // ------------------------------
  useEffect(() => {
    const header = generateYearMonths(currentYear);
    setTableHeader(header);

    const filledGrid = mockGridList.map((row) => ({
      ...row,
      targetMonthList: header.map((m) => ({ targetMonth: m })),
    }));

    setGridData(filledGrid);
  }, []);

  // ------------------------------
  // SEARCH (Mock)
  // ------------------------------
  const handleSearch = () => {
    const header = generateYearMonths(targetYear);
    setTableHeader(header);

    const filledGrid = mockGridList.map((row) => ({
      ...row,
      targetMonthList: header.map((m) => ({ targetMonth: m })),
    }));

    setGridData(filledGrid);
    setInfoMessages(["検索が完了しました。（モック）"]);
  };

  // ------------------------------
  // CREATE NEXT YEAR MOCK
  // ------------------------------
  const confirmCreateYear = () => {
    setModalVisible(false);
    setInfoMessages(["翌年度分を一括作成しました。（モック）"]);
  };

  // ------------------------------

  return (
    <OwnerLayout title="勤務予定一覧">
      {/* NOTIFICATION BAR */}
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE AREA */}
      <div className="row row-padding-top-1 workplan-search-row workplan-mobile-padding">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-calendar fa-fw" /> 勤務予定一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="form-horizontal">
        <div className="row row-padding-top-1">
          {/* YEAR SELECT + SEARCH */}
          <div className="col-md-6 form-inline">
            <select
              className="form-control"
              value={targetYear}
              onChange={(e) => setTargetYear(e.target.value)}
            >
              {Object.entries(mockYearOptions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: 10 }}
              onClick={handleSearch}
            >
              <i className="fa fa-search fa-fw" /> 検索
            </button>
          </div>

          {/* CREATE NEXT YEAR */}
          <div className="col-md-6 text-right">
            <button
              className="btn btn-primary"
              onClick={() => setModalVisible(true)}
            >
              <i className="fa fa-plus fa-fw" /> 翌年度分を一括作成
            </button>
          </div>
        </div>
      </div>

      {/* TABLE AREA */}
      <div className="row row-padding-top-2" style={{ padding: "10px 10px" }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "scroll",
            padding: 0,
            height: 500,
          }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed table-hover"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                whiteSpace: "nowrap",
              }}
            >
              <thead>
                <tr className="primary">
                  <th
                    className="text-center primary"
                    style={{ position: "sticky", top: 0, zIndex: 2 }}
                  >
                    グループ名
                  </th>
                  <th
                    className="text-center primary"
                    style={{ position: "sticky", top: 0, zIndex: 2 }}
                  >
                    従業員ID
                  </th>
                  <th
                    className="text-center primary"
                    style={{ position: "sticky", top: 0, zIndex: 2 }}
                  >
                    従業員名
                  </th>

                  {/* HEADER MONTHS */}
                  {tableHeader.map((yyyyMM, idx) => (
                    <th
                      key={idx}
                      className="text-center primary"
                      style={{ position: "sticky", top: 0, zIndex: 2 }}
                    >
                      {yyyyMM.substring(0, 4)}
                      <br />
                      {yyyyMM.substring(4, 6)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {gridData.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>{row.groupName}</td>
                    <td>{row.employeeId}</td>
                    <td>{row.employeeName}</td>

                    {/* MONTH CELLS */}
                    {row.targetMonthList.map((month, j) => (
                      <td key={j}>
                        <a
                          href={`/workPlan/view/${month.targetMonth}/${row.companyId}/${row.groupId}/${row.employeeId}`}
                          style={{ fontSize: "200%", color: "#0E7AC4" }}
                        >
                          <i
                            className="fa fa-calendar "
                            style={{ color: "#F5A623" }}
                          />
                        </a>
                      </td>
                    ))}
                  </tr>
                ))}

                {gridData.length === 0 && (
                  <tr>
                    <td colSpan="20" className="text-center text-muted py-3">
                      データがありません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      <UniversalModal
        visible={modalVisible}
        title="確認"
        message="来年の勤務予定を自動作成します。この操作は１時間以上かかる場合があります。"
        confirmText="更新"
        cancelText="キャンセル"
        confirmColor="btn-primary"
        cancelColor="btn-default"
        iconClass="fa fa-info-circle"
        onConfirm={confirmCreateYear}
        onCancel={() => setModalVisible(false)}
      />
    </OwnerLayout>
  );
}
