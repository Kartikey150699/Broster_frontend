import { useState, useEffect } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import CommonButton from "../../components/CommonButton";

export default function StatusList() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // MOCK GROUPS
  const mockGroupIdMap = {
    G001: "営業部",
    G002: "開発部",
    G003: "総務部",
  };

  // MOCK TABLE DATA
  const mockShowList = [
    {
      groupName: "営業部",
      employeeId: "E001",
      employeeName: "田中 太郎",
      targetDate: "2025/02/01",
      companyId: "C01",
      groupId: "G001",
      startTime: "09:00",
      endTime: "18:00",
      applyRequestLabel: "遅刻申請（09:30〜10:00）",
    },
    {
      groupName: "開発部",
      employeeId: "E002",
      employeeName: "山田 花子",
      targetDate: "2025/02/01",
      companyId: "C01",
      groupId: "G002",
      startTime: "08:50",
      endTime: "17:40",
      applyRequestLabel: "",
    },
  ];

  // SEARCH STATE
  const [groupId, setGroupId] = useState("");

  // Convert YYYY-MM-DD to YYYY年MM月
  const formatMonthLabel = () => {
    if (!targetDate) return "--";
    const [y, m] = targetDate.split("-");
    return `${y}年${m}月`;
  };

  // DEFAULT: today
  const getToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [targetDate, setTargetDate] = useState(getToday());
  const monthLabel = formatMonthLabel();

  // Auto clear messages
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const t = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [infoMessages, errorMessages]);

  const handleSearch = () => {
    setInfoMessages(["検索しました（モック）"]);
  };

  const handleCsv = (type) => {
    setInfoMessages([`${type} CSVダウンロード（モック）`]);
  };

  return (
    <OwnerLayout title="勤務状況照会">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* Title */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-users fa-fw"></i>勤務状況照会
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH FORM BLOCK */}
      <div className="form-horizontal" id="form1">
        <input type="hidden" name="targetMonth" value="" />

        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="row">
              {/* LEFT BLOCK */}
              <div className="col-xs-12 col-sm-5 col-md-5">
                <div className="form-inline">
                  {/* グループ名 */}
                  <label className="input-label">グループ名</label>

                  <select
                    className="form-control"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    style={{ width: 150, marginLeft: 4 }}
                  >
                    <option value="">未選択</option>
                    {Object.entries(mockGroupIdMap).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </select>

                  {/* 日付 */}
                  <label className="input-label" style={{ paddingLeft: 10 }}>
                    日付
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    style={{ width: 120, marginLeft: 4 }}
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />

                  {/* 検索 */}
                  <CommonButton
                    label="検索"
                    icon="search"
                    onClick={handleSearch}
                    style={{ marginLeft: 6 }}
                  />
                </div>
              </div>

              {/* RIGHT BLOCK — CSV Buttons */}
              <div className="col-xs-12 col-sm-7 col-md-7 text-right">
                <div className="form-inline csv-buttons">
                  {/* Label */}
                  <label className="input-label csv-label">
                    ダウンロード：{monthLabel}　
                  </label>

                  {/* 社員CSV */}
                  <CommonButton
                    label="社員CSV"
                    icon="file-text-o"
                    onClick={() => handleCsv("社員")}
                  />

                  {/* パートCSV */}
                  <CommonButton
                    label="パートCSV"
                    icon="file-text-o"
                    onClick={() => handleCsv("パート")}
                    style={{ marginLeft: 6 }}
                  />

                  {/* 残業CSV */}
                  <CommonButton
                    label="残業CSV"
                    icon="file-text-o"
                    onClick={() => handleCsv("残業")}
                    style={{ marginLeft: 6 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE AREA */}
      <div className="row row-padding-top-1" style={{ padding: "10px" }}>
        <div
          className="status-table-wrapper col-md-12"
          style={{ overflowX: "scroll", height: 500, padding: "0" }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-hover"
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
                    style={{
                      width: "25%",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      background: "#0E7AC4",
                      color: "white",
                    }}
                  >
                    グループ名
                  </th>
                  <th
                    className="text-center primary"
                    style={{
                      width: "10%",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      background: "#0E7AC4",
                      color: "white",
                    }}
                  >
                    従業員ID
                  </th>
                  <th
                    className="text-center primary"
                    style={{
                      width: "20%",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      background: "#0E7AC4",
                      color: "white",
                    }}
                  >
                    従業員名
                  </th>
                  <th
                    className="text-center primary"
                    style={{
                      width: "10%",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      background: "#0E7AC4",
                      color: "white",
                    }}
                  >
                    出勤時間
                  </th>
                  <th
                    className="text-center primary"
                    style={{
                      width: "10%",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      background: "#0E7AC4",
                      color: "white",
                    }}
                  >
                    退勤時間
                  </th>
                  <th
                    className="text-center primary"
                    style={{
                      width: "25%",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      background: "#0E7AC4",
                      color: "white",
                    }}
                  >
                    勤務申請
                  </th>
                </tr>
              </thead>

              <tbody>
                {mockShowList.map((e, index) => (
                  <tr key={index} className="text-center">
                    <td>{e.groupName}</td>
                    <td>{e.employeeId}</td>
                    <td>
                      <a
                        href={`/result/showJisseki/${e.targetDate}/${e.companyId}/${e.groupId}/${e.employeeId}`}
                      >
                        {e.employeeName}
                        <i className="fa fa-pencil-square-o fa-fw" />
                      </a>
                    </td>
                    <td>{e.startTime}</td>
                    <td>{e.endTime}</td>
                    <td className="text-left">{e.applyRequestLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
