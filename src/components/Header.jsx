import { Link } from "react-router-dom";

export default function OwnerHeader({ onLogoutClick }) {
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
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#owner-navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            Menu <i className="fa fa-bars"></i>
          </button>

          {/* Brand Logo */}
          <Link className="navbar-brand" to="/status/show">
            B-ROSTER
          </Link>
        </div>

        {/* RIGHT MENU ITEMS */}
        <div className="navbar-collapse" id="owner-navbar" style={{ display: "block" }}>
          <ul className="nav navbar-nav navbar-right" style={{ marginRight: "156px" }}>

            {/* 勤務状況 */}
            <li>
              <Link to="/status/show">
                <i className="fa fa-users fa-fw" style={{ marginRight: "2px", width: "auto" }}></i>勤務状況
              </Link>
            </li>

            {/* 勤務申請 */}
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-file fa-fw" style={{ marginRight: "2px", width: "auto" }}></i> 勤務申請
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link to="/apply/list">
                    <i className="fa fa-file fa-fw"></i> 勤務申請一覧
                  </Link>
                </li>
                <li>
                  <Link to="/paid/show">
                    <i className="fa fa-file fa-fw"></i> 有休取得履歴
                  </Link>
                </li>
                <li>
                  <Link to="/apply-group/list">
                    <i className="fa fa-file fa-fw"></i> 承認グループ一覧
                  </Link>
                </li>
              </ul>
            </li>

            {/* 勤務予定 */}
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-calendar fa-fw" style={{ marginRight: "2px", width: "auto" }}></i> 勤務予定
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link to="/workplan/list">
                    <i className="fa fa-calendar fa-fw"></i> 勤務予定一覧
                  </Link>
                </li>
                <li>
                  <Link to="/shift/show">
                    <i className="fa fa-calendar fa-fw"></i> シフト一覧
                  </Link>
                </li>
                <li>
                  <Link to="/template/show">
                    <i className="fa fa-calendar fa-fw"></i> テンプレート一覧
                  </Link>
                </li>
              </ul>
            </li>

            {/* 勤務実績 */}
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-clock-o fa-fw" style={{ marginRight: "2px", width: "auto" }}></i> 勤務実績
              </a>

              <ul className="dropdown-menu">
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
            </li>

            {/* マスタ管理 */}
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-home fa-fw" style={{ marginRight: "2px", width: "auto" }}></i> マスタ管理
              </a>

              <ul className="dropdown-menu">
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
            </li>

            {/* 設定 */}
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-cog fa-fw" style={{ marginRight: "2px", width: "auto" }}></i> 設定
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link to="/password/change">
                    <i className="fa fa-user fa-fw"></i> パスワード変更
                  </Link>
                </li>
              </ul>
            </li>

            {/* ログアウト */}
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