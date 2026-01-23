import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * AuthLayout
 * Used only for:
 *  - Admin Login
 *  - Employee Login
 *  - Password Reset
 *  - Any authentication-related pages
 *
 * Header shows only logo — no menu, no logout button.
 */
export default function AuthLayout({ title = "B-ROSTER", children }) {
  document.title = title;

  return (
    <div className="auth-page">
      {/* HEADER — hide menu */}
      <Header hideMenu={true} />

      {/* MAIN CONTENT */}
      <div
        className="container-fluid owner-content"
        style={{
          marginTop: window.innerWidth < 768 ? "110px" : "70px",
        }}
      >
        {children}
      </div>

      {/* FOOTER */}
      <Footer hideLoginInfo={true} />
    </div>
  );
}
