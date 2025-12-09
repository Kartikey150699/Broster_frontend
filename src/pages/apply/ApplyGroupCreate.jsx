import { useEffect, useState } from "react";
import axios from "axios";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";

export default function ApplyGroupCreate() {
  const companyId = "11018"; // TODO: replace with real companyId from login session

  const [groupName, setGroupName] = useState("");

  const [rows, setRows] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      priority: String(i + 1),
      employeeId: "",
      applyLevel: "1",
      allApplyFlag: "0",
    }))
  );

  const [employeeMap, setEmployeeMap] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ===============================
  // Load employee list
  // ===============================
  useEffect(() => {
    fetchEmployeeMap();
  }, []);

  const fetchEmployeeMap = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8081/broster/v2/api/employee/getEmployeeList",
        { companyId }
      );

      setEmployeeMap(res.data.employeeMap || {});
    } catch (err) {
      console.error(err);
      setErrorMsg("従業員一覧の取得に失敗しました。");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  // ===============================
  // Update row value
  // ===============================
  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // ===============================
  // Handle Create
  // ===============================
  const handleCreate = async () => {
    if (!groupName.trim()) {
      setErrorMsg("承認グループ名を入力してください。");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    const payload = {
      applyGroupCreateDetailInfoDtoList: rows.map((r) => ({
        companyId,
        applyGroupId: "",
        applyGroupName: groupName,
        applyEmployeeId: r.employeeId,
        applyLevel: r.applyLevel,
        requestPriority: r.priority,
        allApplyFlag: r.allApplyFlag,
      })),
    };

    try {
      await axios.post(
        "http://localhost:8081/broster/v2/api/applyGroup/create",
        payload
      );

      setSuccessMsg("承認グループを登録しました。");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error(err);
      setErrorMsg("登録に失敗しました。");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  return (
    <OwnerLayout title="承認グループ登録">

    {/* Notification Bar */}
    <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 承認グループ登録
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
            position: "relative"
          }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-hover"
              style={{ whiteSpace: "nowrap" }}
            >
              <thead>
                <tr className="primary">
                    <th
                    className="text-center"
                    style={{
                        width: "15%",
                        position: "sticky",
                        top: 0,
                        background: "#0E7AC4",
                        color: "white",
                        zIndex: 3,
                    }}
                    >
                    優先度
                    </th>

                    <th
                    className="text-center"
                    style={{
                        width: "45%",
                        position: "sticky",
                        top: 0,
                        background: "#0E7AC4",
                        color: "white",
                        zIndex: 3,
                    }}
                    >
                    従業員名
                    </th>

                    <th
                    className="text-center"
                    style={{
                        width: "20%",
                        position: "sticky",
                        top: 0,
                        background: "#0E7AC4",
                        color: "white",
                        zIndex: 3,
                    }}
                    >
                    承認権限
                    </th>

                    <th
                    className="text-center"
                    style={{
                        width: "20%",
                        position: "sticky",
                        top: 0,
                        background: "#0E7AC4",
                        color: "white",
                        zIndex: 3,
                    }}
                    >
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
      <div className="text-center" style={{ marginTop: 20 }}>
        <button className="btn btn-primary" onClick={handleCreate}>
          <i className="fa fa-plus fa-fw"></i> 登録
        </button>

        <a
          href="/apply-group/list"
          className="btn btn-default"
          style={{ marginLeft: 10 }}
        >
          <i className="fa fa-chevron-left fa-fw"></i> 戻る
        </a>
      </div>

    </OwnerLayout>
  );
}
