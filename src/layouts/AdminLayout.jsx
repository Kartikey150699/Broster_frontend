import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UniversalModal from "../components/UniversalModal";
import { useNavigate } from "react-router-dom";
/**
 * AdminLayout
 * Used by:
 *  - Admin List
 *  - Admin Create / Edit
 *  - Group Master
 *  - Employee Master
 *  - All admin-side pages
 */
export default function AdminLayout({ title = "B-ROSTER", children }) {
  document.title = title;

  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  /** Close modal when pressing ESC */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setShowLogout(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /** When user clicks "Logout" */
  const handleLogout = () => {
    setShowLogout(false);
    navigate("/admin/login"); // Redirect
  };

  return (
    <div lassName="owner-layout">
      {/* HEADER — clicking logout button opens modal */}
      <Header onLogoutClick={() => setShowLogout(true)} />

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
      <Footer />

      {/* UNIVERSAL LOGOUT MODAL */}
      <UniversalModal
        visible={showLogout}
        title="ログアウト確認"
        message="ログアウトしてもよろしいですか？"
        confirmText="ログアウト"
        cancelText="キャンセル"
        confirmColor="btn-danger"
        cancelColor="btn-default"
        iconClass="fa fa-sign-out"
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
