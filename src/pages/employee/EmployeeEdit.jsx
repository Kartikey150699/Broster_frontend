import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotificationBar from "../../components/NotificationBar";
import OwnerLayout from "../../layouts/OwnerLayout";

export default function EmployeeEdit() {
  const { companyId, groupId, employeeId } = useParams();
  const navigate = useNavigate();

  // ------------------------
  // STATE
  // ------------------------
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [shiftList, setShiftList] = useState([]);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ------------------------
  // LOAD MOCK DATA (Replace later with API)
  // ------------------------
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // TODO: Replace with real backend response
        const response = {
          employeeId,
          employeeName: "山田太郎",
          employeeAddr: "test@example.com",
          hireDate: "2020/01/01",
          weekWorkDayCount: "5",
          jobType: "1",
          breakTimeType: "1",
          groupId,
          shiftId: "",
          targetDate: "2025/01/01",
          otherAppId: "",
          employeeStatus: "0",
        };

        const groups = [
          { id: "G0001", name: "営業部" },
          { id: "G0002", name: "開発部" },
        ];

        const shifts = [
          { id: "S001", name: "早番" },
          { id: "S002", name: "遅番" },
        ];

        setEmployee(response);
        setGroupList(groups);
        setShiftList(shifts);

      } catch (e) {
        setErrorMessages(["データの取得に失敗しました。"]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ------------------------
  // CHANGE HANDLER
  // ------------------------
  function handleChange(e) {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  }

  // ------------------------
  // UPDATE ACTION (placeholder)
  // ------------------------
  async function handleUpdate() {
    try {
      setInfoMessages([]);
      setErrorMessages([]);

      // TODO replace with axios.post(...)
      console.log("UPDATE SEND:", employee);

      setInfoMessages(["更新が完了しました。"]);

      setTimeout(() => navigate("/employee/list"), 3000);

    } catch (e) {
      setErrorMessages(["更新に失敗しました。"]);
    }
  }

  if (loading) return <OwnerLayout title="従業員更新">読み込み中...</OwnerLayout>;

  // ============================
  //    PAGE UI START
  // ============================
  return (
    <OwnerLayout title="従業員更新">
      
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-pencil fa-fw"></i> 従業員更新
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      <div className="form-horizontal row-padding-top-1">

        {/* EMPLOYEE ID */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">従業員ID</label>
          <div className="col-md-2">
            <span style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}>{employee.employeeId}</span>
          </div>
        </div>

        {/* NAME */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">従業員名</label>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="employeeName"
              value={employee.employeeName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">メールアドレス</label>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="employeeAddr"
              value={employee.employeeAddr}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">パスワード</label>
          <div className="col-md-2" style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}>
            ※更新できません
          </div>
        </div>

        {/* HIRE DATE */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">入社日</label>
          <div className="col-md-2" style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}>
            {employee.hireDate} ※更新できません
          </div>
        </div>

        {/* WEEK WORK DAYS */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">週所定労働日数</label>
          <div className="col-md-2">
            <select
              className="form-control"
              name="weekWorkDayCount"
              value={employee.weekWorkDayCount}
              onChange={handleChange}
            >
              {[1,2,3,4,5,6,7].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* JOB TYPE */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">雇用形態</label>
          <div className="col-md-6">
            <label>
              <input type="radio" name="jobType" value="1"
                checked={employee.jobType === "1"} onChange={handleChange} /> 社員
            </label>　
            <label>
              <input type="radio" name="jobType" value="2"
                checked={employee.jobType === "2"} onChange={handleChange} /> パート
            </label>　
            <label>
              <input type="radio" name="jobType" value="3"
                checked={employee.jobType === "3"} onChange={handleChange} /> アルバイト
            </label>
          </div>
        </div>

        {/* BREAK TIME */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">休憩打刻</label>
          <div className="col-md-6">
            <label>
              <input type="radio" name="breakTimeType" value="1"
                checked={employee.breakTimeType === "1"} onChange={handleChange} /> 自動控除
            </label>　
            <label>
              <input type="radio" name="breakTimeType" value="2"
                checked={employee.breakTimeType === "2"} onChange={handleChange} /> 休憩打刻を利用
            </label>
          </div>
        </div>

        {/* GROUP SELECT */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">グループ</label>
          <div className="col-md-2">
            <select
              className="form-control"
              name="groupId"
              value={employee.groupId}
              onChange={handleChange}
            >
              <option value="">未選択</option>
              {groupList.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SHIFT SELECT */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">個別シフト</label>
          <div className="col-md-2">
            <select
              className="form-control"
              name="shiftId"
              value={employee.shiftId}
              onChange={handleChange}
            >
              <option value="">未選択</option>
              {shiftList.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SHIFT APPLY DATE */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">シフト変更適用日</label>
          <div className="col-md-2">
            <input
              type="text"
              name="targetDate"
              className="form-control"
              value={employee.targetDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* OTHER APP ID */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">外部アプリID</label>
          <div className="col-md-2">
            <input
              type="text"
              name="otherAppId"
              className="form-control"
              value={employee.otherAppId}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="form-group">
          <label className="col-md-offset-2 col-md-2 input-label">ステータス</label>
          <div className="col-md-6">
            <label>
              <input type="radio" name="employeeStatus" value="0"
                checked={employee.employeeStatus === "0"} onChange={handleChange} /> 在職
            </label>　
            <label>
              <input type="radio" name="employeeStatus" value="1"
                checked={employee.employeeStatus === "1"} onChange={handleChange} /> 休職
            </label>　
            <label>
              <input type="radio" name="employeeStatus" value="2"
                checked={employee.employeeStatus === "2"} onChange={handleChange} /> 退職
            </label>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="row row-padding-top-2">
          <div className="col-md-12 text-center">

            <button className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-pencil fa-fw"></i> 更新
            </button>

            <a 
              href="/employee/list"
              className="btn btn-primary"
              style={{ marginLeft: 10 }}
            >
              <i className="fa fa-ban fa-fw"></i> 戻る
            </a>

          </div>
        </div>

      </div>

    </OwnerLayout>
  );
}