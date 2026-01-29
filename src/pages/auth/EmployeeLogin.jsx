import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import CommonButton from "../../components/CommonButton";

export default function EmployeeLogin() {
  const { employeeId: paramEmployeeId } = useParams();
  const navigate = useNavigate();
  const idRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect"); // "history" or "password"

  const [form, setForm] = useState({
    employeeId: paramEmployeeId || "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (idRef.current) idRef.current.focus();
  }, []);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const temp = [];
    if (!form.employeeId) temp.push("従業員IDを入力してください。");
    if (!form.password) temp.push("Passwordを入力してください。");

    setErrors(temp);
    if (temp.length > 0) return;

    // login OK
    const companyId = localStorage.getItem("companyId");
    const groupId = localStorage.getItem("groupId");
    const employeeId = form.employeeId;

    // detect redirect from query parameter
    const location = window.location;
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect"); // "history" or "password"

    if (redirect === "history") {
      navigate(`/stamp/history/${companyId}/${groupId}/${employeeId}`);
    } else if (redirect === "password") {
      navigate(`/stamp/passChange/${companyId}/${groupId}/${employeeId}`);
    } else {
      // default fallback
      navigate(`/stamp/show`);
    }
  };

  return (
    <EmployeeLayout title="従業員ログイン" headerType="">
      <div className="row row-padding-top-1">
        <div className="col-sm-offset-3 col-sm-6 col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="panel panel-default">
              {/* HEADER */}
              <div
                className="panel-heading text-center"
                style={{ backgroundColor: "#0E7AC4", color: "#fff" }}
              >
                <b>従業員ログイン</b>
              </div>

              {/* BODY */}
              <div className="panel-body">
                {/* ID FIELD */}
                <div className="form-group">
                  <div className="col-sm-4">
                    <label className="input-label">従業員ID</label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      ref={idRef}
                      value={form.employeeId}
                      onChange={(e) =>
                        updateField("employeeId", e.target.value)
                      }
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
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                    />
                  </div>
                </div>

                {/* ERRORS */}
                <div className="form-group text-center">
                  {errors.map((msg, index) => (
                    <div key={index} style={{ color: "red" }}>
                      {msg}
                    </div>
                  ))}

                  {/* LOGIN BUTTON */}
                  <CommonButton
                    type="submit"
                    icon="sign-in"
                    label="ログイン"
                    className="btn-primary btn-lg"
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              ※勤務申請履歴を見る場合はご自身の従業員IDでログインして下さい。
            </div>
          </form>
        </div>
      </div>
    </EmployeeLayout>
  );
}
