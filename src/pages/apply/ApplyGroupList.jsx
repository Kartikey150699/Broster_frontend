import { useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";

export default function ApplyGroupList() {
  const [selectedGroup, setSelectedGroup] = useState("");

  // Dummy sample groups
  const groupOptions = [
    { id: "G001", name: "総務グループ" },
    { id: "G002", name: "人事グループ" },
    { id: "G003", name: "経理グループ" },
  ];

  // Dummy sample table rows
  const sampleRows = [
    {
      applyGroupId: "G001",
      applyGroupName: "総務グループ",
      employeeId: "E001",
      employeeName: "田中太郎",
      mailAddress: "tanaka@example.com",
      priority: "1",
      applyLevel: 1,
      applyLevelLabel: "承認者",
      allApplyLabel: "〇",
      createDate: "2024/01/05"
    },
    {
      applyGroupId: "G002",
      applyGroupName: "人事グループ",
      employeeId: "E002",
      employeeName: "佐藤花子",
      mailAddress: "sato@example.com",
      priority: "2",
      applyLevel: 2,
      applyLevelLabel: "確認者",
      allApplyLabel: "×",
      createDate: "2024/01/10"
    }
  ];

  // Filter table by dropdown
  const filteredRows =
    selectedGroup === ""
      ? sampleRows
      : sampleRows.filter((row) => row.applyGroupId === selectedGroup);

  return (
    <OwnerLayout title="承認グループ一覧">

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 承認グループ一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FILTER + CREATE BUTTON */}
      <div className="row row-padding-top-1">

        {/* FILTER */}
        <div className="col-sm-8 col-md-8">
          <div className="form-inline">
            <label className="input-label" style={{ marginRight: 8 }}>
              承認グループ名
            </label>

            <select
              className="form-control"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">-- 未選択 --</option>
              {groupOptions.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CREATE BUTTON */}
        <div className="col-sm-4 col-md-4 text-right">
          <a href="/apply-group/create" className="btn btn-primary">
            <i className="fa fa-plus fa-fw"></i> 承認グループ登録
          </a>
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px 10px" }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "scroll",
            padding: 0,
            height: "500px",
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
                  <th className="text-center primary" style={{ width: "10%" }}>承認グループ名</th>
                  <th className="text-center primary" style={{ width: "8%" }}>従業員ID</th>
                  <th className="text-center primary" style={{ width: "10%" }}>従業員名</th>
                  <th className="text-center primary" style={{ width: "15%" }}>メールアドレス</th>
                  <th className="text-center primary" style={{ width: "8%" }}>優先度</th>
                  <th className="text-center primary" style={{ width: "10%" }}>承認権限</th>
                  <th className="text-center primary" style={{ width: "8%" }}>一括承認</th>
                  <th className="text-center primary" style={{ width: "10%" }}>登録日</th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      データがありません
                    </td>
                  </tr>
                )}

                {filteredRows.map((row, idx) => (
                  <tr key={idx} className="text-center">

                    {/* Group Name (Clickable link like JSP) */}
                    <td>
                      <a href={`/apply-group/edit/${row.applyGroupId}`}>
                        {row.applyGroupName}
                      </a>
                    </td>

                    <td>{row.employeeId}</td>
                    <td>{row.employeeName}</td>
                    <td>{row.mailAddress}</td>
                    <td>{row.priority}</td>

                    {/* Approval Level Badge */}
                    <td>
                      {row.applyLevel === 1 && (
                        <span className="label label-danger" style={{ fontSize: 12 }}>
                          {row.applyLevelLabel}
                        </span>
                      )}
                      {row.applyLevel === 2 && (
                        <span className="label label-info" style={{ fontSize: 12 }}>
                          {row.applyLevelLabel}
                        </span>
                      )}
                    </td>

                    <td>{row.allApplyLabel}</td>
                    <td>{row.createDate}</td>
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