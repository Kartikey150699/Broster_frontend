import React, { useEffect } from "react";

// MOCK DATA (replace with backend later)
const mockPrintData = {
  employeeName: "カルティケ",
  monthlyWorkDtoList: [
    {
      targetMonth: "2025/12",
      workdayCount: 0,
      restCount: 0,
      upperWorkDtoList: {
        1: { day: "16", week: "(月)", startTime: "08:01", endTime: "17:09", workStatus: "", workTime: "" },
        2: { day: "17", week: "(火)", startTime: "08:09", endTime: "17:04", workStatus: "", workTime: "" },
        3: { day: "18", week: "(水)", startTime: "08:50", endTime: "18:09", workStatus: "", workTime: "" },
        4: { day: "19", week: "(木)", startTime: "09:01", endTime: "19:09", workStatus: "", workTime: "" },
        5: { day: "20", week: "(金)", startTime: "09:08", endTime: "17:11", workStatus: "", workTime: "" },
        6: { day: "21", week: "(土)", startTime: "", endTime: "", workStatus: "", workTime: "" },
        7: { day: "22", week: "(日)", startTime: "", endTime: "", workStatus: "", workTime: "" },
        8: { day: "23", week: "(月)", startTime: "09:01", endTime: "18:04", workStatus: "", workTime: "" },
        9: { day: "24", week: "(火)", startTime: "09:04", endTime: "18:02", workStatus: "", workTime: "" },
        10: { day: "25", week: "(水)", startTime: "09:02", endTime: "19:03", workStatus: "", workTime: "" },
        11: { day: "26", week: "(木)", startTime: "09:08", endTime: "17:08", workStatus: "", workTime: "" },
        12: { day: "27", week: "(金)", startTime: "08:09", endTime: "17:01", workStatus: "", workTime: "" },
        13: { day: "28", week: "(土)", startTime: "", endTime: "", workStatus: "", workTime: "" },
        14: { day: "29", week: "(日)", startTime: "", endTime: "", workStatus: "", workTime: "" },
        15: { day: "30", week: "(月)", startTime: "09:11", endTime: "18:12", workStatus: "", workTime: "" },
        16: { day: "31", week: "(火)", startTime: "09:02", endTime: "17:11", workStatus: "", workTime: "" },
      },
    },
  ],
};

// Generate day cells
const getDayCells = (dto, start, end) => {
  const list = dto.upperWorkDtoList;
  const cells = [];

  for (let day = start; day <= end; day++) {
    const d = list[day];
    cells.push(
      <td key={day} className="date">
        <div className="cell-container">
          {d ? (
            <>
              <div className="line1">{d.day}{d.week}</div>
              <div className="line2">{d.startTime || "-"} - {d.endTime || "-"}</div>
              <div className="line3">{d.workStatus} {d.workTime}</div>
            </>
          ) : (
            <>
              <div className="line1">&nbsp;</div>
              <div className="line2">&nbsp;</div>
              <div className="line3">&nbsp;</div>
            </>
          )}
        </div>
      </td>
    );
  }
  return cells;
};

export default function AttendanceBookOutputShow() {

  useEffect(() => {
    document.title = "出勤簿出力";
  }, []);

  const data = mockPrintData;

  return (
    <div style={{ padding: 20 }}>
      <style>{`
        
        table { 
          border-collapse: collapse;
          margin: auto;
        }

        th, td { 
          border: 1px solid black; 
          font-size: 11px;
          padding: 2px;
        }

        /* HEADER MAIN COLOR */
        th.head {
          background: #0E7AC4;
          color: white;
          text-align: center;
          font-size: 11px;
        }

        /* LEFT MONTH COLUMN */
        td.targetDate {
          background: #0E7AC4;
          color: white;
          font-weight: bold;
          width: 95px;
          text-align: center;
        }

        /* NORMAL CELLS */
        td.date {
          width: 90px;
          height: 130px;
          padding: 0;
          vertical-align: top;
        }

        .cell-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 125px;
          padding: 4px;
          text-align: right;
          line-height: 12px;
        }

        .line1 { font-weight: bold; }
        .line2 { font-size: 10px; }
        .line3 { font-size: 10px; }

        .fixed-col {
        width: 90px !important;
        min-width: 90px !important;
        max-width: 90px !important;
        }

      `}</style>

      {/* EMPLOYEE NAME */}
      <p style={{ fontSize: 14, marginBottom: 10 }}>
        <b>従業員名：</b> {data.employeeName}
      </p>

      {/* HEADER */}
      <table style={{ width: "1200px" }}>
        <thead>
          <tr>
            <th className="head" style={{ width: "95px" }}>対象<br/>年月</th>
            <th className="head" style={{ width: "930px" }}>日付</th>
            <th className="head fixed-col">出勤<br/>日数</th>
            <th className="head fixed-col">欠勤<br/>日数</th>
          </tr>
        </thead>
      </table>

      {/* MAIN TABLE */}
      <table style={{ width: "1200px" }}>
        <tbody>
          {data.monthlyWorkDtoList.map((dto, index) => (
            <React.Fragment key={index}>
              <tr>
                {/* LEFT MONTH */}
                <td className="targetDate" rowSpan={3}>{dto.targetMonth}</td>

                {/* DAYS 1–11 */}
                {getDayCells(dto, 1, 11)}

                {/* WORKDAY & REST — PERFECT alignment */}
                <td rowSpan={3} align="center" className="fixed-col">
                  {dto.workdayCount}
                </td>
                <td rowSpan={3} align="center" className="fixed-col">
                  {dto.restCount}
                </td>
              </tr>

              {/* DAYS 12–22 */}
              <tr>{getDayCells(dto, 12, 22)}</tr>

              {/* DAYS 23–31 */}
              <tr>{getDayCells(dto, 23, 31)}</tr>

            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}