import { useState, useEffect, useRef } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import NotificationBar from "../../components/NotificationBar";

export default function EmployeePasswordReissue() {
  const idRef = useRef(null);

  // Messages
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // Form data
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (idRef.current) idRef.current.focus();
  }, []);

  // Auto-hide messages
  useEffect(() => {
    if (infoMessages.length > 0 || errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];
    if (!employeeId) errors.push("従業員IDを入力してください。");
    if (!email) errors.push("メールアドレスを入力してください。");

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // TODO: API call
    setInfoMessages(["パスワード再発行メールを送信しました（モック動作）"]);
  };

  return (
    <EmployeeLayout title="パスワード再発行" headerType="two">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-envelope fa-fw" /> パスワード再発行
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="row row-padding-top-1">

          {/* Employee ID */}
          <div className="form-group">
            <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
              <label className="input-label">従業員ID</label>
            </div>

            <div className="col-md-4 col-sm-7">
              <input
                type="text"
                className="form-control"
                ref={idRef}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
              <label className="input-label">メールアドレス</label>
            </div>

            <div className="col-md-4 col-sm-7">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="row row-padding-top-1">
          <div className="col-md-12 text-center">
            <button className="btn btn-primary">
              <i className="fa fa-envelope fa-fw" /> 送信
            </button>
          </div>
        </div>
      </form>
    </EmployeeLayout>
  );
}