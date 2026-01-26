import { Link } from "react-router-dom";

export default function EmployeeHeader({ onLogoutClick }) {
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

        {/* RIGHT SIDE MENU AREA */}
        <div
          id="owner-navbar"
          className="navbar-collapse"
          style={{ display: "block" }}
        >
          <ul
            className="nav navbar-nav navbar-right"
            style={{ marginRight: "156px" }}
          >
            {/* LOGOUT BUTTON */}
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
