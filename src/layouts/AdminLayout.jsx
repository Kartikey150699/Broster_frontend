import { Link } from "react-router-dom";

/**
 * Admin Layout — matches old JSP adminlayout.jsp exactly
 * Bootstrap 3 + layout.css are already loaded in index.html
 */
export default function AdminLayout({ title = "B-ROSTER", children }) {
  // Set page title
  document.title = title;

  return (
    <div>
      {/* NAVBAR (same as JSP) */}
      <nav className="navbar navbar-default navbar-fixed-top navbar-custom">
        <div className="container">
          <div
            className="navbar-header page-scroll"
            style={{ marginLeft: "171px" }}
          >
          <Link className="navbar-brand" to="/admin/list">
          B-ROSTER
          </Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {/* (JSP has empty menu, so we keep it empty) */}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container-fluid" style={{ marginTop: "70px" }}>
        {children}
      </div>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="footer-below">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right" style={{ paddingRight: "186px" }}>
                <a href="http://www.ifnt.co.jp" target="_blank" rel="noreferrer" style={{ color: "white" }}>
                  © 2023 IFNET v1.4.19
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}