import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import NotificationBar from "../../components/NotificationBar";
import axios from "axios";

export default function AdminEdit() {
  const { companyId, adminId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    adminName: "",
    mailAddress: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ========================================================
  // Load Admin Info
  // ========================================================
  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8081/broster/v2/api/userManage/getAdminList",
        {
          companyId: Number(companyId),
          adminId: String(adminId)
        }
      );

      const record = res.data.adminRecordDtoList?.[0];

      if (record) {
        setForm((prev) => ({
          ...prev,
          adminName: record.adminName || "",
          mailAddress: record.mailAddress || ""
        }));
      }

    } catch (err) {
      console.error(err);
      setErrorMessages(["管理者情報の取得に失敗しました。"]);
    }
  };

  // ========================================================
  // Update Name & Email
  // ========================================================
  const updateAdminInfo = async () => {
    const payload = {
      adminRecordDtoList: [
        {
          companyId: Number(companyId),
          adminId: String(adminId),
          adminName: form.adminName,
          mailAddress: form.mailAddress,
          adminPassword: "dummy" // required by backend
        }
      ]
    };

    return axios.post(
      "http://localhost:8081/broster/v2/api/userManage/updateAdmin",
      payload,
      { withCredentials: true }
    );
  };

  // ========================================================
  // Update Password
  // ========================================================
  const updatePassword = async () => {
    // no password update
    if (
      form.oldPassword.trim() === "" &&
      form.newPassword.trim() === "" &&
      form.confirmPassword.trim() === ""
    ) {
      return;
    }

    // validation
    if (form.newPassword !== form.confirmPassword) {
      throw new Error("新しいパスワードが一致しません。");
    }

    // 1. verify old password
    const verifyRes = await axios.post(
      "http://localhost:8081/broster/v2/api/userManage/getAdminList",
      {
        companyId: Number(companyId),
        adminId: String(adminId),
        password: form.oldPassword
      }
    );

    if (verifyRes.data.adminRecordDtoList.length === 0) {
      throw new Error("現在のパスワードが正しくありません。");
    }

    // 2. update password
    const payload = {
      adminRecordDtoList: [
        {
          companyId: Number(companyId),
          adminId: String(adminId),
          password: form.newPassword
        }
      ]
    };

    return axios.post(
      "http://localhost:8081/broster/v2/api/userManage/updateAdminPassword",
      payload,
      { withCredentials: true }
    );
  };

  // ========================================================
  // Handle Update
  // ========================================================
  const handleUpdate = async () => {
    try {
      setErrorMessages([]);

      // 1. Update Admin Info
      await updateAdminInfo();

      // 2. Update Password (if needed)
      await updatePassword();

      setInfoMessages(["更新が完了しました。"]);
      setTimeout(() => navigate("/admin/list"), 900);

    } catch (err) {
      console.error(err);
      setErrorMessages([err.message || "更新に失敗しました。"]);
    }
  };

  return (
    <AdminLayout title="管理者更新">

    {/* Notification Bar */}
    <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-pencil"></i> 管理者更新
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          {/* Company ID */}
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>会社ID :</label>
            <span style={{ color: "red", fontWeight: "bold", marginLeft: 10 }}>
              {companyId}
            </span>
          </div>

          {/* Admin ID */}
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>管理者ID :</label>
            <span style={{ color: "red", fontWeight: "bold", marginLeft: 10 }}>
              {adminId}
            </span>
          </div>

          {/* Admin Name */}
          <div className="form-group">
            <label>管理者名 :</label>
            <input
              type="text"
              className="form-control"
              value={form.adminName}
              onChange={(e) => setForm({ ...form, adminName: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>メールアドレス :</label>
            <input
              type="text"
              className="form-control"
              value={form.mailAddress}
              onChange={(e) => setForm({ ...form, mailAddress: e.target.value })}
            />
          </div>

          {/* Password Section */}
          <hr />
          <h4>パスワード変更</h4>

          <div className="form-group">
            <label>現在のパスワード :</label>
            <input
              type="password"
              className="form-control"
              value={form.oldPassword}
              onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>新しいパスワード :</label>
            <input
              type="password"
              className="form-control"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>新しいパスワード（確認）:</label>
            <input
              type="password"
              className="form-control"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="text-center" style={{ marginTop: 20 }}>
            <button className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-check"></i> 更新
            </button>

            <a href="/admin/list" className="btn btn-primary" style={{ marginLeft: 10 }}>
              <i className="fa fa-ban fa-fw"></i>戻る
            </a>
          </div>

        </div>
      </div>

    </AdminLayout>
  );
}