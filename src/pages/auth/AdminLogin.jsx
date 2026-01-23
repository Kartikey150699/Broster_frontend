import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import CommonButton from "../../components/CommonButton";
import { Info } from "lucide-react";
import "../../styles/adminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const idRef = useRef(null);

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (idRef.current) idRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const temp = [];
    if (!adminId) temp.push("IDを入力してください。");
    if (!password) temp.push("Passwordを入力してください。");

    setErrors(temp);

    if (temp.length === 0) {
      navigate("/status/list");
    }
  };

  return (
    <AuthLayout title="ログイン">
      {/* MAIN LOGIN UI */}
      <div className="login-wrapper">
        {/* LEFT SIDE TEXT */}
        <div className="login-left">
          <div className="login-left-inner">
            <h2 className="login-title">B-ROSTERで勤怠管理を楽にしよう！！</h2>

            <div className="login-icons-grid">
              <div className="icon-loop">
                <i className="fa fa-sign-in"></i>
                <span>出勤</span>
              </div>

              <div className="icon-loop">
                <i className="fa fa-sign-out"></i>
                <span>退勤</span>
              </div>

              <div className="icon-loop">
                <i className="fa fa-calendar-check-o"></i>
                <span>シフト</span>
              </div>

              <div className="icon-loop">
                <i className="fa fa-bar-chart"></i>
                <span>勤務集計</span>
              </div>

              <div className="icon-loop">
                <i className="fa fa-clipboard"></i>
                <span>有給</span>
              </div>

              <div className="icon-loop">
                <i className="fa fa-bell"></i>
                <span>お知らせ</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="login-right">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="panel panel-default login-card">
              {/* TITLE BAR */}
              <div
                className="panel-heading text-center"
                style={{
                  backgroundColor: "#0E7AC4",
                  color: "#fff",
                  fontSize: "18px",
                }}
              >
                <b>管理者ログイン</b>
              </div>

              <div className="panel-body">
                <div style={{ width: "80%", margin: "0 auto" }}>
                  {/* ID FIELD */}
                  <div
                    className="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <label className="input-label" style={{ width: "35%" }}>
                      ID
                    </label>
                    <input
                      type="text"
                      placeholder="A12345"
                      className="form-control input-animated"
                      style={{ width: "65%" }}
                      value={adminId}
                      ref={idRef}
                      onChange={(e) => setAdminId(e.target.value)}
                    />
                  </div>

                  {/* PASSWORD FIELD */}
                  <div
                    className="form-group"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label className="input-label" style={{ width: "35%" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••"
                      className="form-control input-animated"
                      style={{ width: "65%" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* ERRORS */}
                <div className="form-group text-center">
                  {errors.map((e, idx) => (
                    <div key={idx} className="error-text">
                      {e}
                    </div>
                  ))}

                  <CommonButton
                    type="submit"
                    icon="sign-in"
                    label="ログイン"
                    className="login-button"
                    style={{ marginTop: 15 }}
                  />
                </div>

                {/* EMPLOYEE LOGIN */}
                <div className="employee-login-link">
                  <a onClick={() => navigate("/employee/login")}>
                    <i className="fa fa-user fa-fw" />
                    従業員ログインはこちら
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* INFORMATION AREA */}
      <div className="info-section">
        <h1 className="infomation-line">
          <Info size={22} strokeWidth={2} className="info-icon" />
          Information
        </h1>

        <section className="info-box">
          <article>
            <header>
              <h2>出退勤の打刻はピッと指紋認証で一発打刻！！</h2>
            </header>
            <p>
              当サービスはタイムカードは一切不要です。必要なのは従業員の指紋を登録するだけ。
              <br />
              カード紛失の心配もなく、勤務時間の不正申告もなくなります。
            </p>
          </article>

          <article>
            <header>
              <h2>出退勤ルールのカスタマイズ！！</h2>
            </header>
            <p>
              当サービスは貴社独自の出退勤ルールをシステムに搭載させることが可能です。
              <br />
              <strong>
                お問い合わせは{" "}
                <a href="http://www.ifnt.co.jp" target="_blank">
                  こちら
                </a>
                からご連絡ください。
              </strong>
            </p>
          </article>
        </section>
      </div>
    </AuthLayout>
  );
}
