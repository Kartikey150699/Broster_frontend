import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LogoutModal from "../components/LogoutModal";

export default function OwnerLayout({ title = "B-ROSTER", children }) {
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
    <div>

      {/* HEADER (Logout button triggers modal) */}
      <Header onLogoutClick={() => setShowLogout(true)} />

      {/* MAIN CONTENT */}
      <div className="container-fluid" style={{ marginTop: "70px" }}>
        {children}
      </div>

      {/* FOOTER */}
      <Footer />

      {/* LOGOUT MODAL (React component) */}
      <LogoutModal
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onLogout={handleLogout}
      />

    </div>
  );
}