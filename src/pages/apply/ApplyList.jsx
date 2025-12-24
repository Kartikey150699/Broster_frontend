import { useState, useEffect } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import CommonButton from "../../components/CommonButton";

export default function ApplyList() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);

  // ================
  // MOCK SEARCH FIELDS
  // ================
  const [applyCode, setApplyCode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusGroup, setStatusGroup] = useState("");

  // ================
  // MOCK LOOKUP MAPS
  // ================
  const mockApplyCodeMap = {
    100: "有給休暇（全日）",
    110: "有給休暇（半日）",
    120: "慶弔休暇",
    130: "欠勤",
    140: "直行",
    150: "直帰",
    160: "直行直帰",
    170: "出張",
    180: "遅刻",
    190: "早退",
    200: "振替休日",
    210: "早出",
  };

  const mockStatusMap = {
    0: "承認待ち",
    1: "承認済み",
    9: "否認",
  };

  // ================
  // MOCK TABLE DATA
  // ================
  const mockRows = [
    {
      requestId: "R001",
      applyRequestDate: "2025/01/12",
      groupName: "営業部",
      employeeName: "田中 太郎",
      applyCode: "100",
      applyCodeLabel: "有休申請",
      requestDateFrom: "2025/02/01",
      requestDateTo: "2025/02/01",
      requestBikoShort: "私用のため",
      requestTimeFrom: "",
      requestTimeTo: "",
      applyStatus: "0",
      applyStatusLabel: "承認待ち",
      detailDtoList: [
        {
          employeeName: "上司1",
          detailApplyStatus: 0,
          detailApplyStatusLabel: "承認待ち",
          applyLevel: 1,
        },
        {
          employeeName: "上司2",
          detailApplyStatus: 1,
          detailApplyStatusLabel: "承認済み",
          applyLevel: 2,
        },
      ],
    },
    {
      requestId: "R002",
      applyRequestDate: "2025/01/20",
      groupName: "開発部",
      employeeName: "山田 花子",
      applyCode: "200",
      applyCodeLabel: "遅刻申請",
      requestDateFrom: "2025/02/05",
      requestDateTo: "2025/02/05",
      requestBikoShort: "電車遅延",
      requestTimeFrom: "09:00",
      requestTimeTo: "10:00",
      applyStatus: "1",
      applyStatusLabel: "承認済み",
      detailDtoList: [
        {
          employeeName: "上司1",
          detailApplyStatus: 1,
          detailApplyStatusLabel: "承認済み",
          applyLevel: 1,
        },
      ],
    },
    {
      requestId: "R003",
      applyRequestDate: "2025/01/25",
      groupName: "総務部",
      employeeName: "佐藤 健",
      applyCode: "300",
      applyCodeLabel: "早退申請",
      requestDateFrom: "2025/02/07",
      requestDateTo: "2025/02/07",
      requestBikoShort: "通院のため",
      requestTimeFrom: "",
      requestTimeTo: "",
      applyStatus: "9",
      applyStatusLabel: "否認",
      detailDtoList: [
        {
          employeeName: "上司1",
          detailApplyStatus: 9,
          detailApplyStatusLabel: "否認",
          applyLevel: 1,
        },
      ],
    },
  ];

  // Hide messages automatically
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
    <OwnerLayout title="勤務申請一覧">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 勤務申請一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="row row-padding-top-1">
        <div className="col-sm-10">
          <div className="form-inline">
            {/* 申請項目 */}
            <label className="input-label">申請項目</label>
            <select
              className="form-control"
              value={applyCode}
              onChange={(e) => setApplyCode(e.target.value)}
              style={{ marginLeft: 10 }}
            >
              <option value="">-- 未選択 --</option>
              {Object.entries(mockApplyCodeMap).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            {/* 日付 */}
            <label className="input-label" style={{ paddingLeft: 15 }}>
              日付
            </label>
            <input
              type="date"
              className="form-control"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={{ width: 140, marginLeft: 10 }}
            />
            〜
            <input
              type="date"
              className="form-control"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              style={{ width: 140, marginLeft: 10 }}
            />
            {/* 承認状況 */}
            <label className="input-label" style={{ paddingLeft: 16 }}>
              承認状況
            </label>
            <select
              className="form-control"
              value={statusGroup}
              onChange={(e) => setStatusGroup(e.target.value)}
            >
              <option value="">-- 未選択 --</option>
              {Object.entries(mockStatusMap).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            <CommonButton
              label="検索"
              icon="search"
              type="search"
              size="md"
              style={{ marginLeft: 10 }}
              onClick={() => setInfoMessages(["検索しました（モック）"])}
            />
          </div>
        </div>

        {/* 申請登録 */}
        <div className="col-sm-2 text-right mobile-button-col">
          <CommonButton
            label="申請登録"
            icon="plus"
            size="md"
            onClick={() => (window.location.href = "/apply/create")}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: 10 }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "auto",
            height: 500,
            padding: 0,
            position: "relative",
          }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed table-hover"
              style={{ whiteSpace: "nowrap", width: "100%" }}
            >
              <thead>
                <tr className="primary">
                  {[
                    "申請日",
                    "グループ",
                    "従業員名",
                    "申請項目",
                    "開始日",
                    "終了日",
                    "申請理由",
                    "申請時間",
                    "承認状況",
                    "申請修正",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="text-center primary"
                      style={{
                        width: "10%",
                        position: "sticky",
                        top: 0,
                        background: "#0E7AC4",
                        color: "white",
                        zIndex: 5,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {mockRows.map((e, idx) => (
                  <tr key={idx} className="text-center">
                    <td>{e.applyRequestDate}</td>
                    <td>{e.groupName}</td>
                    <td>{e.employeeName}</td>
                    <td>{e.applyCodeLabel}</td>
                    <td>{e.requestDateFrom}</td>
                    <td>{e.requestDateTo}</td>
                    <td className="text-left">{e.requestBikoShort}</td>

                    <td>
                      {e.requestTimeFrom !== "" &&
                        `${e.requestTimeFrom}〜${e.requestTimeTo}`}
                    </td>

                    {/* 承認状況 */}
                    <td>
                      <button
                        className={`label ${
                          e.applyStatus === "0"
                            ? "label-info"
                            : e.applyStatus === "1"
                              ? "label-default"
                              : "label-danger"
                        }`}
                        style={{ fontSize: 12, cursor: "pointer" }}
                        onClick={() => setDetailTarget(e.requestId)}
                      >
                        {e.applyStatusLabel}
                      </button>
                    </td>

                    {/* 更新・削除 */}
                    <td>
                      <a href={`/apply/edit/${e.requestId}`}>
                        <i className="fa fa-pencil-square-o"></i> 更新
                      </a>

                      <a
                        href="#"
                        style={{ marginLeft: 8 }}
                        onClick={(ev) => {
                          ev.preventDefault();
                          setDeleteTarget(e.requestId);
                        }}
                      >
                        削除
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UniversalModal
        visible={!!deleteTarget}
        title="確認"
        message="この申請削除しますか？"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          window.location.href = `/apply/delete/${deleteTarget}`;
        }}
      />
      <UniversalModal
        visible={!!detailTarget}
        mode="details"
        title="承認状況詳細"
        detailList={
          mockRows.find((row) => row.requestId === detailTarget)
            ?.detailDtoList || []
        }
        onCancel={() => setDetailTarget(null)}
      />
    </OwnerLayout>
  );
}
