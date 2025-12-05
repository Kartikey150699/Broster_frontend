import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function AdminCreate() {
  const [form, setForm] = useState({
    companyId: "11018",
    adminId: "",
    adminName: "",
    mailAddress: "",
    password: "",
    confirmPassword: ""
  });

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  // ============================================================
  // Create Admin
  // ============================================================
  const createAdmin = async () => {

    // Confirm password check
    if (form.password !== form.confirmPassword) {
      setErrorMessages(["パスワードと確認用パスワードが一致しません。"]);
      return;
    }

    try {
      const payload = {
        adminRecordDtoList: [
          {
            companyId: String(form.companyId),
            adminId: String(form.adminId),
            adminName: String(form.adminName),
            mailAddress: String(form.mailAddress),
            password: String(form.password)
          }
        ]
      };

      console.log("CREATE PAYLOAD:", payload);

      const res = await axios.post(
        "http://localhost:8081/broster/v2/api/userManage/registerAdmin",
        payload,
        { withCredentials: true }
      );

      if (res.data.resultCode === "00000") {
        setInfoMessages(["管理者を登録しました。"]);

        // Reset form
        setForm({
          companyId: "11018",
          adminId: "",
          adminName: "",
          mailAddress: "",
          password: "",
          confirmPassword: ""
        });

        setTimeout(() => navigate("/admin/list"), 800);
      } else {
        setErrorMessages(["登録に失敗しました。"]);
      }

    } catch (err) {
      console.error("CREATE ERROR:", err);
      setErrorMessages(["登録に失敗しました。"]);
    }
  };

  return (
    <AdminLayout title="管理者登録">
      
      {/* SUCCESS MESSAGE */}
      {infoMessages.length > 0 && (
        <div className="alert alert-info text-center">
          {infoMessages.map((m, i) => <div key={i}>{m}</div>)}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorMessages.length > 0 && (
        <div className="alert alert-danger text-center">
          {errorMessages.map((m, i) => <div key={i}>{m}</div>)}
        </div>
      )}
      
      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2><i className="fa fa-plus"></i> 管理者登録</h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          {/* Company ID */}
          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "10px", width: "80px" }}>会社ID :</label>
            <span style={{ fontWeight: "bold", color: "red" }}>{form.companyId}</span>
          </div>

          {/* Admin ID */}
          <div className="form-group">
            <label>管理者ID :</label>
            <input
              type="text"
              className="form-control"
              value={form.adminId}
              onChange={(e) => setForm({ ...form, adminId: e.target.value })}
            />
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

          {/* Password */}
          <div className="form-group">
            <label>パスワード :</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>パスワード (確認) :</label>
            <input
              type="password"
              className="form-control"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* BUTTONS */}
          <div className="text-center" style={{ marginTop: 20 }}>
            <button className="btn btn-primary" onClick={createAdmin}>
              <i className="fa fa-check"></i> 登録
            </button>

            <a
              href="/admin/list"
              className="btn btn-default"
              style={{ marginLeft: 10 }}
            >
              <i className="fa fa-chevron-left fa-fw"></i>戻る
            </a>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}