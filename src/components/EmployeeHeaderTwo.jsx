import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeHeaderTwo({
  onLogoutClick,
  companyId,
  groupId,
  employeeId,
}) {
  const [drop, setDrop] = useState(null);
  const location = useLocation();

  const toggleDropdown = (name) => {
    setDrop((prev) => (prev === name ? null : name));
  };

  return (
    <nav className="navbar navbar-default navbar-fixed-top navbar-custom">
      <div className="container">
        {/* LEFT LOGO */}
        <div
          className="navbar-header page-scroll"
          style={{ marginLeft: "171px" }}
        >
          <Link className="navbar-brand">B-ROSTER</Link>
        </div>

        {/* RIGHT MENU */}
        <div className="navbar-collapse" style={{ display: "block" }}>
          <ul
            className="nav navbar-nav navbar-right"
            style={{ marginRight: "156px" }}
          >
            {/* 勤務申請 */}
            <li
              className={`dropdown ${drop === "master" ? "open" : ""} ${location.pathname.startsWith("/stamp") || location.pathname.startsWith("/group") || location.pathname.startsWith("/employee") ? "active" : ""}`}
            >
              {" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("master");
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa fa-home fa-fw"
                  style={{ marginRight: "2px" }}
                ></i>
                勤務申請
              </a>
              {drop === "master" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link
                      to={`/stamp/applyRequest/:companyId/:groupId/:employeeId`}
                    >
                      <i className="fa fa-file fa-fw"></i> 申請登録
                    </Link>
                  </li>
                  <li>
                    <Link to="/group/list">
                      <i className="fa fa-home fa-fw"></i> 申請履歴
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 個人設定 */}
            <li
              className={`dropdown ${drop === "setting" ? "open" : ""} ${location.pathname.startsWith("/password") ? "active" : ""}`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("setting");
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa fa-cog fa-fw"
                  style={{ marginRight: "2px" }}
                ></i>
                個人設定
              </a>

              {drop === "setting" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link to="/admin/password-change">
                      <i className="fa fa-user fa-fw"></i> パスワード変更
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* LOGOUT */}
            <li>
              <a
                href="#"
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  onLogoutClick();
                }}
              >
                <i className="fa fa-power-off" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
