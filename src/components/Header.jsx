import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function OwnerHeader({ onLogoutClick }) {
  const [open, setOpen] = useState(false); // mobile menu toggle
  const [drop, setDrop] = useState(null); // which dropdown is open
  const location = useLocation();

  // Auto-close menu when clicking link
  useEffect(() => {
    const nav = document.getElementById("owner-navbar");
    if (!nav) return;

    const links = nav.querySelectorAll("a");
    const handler = (e) => {
      const isDropdownParent = e.target.closest(".dropdown > a");

      // If clicking a parent dropdown → DO NOT close menu
      if (isDropdownParent) return;

      const insideDropdownMenu = e.target.closest(".dropdown-menu");

      // If clicking inside dropdown items → DO NOT close menu
      if (insideDropdownMenu) return;

      // Otherwise close the menu (regular links)
      setOpen(false);
      setDrop(null);
    };

    links.forEach((link) => link.addEventListener("click", handler));
    return () =>
      links.forEach((link) => link.removeEventListener("click", handler));
  }, []);

  // CUSTOM dropdown toggle (replaces Bootstrap JS)
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
          {/* Mobile Hamburger */}
          <button
            type="button"
            className="navbar-toggle md:hidden"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Toggle navigation</span>
            Menu <i className="fa fa-bars"></i>
          </button>

          {/* Brand Logo */}
          <Link className="navbar-brand" to="/status/show">
            B-ROSTER
          </Link>
        </div>

        {/* RIGHT MENU AREA */}
        <div
          id="owner-navbar"
          className={`navbar-collapse collapse ${open ? "in" : ""}`}
        >
          <ul
            className="nav navbar-nav navbar-right"
            style={{ marginRight: "156px" }}
          >
            {/* ------------------ 勤務状況 ------------------ */}
            <li
              className={
                location.pathname.startsWith("/status") ? "active" : ""
              }
            >
              <Link to="/status/list">
                <i
                  className="fa fa-users fa-fw"
                  style={{ marginRight: "2px" }}
                ></i>
                勤務状況
              </Link>
            </li>

            {/* ------------------ 勤務申請 ------------------ */}
            <li
              className={`dropdown ${drop === "apply" ? "open" : ""} ${location.pathname.startsWith("/apply") || location.pathname.startsWith("/paid") ? "active" : ""}`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("apply");
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa fa-file fa-fw"
                  style={{ marginRight: "2px" }}
                ></i>
                勤務申請
              </a>

              {drop === "apply" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link to="/apply/list">
                      <i className="fa fa-file fa-fw"></i> 勤務申請一覧
                    </Link>
                  </li>
                  <li>
                    <Link to="/paid/list">
                      <i className="fa fa-file fa-fw"></i> 有休取得履歴
                    </Link>
                  </li>
                  <li>
                    <Link to="/apply-group/list">
                      <i className="fa fa-file fa-fw"></i> 承認グループ一覧
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ------------------ 勤務予定 ------------------ */}
            <li
              className={`dropdown ${drop === "plan" ? "open" : ""} ${location.pathname.startsWith("/workplan") || location.pathname.startsWith("/shift") || location.pathname.startsWith("/template") ? "active" : ""}`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("plan");
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa fa-calendar fa-fw"
                  style={{ marginRight: "2px" }}
                ></i>
                勤務予定
              </a>

              {drop === "plan" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link to="/workplan/list">
                      <i className="fa fa-calendar fa-fw"></i> 勤務予定一覧
                    </Link>
                  </li>
                  <li>
                    <Link to="/shift/list">
                      <i className="fa fa-calendar fa-fw"></i> シフト一覧
                    </Link>
                  </li>
                  <li>
                    <Link to="/template/list">
                      <i className="fa fa-calendar fa-fw"></i> テンプレート一覧
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ------------------ 勤務実績 ------------------ */}
            <li
              className={`dropdown ${drop === "result" ? "open" : ""} ${location.pathname.startsWith("/result") || location.pathname.startsWith("/print") || location.pathname.startsWith("/summary") ? "active" : ""}`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("result");
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa fa-clock-o fa-fw"
                  style={{ marginRight: "2px" }}
                ></i>
                勤務実績
              </a>

              {drop === "result" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link to="/result/list">
                      <i className="fa fa-clock-o fa-fw"></i> 勤務実績一覧
                    </Link>
                  </li>
                  <li>
                    <Link to="/print/search">
                      <i className="fa fa-clock-o fa-fw"></i> 出勤簿出力
                    </Link>
                  </li>
                  <li>
                    <Link to="/summary/show">
                      <i className="fa fa-clock-o fa-fw"></i> 出勤/休日日数集計
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ------------------ マスタ管理 ------------------ */}
            <li
              className={`dropdown ${drop === "master" ? "open" : ""} ${location.pathname.startsWith("/admin") || location.pathname.startsWith("/group") || location.pathname.startsWith("/employee") ? "active" : ""}`}
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
                マスタ管理
              </a>
              {drop === "master" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link to="/admin/list">
                      <i className="fa fa-home fa-fw"></i> 管理者マスタ
                    </Link>
                  </li>
                  <li>
                    <Link to="/group/list">
                      <i className="fa fa-home fa-fw"></i> グループマスタ
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/list">
                      <i className="fa fa-home fa-fw"></i> 従業員マスタ
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ------------------ 設定 ------------------ */}
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
                設定
              </a>

              {drop === "setting" && (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li>
                    <Link to="/password/change">
                      <i className="fa fa-user fa-fw"></i> パスワード変更
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ------------------ ログアウト ------------------ */}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onLogoutClick();
                }}
                style={{ fontSize: "20px", cursor: "pointer" }}
              >
                <i className="fa fa-power-off"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
