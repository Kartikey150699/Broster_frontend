import { useState, useEffect } from "react";
import EmployeeHeader from "../components/EmployeeHeader";
import Footer from "../components/Footer";
import UniversalModal from "../components/UniversalModal";
import { useNavigate } from "react-router-dom";

export default function EmployeeLayout({ title = "B-ROSTER", children }) {
  document.title = title;

  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setShowLogout(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = () => {
    setShowLogout(false);
    navigate("/employee/login");
  };

  return (
    <div className="owner-layout">
      {/* MINIMAL EMPLOYEE HEADER */}
      <EmployeeHeader onLogoutClick={() => setShowLogout(true)} />

      {/* CONTENT */}
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

      {/* LOGOUT MODAL */}
      <UniversalModal
        visible={showLogout}
        title="ログアウト確認"
        message="ログアウトしてもよろしいですか？"
        confirmText="ログアウト"
        cancelText="キャンセル"
        confirmColor="btn-primary"
        cancelColor="btn-default"
        iconClass="fa fa-sign-out"
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
