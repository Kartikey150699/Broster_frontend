import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import CommonButton from "../../components/CommonButton";

export default function SharedLogin() {
  const navigate = useNavigate();
  const idRef = useRef(null);

  const [form, setForm] = useState({
    employeeId: "",
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
    if (!form.employeeId) temp.push("IDを入力してください。");
    if (!form.password) temp.push("Passwordを入力してください。");

    setErrors(temp);

    if (temp.length === 0) {
      // TODO: API call
      navigate("/employee/stamp/show");
    }
  };

  return (
    <AuthLayout title="ログイン">
      <div className="row row-padding-top-1">
        <div className="col-sm-offset-3 col-sm-6 col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="panel panel-default">
              {/* HEADER */}
              <div
                className="panel-heading text-center"
                style={{ backgroundColor: "#0E7AC4", color: "#fff" }}
              >
                <b>ログイン</b>
              </div>

              {/* BODY */}
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
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
