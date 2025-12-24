import { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import axios from "axios";
import CommonButton from "../../components/CommonButton";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // -------------------------------
  // Load on mount
  // -------------------------------
  useEffect(() => {
    loadEmployeeList();
  }, []);

  // -------------------------------
  // Load employees from API (mock for now)
  // -------------------------------
  const loadEmployeeList = async () => {
    try {
      // TODO: replace with real API
      // const res = await axios.post("http://localhost:8081/broster/v2/api/employee/list", { companyId: "11018" });

      // Temporary sample data
      const MOCK = [
        {
          companyId: "11018",
          employeeId: "E001",
          employeeName: "田中太郎",
          groupId: "G001",
          groupName: "営業部",
          hireDate: "2024/01/01",
          jobTypeLabel: "正社員",
          breakTimeTypeLabel: "60分",
          employeeAddr: "tanaka@example.com",
          employeeStatus: "0",
          employeeStatusLabel: "在籍",
          shiftName: "日勤",
          otherAppId: "EXT001",
          createDatetime: "2024/01/05",
        },
        {
          companyId: "11018",
          employeeId: "E002",
          employeeName: "佐藤花子",
          groupId: "G002",
          groupName: "開発部",
          hireDate: "2024/02/10",
          jobTypeLabel: "パート",
          breakTimeTypeLabel: "45分",
          employeeAddr: "sato@example.com",
          employeeStatus: "1",
          employeeStatusLabel: "休職",
          shiftName: "夜勤",
          otherAppId: "EXT002",
          createDatetime: "2024/02/15",
        },
      ];

      setEmployees(MOCK);

      // Populate group dropdown
      const uniqueGroups = [...new Set(MOCK.map((e) => e.groupId))].map(
        (id) => ({
          key: id,
          value: MOCK.find((e) => e.groupId === id).groupName,
        })
      );

      setGroupOptions(uniqueGroups);
    } catch (err) {
      setErrorMessages(["従業員一覧の取得に失敗しました。"]);
      console.error(err);
    }
  };

  // -------------------------------
  // Filter employees
  // -------------------------------
  const filteredRows =
    selectedGroup === ""
      ? employees
      : employees.filter((e) => e.groupId === selectedGroup);

  // -------------------------------
  // Delete Handler
  // -------------------------------
  const deleteEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      // TODO: API:
      // await axios.delete("http://localhost:8081/broster/v2/api/employee/delete", { data: { companyId: selectedEmployee.companyId, employeeId: selectedEmployee.employeeId }});

      setDeleteModalVisible(false);

      setInfoMessages([
        `従業員「${selectedEmployee.employeeName}」を削除しました。`,
      ]);
      setTimeout(() => setInfoMessages([]), 3000);

      loadEmployeeList();
    } catch (err) {
      setDeleteModalVisible(false);
      setErrorMessages(["削除に失敗しました。"]);
      setTimeout(() => setErrorMessages([]), 3000);
    }
  };

  return (
    <OwnerLayout title="従業員一覧">
      {/* Notification Bar */}
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 従業員一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FILTER + CREATE BUTTON */}
      <div className="row row-padding-top-1">
        <div className="col-sm-8">
          <div className="form-inline">
            <label className="input-label" style={{ marginRight: 8 }}>
              グループ名で絞込み
            </label>

            <select
              className="form-control"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">未選択</option>
              {groupOptions.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-4 text-right">
          <CommonButton
            label="従業員登録"
            icon="plus"
            size="md"
            onClick={() => (window.location.href = "/employee/create")}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px" }}>
        <div
          className="col-md-12"
          style={{ overflowX: "scroll", height: "500px", padding: 0 }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed table-hover"
              style={{ width: "100%", whiteSpace: "nowrap" }}
            >
              <thead>
                <tr className="primary">
                  <th className="text-center" style={{ width: "5%" }}>
                    従業員ID
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    従業員名
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    グループ名
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    入社日
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    雇用形態
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    休憩
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    メールアドレス
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    ステータス
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    個別シフト
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    外部ID
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    登録日
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    操作
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan="12" className="text-center text-muted">
                      データがありません
                    </td>
                  </tr>
                )}

                {filteredRows.map((e, index) => (
                  <tr key={index}>
                    <td className="text-center">{e.employeeId}</td>

                    <td className="text-center">
                      <a
                        href={`/employee/edit/${e.companyId}/${e.groupId}/${e.employeeId}`}
                      >
                        {e.employeeName}
                      </a>
                    </td>

                    <td className="text-center">{e.groupName}</td>
                    <td className="text-center">{e.hireDate}</td>
                    <td className="text-center">{e.jobTypeLabel}</td>
                    <td className="text-center">{e.breakTimeTypeLabel}</td>
                    <td className="text-left">{e.employeeAddr}</td>

                    <td className="text-center">
                      {e.employeeStatus === "0" && (
                        <span className="label label-info">
                          {e.employeeStatusLabel}
                        </span>
                      )}
                      {e.employeeStatus === "1" && (
                        <span className="label label-warning">
                          {e.employeeStatusLabel}
                        </span>
                      )}
                      {e.employeeStatus === "2" && (
                        <span className="label label-default">
                          {e.employeeStatusLabel}
                        </span>
                      )}
                    </td>

                    <td className="text-center">{e.shiftName}</td>
                    <td className="text-center">{e.otherAppId}</td>
                    <td className="text-center">{e.createDatetime}</td>

                    <td className="text-center">
                      <a
                        style={{ paddingRight: 8, cursor: "pointer" }}
                        onClick={() => {
                          setSelectedEmployee(e);
                          setDeleteModalVisible(true);
                        }}
                      >
                        <i className="fa fa-ban fa-fw"></i> 削除
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <UniversalModal
        visible={deleteModalVisible}
        title="削除確認"
        message="従業員を削除しますか？ 削除すると元に戻せません。"
        targetName={selectedEmployee?.employeeName}
        targetId={selectedEmployee?.employeeId}
        confirmText="削除"
        cancelText="キャンセル"
        confirmColor="btn-danger"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={deleteEmployee}
      />
    </OwnerLayout>
  );
}
