import { useState, useEffect } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";

// YEAR LIST
const mockYearList = [2023, 2024, 2025];

// MONTHS
const mockMonthList = [
  "1月","2月","3月","4月","5月","6月",
  "7月","8月","9月","10月","11月","12月"
];

// MOCK DATA
const mockSummaryData = [
  {
    groupName: "営業部",
    employeeName: "田中 太郎",
    summaryMonthlyDto: [
      { attend: 20, holiday: 2 }, { attend: 18, holiday: 3 },
      { attend: 21, holiday: 1 }, { attend: 19, holiday: 2 },
      { attend: 20, holiday: 1 }, { attend: 22, holiday: 0 },
      { attend: 19, holiday: 3 }, { attend: 18, holiday: 2 },
      { attend: 20, holiday: 1 }, { attend: 21, holiday: 0 },
      { attend: 20, holiday: 2 }, { attend: 19, holiday: 1 }
    ],
    attend: 237,
    holiday: 18,
  },
  {
    groupName: "開発部",
    employeeName: "山田 花子",
    summaryMonthlyDto: [
      { attend: 15, holiday: 5 }, { attend: 17, holiday: 3 },
      { attend: 19, holiday: 2 }, { attend: 18, holiday: 1 },
      { attend: 20, holiday: 0 }, { attend: 21, holiday: 1 },
      { attend: 20, holiday: 2 }, { attend: 19, holiday: 1 },
      { attend: 18, holiday: 3 }, { attend: 20, holiday: 0 },
      { attend: 21, holiday: 1 }, { attend: 22, holiday: 0 }
    ],
    attend: 230,
    holiday: 19,
  }
];

export default function SummaryAttendance() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [requestDateFrom, setRequestDateFrom] = useState(null);
  const [requestDateTo, setRequestDateTo] = useState(null);

  const [year, setYear] = useState(2025);
  const [summaryList, setSummaryList] = useState([]);

  // Auto clear notifications
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  // SEARCH
  const handleSearch = () => {
    if (!year) {
      setErrorMessages(["表示年を選択してください。"]);
      return;
    }

    setSummaryList(mockSummaryData);
    setInfoMessages(["検索が完了しました。（モック）"]);
  };

  // DOWNLOAD
  const handleDownload = () => {
    if (!requestDateFrom || !requestDateTo) {
      setErrorMessages(["ダウンロード期間を入力してください。"]);
      return;
    }

    setInfoMessages(["CSV出力しました。（モック）"]);
  };

  // Set default dates on first load
  useEffect(() => {
    const today = new Date();

    // First day of current month (local time)
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    // Format yyyy-mm-dd
    const format = (d) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    setRequestDateFrom(format(firstDay));
    setRequestDateTo(format(today));
    setSummaryList(mockSummaryData);
  }, []);

  return (
    <OwnerLayout title="出勤/休日日数集計">
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2><i className="fa fa-file fa-fw"></i>出勤/休日日数集計</h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="form-horizontal">

        {/* DATE RANGE */}
        <div className="row row-padding-top-1">
          <div className="col-md-2">
            <label className="input-label">ダウンロード期間：</label>
          </div>

          <div className="col-md-8 form-inline">
            <input
              type="date"
              lang="ja"
              className="form-control"
              value={requestDateFrom || ""}
              onChange={(e) => {
                setRequestDateFrom(e.target.value);
                setRequestDateTo(e.target.value);
              }}
            />
            <span> 〜 </span>
            <input
              type="date"
              lang="ja"
              className="form-control"
              value={requestDateTo || ""}
              onChange={(e) => setRequestDateTo(e.target.value)}
            />

            <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={handleDownload}>
              <i className="fa fa-file-text-o"></i> CSV出力
            </button>
          </div>
        </div>

        {/* YEAR */}
        <div className="row row-padding-top-1">
          <div className="col-md-2">
            <label className="input-label">表示年：</label>
          </div>

          <div className="col-md-1">
            <select className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
              {mockYearList.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="col-md-1">
            <button className="btn btn-primary" onClick={handleSearch}>
              <i className="fa fa-search"></i> 検索
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-2" style={{ padding: 10 }}>
        <div className="col-md-12" style={{ overflowX: "scroll", height: 500, padding: 0 }}>

          <table className="table table-bordered table-condensed">
            <thead>

              {/* HEADER 1 */}
              <tr style={{ background: "#0E7AC4", color: "white" }}>
                <th rowSpan={2} className="text-center" style={{ width: 150, position: "sticky", top: 0 }}>
                  グループ名
                </th>
                <th rowSpan={2} className="text-center" style={{ width: 150, position: "sticky", top: 0 }}>
                  従業員
                </th>

                {mockMonthList.map((m, i) => (
                  <th
                    key={i}
                    colSpan={2}
                    className="text-center"
                    style={{ position: "sticky", top: 0 }}
                  >
                    {m}
                  </th>
                ))}

                <th colSpan={2} className="text-center" style={{ position: "sticky", top: 0 }}>
                  合計
                </th>
              </tr>

              {/* HEADER 2 */}
              <tr style={{ background: "#0E7AC4", color: "white" }}>
                {mockMonthList.map((_, i) => (
                  <>
                    <th key={`att-${i}`} className="text-center" style={{ position: "sticky", top: 33 }}>出</th>
                    <th key={`hol-${i}`} className="text-center" style={{ position: "sticky", top: 33 }}>休</th>
                  </>
                ))}
                <th className="text-center" style={{ position: "sticky", top: 33 }}>出</th>
                <th className="text-center" style={{ position: "sticky", top: 33 }}>休</th>
              </tr>
            </thead>

            <tbody>
              {summaryList.map((row, idx) => (
                <tr key={idx} className="text-center">
                  <td>{row.groupName}</td>
                  <td>{row.employeeName}</td>

                  {row.summaryMonthlyDto.map((m, i) => (
                    <>
                      <td key={`att2-${idx}-${i}`}>{m.attend}</td>
                      <td key={`hol2-${idx}-${i}`}>{m.holiday}</td>
                    </>
                  ))}

                  <td>{row.attend}</td>
                  <td>{row.holiday}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </OwnerLayout>
  );
}