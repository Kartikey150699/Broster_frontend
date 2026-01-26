import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import NotificationBar from "../../components/NotificationBar";
import CommonButton from "../../components/CommonButton";

export default function PasswordChange() {
  const navigate = useNavigate();

  const oldRef = useRef(null);

  const [form, setForm] = useState({
    oldPassWord: "",
    newPassWord1: "",
    newPassWord2: "",
  });

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (oldRef.current) oldRef.current.focus();
  }, []);

  // -------------------------------
  // AUTO HIDE NOTIFICATION (4 sec)
  // -------------------------------
  useEffect(() => {
    if (infoMessages.length === 0 && errorMessages.length === 0) return;

    const timer = setTimeout(() => {
      setInfoMessages([]);
      setErrorMessages([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [infoMessages, errorMessages]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if (!form.oldPassWord) errors.push("旧パスワードを入力してください。");
    if (!form.newPassWord1) errors.push("新パスワードを入力してください。");
    if (form.newPassWord1 !== form.newPassWord2)
      errors.push("新パスワードが一致しません。");

    setErrorMessages(errors);
    setInfoMessages([]);

    if (errors.length === 0) {
      // TODO: API call
      setInfoMessages(["パスワードを変更しました。"]);
    }
  };

  return (
    <AdminLayout title="パスワード変更">
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
        {/* OLD PASSWORD */}
        <div className="form-group row-padding-top-1">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">
              旧パスワード <i className="fa fa-pencil" />
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              ref={oldRef}
              value={form.oldPassWord}
              onChange={(e) => updateField("oldPassWord", e.target.value)}
            />
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div className="form-group">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">
              新パスワード <i className="fa fa-pencil" />
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              value={form.newPassWord1}
              onChange={(e) => updateField("newPassWord1", e.target.value)}
            />
          </div>
        </div>

        {/* NEW PASSWORD CONFIRM */}
        <div className="form-group">
          <div className="col-md-offset-2 col-md-2">
            <label className="input-label">
              新パスワード(再入力) <i className="fa fa-pencil" />
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              value={form.newPassWord2}
              onChange={(e) => updateField("newPassWord2", e.target.value)}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="row row-padding-top-2">
          <div className="col-md-12 text-center">
            <CommonButton
              icon="pencil"
              label="変更"
              size="md"
              type="submit"
              style={{ marginRight: "10px" }}
            />

            <CommonButton
              icon="ban"
              label="戻る"
              size="md"
              onClick={() => navigate("/status/list")}
            />
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
