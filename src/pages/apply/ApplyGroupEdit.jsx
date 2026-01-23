import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import CommonButton from "../../components/CommonButton";

export default function ApplyGroupEdit() {
  const navigate = useNavigate();
  const { applyGroupId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // =============================
  // Test data (static dummy)
  // =============================

  // Employees for dropdown
  const TEST_EMPLOYEE_MAP = {
    E001: "田中太郎",
    E002: "佐藤花子",
    E003: "山本一郎",
    E004: "鈴木健太",
  };

  // Pretend this is loaded from backend
  const TEST_GROUP_DATA = {
    applyGroupName: "test2",
    detailList: [
      {
        priority: "1",
        employeeId: "E001",
        applyLevel: "2",
        allApplyFlag: "0",
      },
      {
        priority: "2",
        employeeId: "E002",
        applyLevel: "1",
        allApplyFlag: "1",
      },
      {
        priority: "3",
        employeeId: "",
        applyLevel: "1",
        allApplyFlag: "0",
      },
    ],
  };

  // =============================
  // React states
  // =============================
  const [groupName, setGroupName] = useState("");
  const [employeeMap] = useState(TEST_EMPLOYEE_MAP);

  const [rows, setRows] = useState([]);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // =============================
  // Load initial dummy data
  // =============================
  useEffect(() => {
    loadDummyData();
  }, []);

  const loadDummyData = () => {
    setGroupName(TEST_GROUP_DATA.applyGroupName);

    let baseRows = TEST_GROUP_DATA.detailList.map((r) => ({
      priority: r.priority,
      employeeId: r.employeeId,
      applyLevel: r.applyLevel,
      allApplyFlag: r.allApplyFlag,
    }));

    // Always 10 rows
    while (baseRows.length < 10) {
      baseRows.push({
        priority: String(baseRows.length + 1),
        employeeId: "",
        applyLevel: "1",
        allApplyFlag: "0",
      });
    }

    setRows(baseRows);
  };

  // =============================
  // Update row helper
  // =============================
  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // =============================
  // Update (dummy)
  // =============================
  const handleUpdate = () => {
    setInfoMessages(["（テスト）承認グループを更新しました。"]);
    console.log("UPDATED PAYLOAD:", { groupName, rows });

    setTimeout(() => navigate("/apply-group/list"), 2000);
  };

  // =============================
  // Delete (dummy)
  // =============================
  const handleDelete = () => {
    // show delete notification immediately
    setInfoMessages(["（テスト）承認グループを削除しました。"]);
    console.log("DELETED GROUP ID:", applyGroupId);

    // redirect after short delay
    setTimeout(() => navigate("/apply-group/list"), 2000);
  };

  return (
    <OwnerLayout title="承認グループ更新">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 承認グループ更新
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* GROUP NAME */}
      <div className="row row-padding-top-1">
        <div className="col-md-offset-2 col-md-2">
          <label className="input-label">承認グループ名</label>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px 10px" }}>
        <div
          className="col-md-offset-2 col-md-8"
          style={{
            overflowX: "scroll",
            overflowY: "scroll",
            height: "400px",
            padding: 0,
            position: "relative",
          }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-hover"
              style={{ whiteSpace: "nowrap" }}
            >
              <thead>
                <tr className="primary">
                  <th className="text-center" style={headerStyle}>
                    優先度
                  </th>
                  <th className="text-center" style={headerStyle}>
                    従業員名
                  </th>
                  <th className="text-center" style={headerStyle}>
                    承認権限
                  </th>
                  <th className="text-center" style={headerStyle}>
                    一括承認
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    {/* PRIORITY */}
                    <td className="text-center">
                      <select
                        className="form-control"
                        value={row.priority}
                        onChange={(e) =>
                          updateRow(idx, "priority", e.target.value)
                        }
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* EMPLOYEE */}
                    <td className="text-center">
                      <select
                        className="form-control"
                        value={row.employeeId}
                        onChange={(e) =>
                          updateRow(idx, "employeeId", e.target.value)
                        }
                      >
                        <option value="">未設定</option>
                        {Object.entries(employeeMap).map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* APPLY LEVEL */}
                    <td className="text-center">
                      <select
                        className="form-control"
                        value={row.applyLevel}
                        onChange={(e) =>
                          updateRow(idx, "applyLevel", e.target.value)
                        }
                      >
                        <option value="1">必須承認</option>
                        <option value="2">任意承認</option>
                      </select>
                    </td>

                    {/* ALL APPLY FLAG */}
                    <td className="text-center">
                      <label style={{ marginRight: 10 }}>
                        <input
                          type="radio"
                          name={`allApply-${idx}`}
                          value="0"
                          checked={row.allApplyFlag === "0"}
                          onChange={(e) =>
                            updateRow(idx, "allApplyFlag", e.target.value)
                          }
                        />
                        利用不可
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`allApply-${idx}`}
                          value="1"
                          checked={row.allApplyFlag === "1"}
                          onChange={(e) =>
                            updateRow(idx, "allApplyFlag", e.target.value)
                          }
                        />
                        利用可
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="button-row-center" style={{ marginTop: 25 }}>
        <CommonButton
          label="更新"
          icon="pencil"
          size="md"
          onClick={handleUpdate}
          style={{ marginRight: "10px" }}
        />

        <CommonButton
          label="削除"
          icon="trash"
          size="md"
          color="danger"
          onClick={() => setShowDeleteModal(true)}
          style={{ marginRight: "10px" }}
        />

        <CommonButton
          label="戻る"
          icon="ban"
          size="md"
          onClick={() => navigate("/apply-group/list")}
        />
      </div>

      <UniversalModal
        visible={showDeleteModal}
        title="確認"
        message="承認グループを削除しますか？"
        confirmText="削除"
        cancelText="キャンセル"
        confirmColor="btn-danger"
        onConfirm={() => {
          setShowDeleteModal(false);
          handleDelete(); // perform delete
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </OwnerLayout>
  );
}

const headerStyle = {
  width: "20%",
  position: "sticky",
  top: 0,
  background: "#0E7AC4",
  color: "white",
  zIndex: 3,
};
