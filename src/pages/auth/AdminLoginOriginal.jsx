import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import CommonButton from "../../components/CommonButton";

export default function AdminLogin() {
  const navigate = useNavigate();
  const idRef = useRef(null);

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (idRef.current) idRef.current.focus();
  }, []);

  // TODO: Add API Integration later
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock validation
    const temp = [];
    if (!adminId) temp.push("IDを入力してください。");
    if (!password) temp.push("Passwordを入力してください。");

    setErrors(temp);

    if (temp.length === 0) {
      console.log("LOGIN REQUEST:", { adminId, password });
      navigate("/status/list"); // redirect after login
    }
  };

  return (
    <AuthLayout title="ログイン">
      <div className="row row-padding-top-1">
        <div className="col-sm-offset-1 col-sm-6 col-xs-12">
          <h2 className="catchcopy">B-ROSTERで勤怠管理を楽にしよう！！</h2>
        </div>

        <div className="col-sm-4 col-xs-12">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="panel panel-default">
              <div
                className="panel-heading"
                style={{ backgroundColor: "#0E7AC4", color: "#fff" }}
              >
                <b>管理者ログイン</b>
              </div>

              <div className="panel-body">
                {/* ID FIELD */}
                <div className="form-group">
                  <div className="col-sm-4">
                    <label className="input-label">ID</label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      value={adminId}
                      ref={idRef}
                      onChange={(e) => setAdminId(e.target.value)}
                    />
                  </div>
                </div>

                {/* PASSWORD FIELD */}
                <div className="form-group">
                  <div className="col-sm-4">
                    <label className="input-label">Password</label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* ERROR MESSAGES */}
                <div className="form-group text-center">
                  {errors.map((e, idx) => (
                    <div key={idx} style={{ color: "red" }}>
                      {e}
                    </div>
                  ))}

                  <CommonButton
                    type="submit"
                    icon="sign-in"
                    label="ログイン"
                    style={{ marginTop: 10 }}
                  />
                </div>

                {/* EMPLOYEE LOGIN LINK */}
                <div className="row row-padding-top-1">
                  <div className="col-sm-12 col-md-12 text-right">
                    <a onClick={() => navigate("/employee/login")}>
                      <i className="fa fa-user fa-fw" />
                      従業員ログインはこちら
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* INFORMATION AREA */}
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
          <h1 className="infomation-line">
            <i className="fa fa-info-circle fa-fw"></i>Information
          </h1>
        </div>

        <div className="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
          <section
            style={{
              overflowY: "scroll",
              height: 180,
              marginLeft: 0,
              marginRight: 0,
            }}
          >
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
                お問い合わせは{" "}
                <a href="http://www.ifnt.co.jp" target="_blank">
                  こちら
                </a>
                からご連絡ください。
              </p>
            </article>
          </section>
        </div>

        <div className="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
          <div className="infomation-line"></div>
        </div>
      </div>
    </AuthLayout>
  );
}
