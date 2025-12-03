export default function DeleteModal({
  visible,
  title = "確認",
  message = "削除しますか？",
  targetName,
  targetId,
  onCancel,
  onConfirm
}) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.45)",
        zIndex: 2000,
      }}
    >
      <div
        className="modal-dialog"
        style={{
          width: "380px",
          margin: "180px auto",
        }}
      >
        <div
          className="modal-content"
          style={{
            borderRadius: "4px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          {/* HEADER */}
          <div
            className="modal-header"
            style={{
              background: "#0E7AC4",
              color: "white",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          >
            <button
              type="button"
              className="close"
              onClick={onCancel}
              style={{ color: "white", opacity: 1 }}
            >
              ×
            </button>

            {/* ⭐ TITLE VISIBLE NOW ⭐ */}
            <h4 className="modal-title" style={{ color: "white" }}>
              <i className="fa fa-exclamation-triangle"></i> {title}
            </h4>
          </div>

          {/* BODY */}
          <div className="modal-body text-center" style={{ padding: "25px" }}>
            <p style={{ fontSize: "15px", marginBottom: "10px" }}>{message}</p>

            {targetName && (
              <p style={{ fontWeight: "bold", fontSize: "16px", color: "#d9534f" }}>
                {targetName}
              </p>
            )}

            {targetId && (
              <p style={{ fontSize: "12px", color: "#777" }}>（ID: {targetId}）</p>
            )}
          </div>

          {/* FOOTER */}
          <div
            className="modal-footer"
            style={{
              textAlign: "center",
              padding: "15px",
              borderTop: "1px solid #eee",
            }}
          >
            <button className="btn btn-default" onClick={onCancel} style={{ width: "100px" }}>
              いいえ
            </button>

            <button className="btn btn-danger" onClick={onConfirm} style={{ width: "120px", marginLeft: "10px" }}>
              はい、削除する
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}