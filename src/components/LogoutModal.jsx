// src/components/LogoutModal.jsx
import { Link } from "react-router-dom";

export default function LogoutModal({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="logout-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: 9998
        }}
      />

      {/* MODAL */}
      <div
        className="modal"
        style={{
          display: "block",
          position: "fixed",
          top: "150px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header alert alert-warning modal-header-custom">
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>

              <h4 className="modal-title">
                <i className="fa fa-info-circle fa-fw"></i> 確認
              </h4>
            </div>

            {/* BODY */}
            <div className="modal-body">ログアウトしますか？</div>

            {/* FOOTER */}
            <div className="modal-footer">
              <Link
                to="/admin/login"
                className="btn btn-primary"
                onClick={onClose}
              >
                ログアウト
              </Link>

              <button className="btn btn-default" onClick={onClose}>
                キャンセル
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}