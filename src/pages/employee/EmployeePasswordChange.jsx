import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import NotificationBar from "../../components/NotificationBar";

export default function EmployeePasswordChange() {
  const navigate = useNavigate();
  const { companyId, groupId, employeeId } = useParams();

  const oldPassRef = useRef(null);

  // Messages
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // Form fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  useEffect(() => {
    if (oldPassRef.current) oldPassRef.current.focus();
  }, []);

  // Auto-hide notifications after 4 seconds
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

    if (!oldPassword) errors.push("旧パスワードを入力してください。");
    if (!newPassword1) errors.push("新パスワードを入力してください。");
    if (newPassword1 !== newPassword2)
      errors.push("新パスワード(再入力)が一致しません。");

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // TODO: API call
    setInfoMessages(["パスワードを更新しました（モック動作）"]);
  };

  return (
    <EmployeeLayout title="パスワード変更">
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-user fa-fw" />
            パスワード変更
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="row row-padding-top-1">
          {/* OLD PASSWORD */}
          <div className="form-group">
            <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
              <label className="input-label">
                旧パスワード <i className="fa fa-pencil" />
              </label>
            </div>

            <div className="col-md-4 col-sm-7">
              <input
                type="password"
                className="form-control"
                ref={oldPassRef}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>

          {/* NEW PASSWORD 1 */}
          <div className="form-group">
            <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
              <label className="input-label">
                新パスワード <i className="fa fa-pencil" />
              </label>
            </div>

            <div className="col-md-4 col-sm-7">
              <input
                type="password"
                className="form-control"
                value={newPassword1}
                onChange={(e) => setNewPassword1(e.target.value)}
              />
            </div>
          </div>

          {/* NEW PASSWORD 2 */}
          <div className="form-group">
            <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
              <label className="input-label">
                新パスワード(再入力) <i className="fa fa-pencil" />
              </label>
            </div>

            <div className="col-md-4 col-sm-7">
              <input
                type="password"
                className="form-control"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="row row-padding-top-1">
          <div className="col-md-12 text-center">
            {/* UPDATE */}
            <button className="btn btn-primary">
              <i className="fa fa-pencil fa-fw" /> 更新
            </button>

            {/* BACK */}
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: 10 }}
              onClick={() =>
                navigate(
                  `/stamp/applyRequest/${companyId}/${groupId}/${employeeId}`,
                )
              }
            >
              <i className="fa fa-ban fa-fw" /> 戻る
            </button>
          </div>
        </div>
      </form>
    </EmployeeLayout>
  );
}
