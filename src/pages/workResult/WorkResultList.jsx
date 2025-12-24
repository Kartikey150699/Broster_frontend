import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import CommonButton from "../../components/CommonButton";

export default function WorkResultList() {
  const navigate = useNavigate();

  // ------------------------------------------------------
  // YEAR RANGE
  // ------------------------------------------------------
  const now = new Date();
  const currentYear = now.getFullYear();

  const yearOptions = [];
  for (let y = currentYear - 6; y <= currentYear + 1; y++) {
    yearOptions.push(String(y));
  }

  // ------------------------------------------------------
  // Build 12 months (YYYYMM)
  // ------------------------------------------------------
  const buildMonthList = (year) => {
    return Array.from({ length: 12 }, (_, i) => {
      const mm = String(i + 1).padStart(2, "0");
      return `${year}${mm}`;
    });
  };

  // ------------------------------------------------------
  // MOCK DATA (Icons ALWAYS stay same)
  // ------------------------------------------------------
  const mockRows = [
    {
      companyId: "C01",
      groupId: "G01",
      groupName: "営業部",
      employeeId: "0001",
      employeeName: "田中 太郎",
      targetMonthList: {
        202401: true,
        202402: false,
        202403: true,
        202404: false,
      },
    },
    {
      companyId: "C01",
      groupId: "G02",
      groupName: "開発部",
      employeeId: "0002",
      employeeName: "山田 花子",
      targetMonthList: {
        202401: false,
        202402: true,
        202403: false,
        202404: true,
      },
    },
    {
      companyId: "C02",
      groupId: "G03",
      groupName: "総務部",
      employeeId: "0003",
      employeeName: "佐藤 次郎",
      targetMonthList: {
        202401: true,
        202402: true,
        202403: false,
        202404: false,
      },
    },
  ];

  // ------------------------------------------------------
  // STATES
  // ------------------------------------------------------
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [targetYear, setTargetYear] = useState(String(currentYear));
  const [tableHeaderList, setTableHeaderList] = useState(
    buildMonthList(currentYear)
  );

  const [targetMonth, setTargetMonth] = useState(`${currentYear}01`);
  const [resultList] = useState(mockRows);

  const [showFixModal, setShowFixModal] = useState(false);

  // ------------------------------------------------------
  // Auto-hide notifications
  // ------------------------------------------------------
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // ------------------------------------------------------
  // Year change
  // ------------------------------------------------------
  useEffect(() => {
    setTableHeaderList(buildMonthList(targetYear));
    setTargetMonth(`${targetYear}01`);
  }, [targetYear]);

  // ------------------------------------------------------
  // SEARCH (Mock)
  // ------------------------------------------------------
  const handleSearch = () => {
    setInfoMessages(["検索しました。（モック）"]);
  };

  // ------------------------------------------------------
  // BULK FIX (Mock)
  // ------------------------------------------------------
  const handleBulkFix = () => {
    setShowFixModal(false);
    setInfoMessages([`「${targetMonth}」の一括締めを実行しました。（モック）`]);
  };

  // ------------------------------------------------------
  // Navigate detail
  // ------------------------------------------------------
  const openResultDetail = (m, companyId, groupId, employeeId) => {
    navigate(`/result/showJisseki/${m}/${companyId}/${groupId}/${employeeId}`);
  };

  // ------------------------------------------------------
  // UI RENDER
  // ------------------------------------------------------
  return (
    <OwnerLayout title="勤務実績一覧">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-clock-o fa-fw"></i> 勤務実績一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="row row-padding-top-1">
        {/* YEAR */}
        <div className="col-md-6 form-inline">
          <select
            className="form-control"
            value={targetYear}
            onChange={(e) => setTargetYear(e.target.value)}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}年
              </option>
            ))}
          </select>

          <CommonButton
            icon="search"
            label="検索"
            onClick={handleSearch}
            style={{ marginLeft: 10 }}
          />
        </div>

        {/* MONTH */}
        <div className="col-md-6 text-right form-inline">
          <select
            className="form-control"
            value={targetMonth}
            onChange={(e) => setTargetMonth(e.target.value)}
          >
            {tableHeaderList.map((m) => (
              <option key={m} value={m}>
                {m.slice(0, 4)}/{m.slice(4)}
              </option>
            ))}
          </select>

          <CommonButton
            icon="check"
            label="一括締め"
            onClick={() => setShowFixModal(true)}
            style={{ marginLeft: 10 }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-2" style={{ padding: "10px" }}>
        <div
          className="col-md-12"
          style={{ overflowX: "scroll", height: 500, padding: 0 }}
        >
          <table
            className="table table-bordered table-condensed table-hover"
            style={{ whiteSpace: "nowrap" }}
          >
            <thead>
              <tr className="primary">
                <th className="text-center">グループ名</th>
                <th className="text-center">従業員ID</th>
                <th className="text-center">従業員名</th>

                {tableHeaderList.map((m) => (
                  <th key={m} className="text-center primary">
                    {m.slice(0, 4)} <br /> {m.slice(4)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {resultList.map((row, idx) => (
                <tr key={idx} className="text-center">
                  <td>{row.groupName}</td>
                  <td>{row.employeeId}</td>
                  <td>{row.employeeName}</td>

                  {tableHeaderList.map((m) => {
                    const fixed = row.targetMonthList[m] === true;

                    return (
                      <td key={m}>
                        <span
                          style={{
                            cursor: "pointer",
                            fontSize: "190%",
                            color: "#f0ad4e",
                          }}
                          onClick={() =>
                            openResultDetail(
                              m,
                              row.companyId,
                              row.groupId,
                              row.employeeId
                            )
                          }
                        >
                          {fixed ? (
                            <i className="fa fa-lock"></i>
                          ) : (
                            <i className="fa fa-calendar"></i>
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <UniversalModal
        visible={showFixModal}
        title="確認"
        message={
          <>
            指定月の月締めを行います。
            <br />
            この操作は１時間程度かかる場合があります。
          </>
        }
        confirmText="更新"
        cancelText="キャンセル"
        confirmColor="btn-primary"
        cancelColor="btn-default"
        iconClass="fa fa-info-circle"
        onConfirm={handleBulkFix}
        onCancel={() => setShowFixModal(false)}
      />
    </OwnerLayout>
  );
}
