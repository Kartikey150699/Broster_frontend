import { useState } from "react";

export default function UniversalModal({
  visible,
  mode = "confirm",

  title = "確認",
  message = "",
  targetName,
  targetId,

  detailList = [],

  confirmText = "OK",
  cancelText = "キャンセル",
  confirmColor = "btn-danger",
  cancelColor = "btn-default",

  iconClass = "fa fa-exclamation-triangle",

  onCancel,
  onConfirm,
  hideCancel = false,
}) {
  const [closing, setClosing] = useState(false);

  if (!visible) return null;

  // CLOSING ANIMATION HANDLER
  const handleCancel = () => {
    setClosing(true); // Start closing animation

    setTimeout(() => {
      setClosing(false); // Reset
      onCancel(); // Actually close modal
    }, 250); // Must match CSS animation duration
  };

  return (
    <div className={`universal-modal-overlay ${closing ? "closing" : ""}`}>
      <div
        className={`modal-dialog universal-modal-animate ${closing ? "closing" : ""}`}
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
              onClick={handleCancel}
              style={{ color: "white", opacity: 1 }}
            >
              ×
            </button>

            <h4 className="modal-title" style={{ color: "white" }}>
              {mode === "confirm" && <i className={iconClass}></i>} {title}
            </h4>
          </div>

          {/* BODY */}
          <div
            className="modal-body"
            style={{
              padding: "20px",
              textAlign: mode === "details" ? "left" : "center",
            }}
          >
            {mode === "confirm" && (
              <>
                {message && (
                  <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                    {message}
                  </p>
                )}

                {targetName && (
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#d9534f",
                    }}
                  >
                    {targetName}
                  </p>
                )}

                {targetId && (
                  <p style={{ fontSize: "12px", color: "#777" }}>
                    （ID: {targetId}）
                  </p>
                )}
              </>
            )}

            {mode === "details" && (
              <>
                {detailList.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className={`label ${
                        d.detailApplyStatus === 0
                          ? "label-info"
                          : d.detailApplyStatus === 1
                            ? "label-default"
                            : "label-danger"
                      }`}
                      style={{
                        fontSize: 12,
                        width: 60,
                        textAlign: "center",
                        marginRight: 10,
                      }}
                    >
                      {d.detailApplyStatusLabel}
                    </span>

                    <span style={{ fontSize: 14 }}>{d.employeeName}</span>

                    {d.applyLevel === 1 && (
                      <span
                        className="label label-danger"
                        style={{ marginLeft: 8, fontSize: 12 }}
                      >
                        必
                      </span>
                    )}
                  </div>
                ))}
              </>
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
            {mode === "details" && (
              <button
                className="btn btn-default"
                onClick={handleCancel}
                style={{ width: "120px" }}
              >
                閉じる
              </button>
            )}

            {mode === "confirm" && (
              <>
                {!hideCancel && (
                  <button
                    className={`btn ${cancelColor}`}
                    onClick={handleCancel}
                    style={{ width: "100px" }}
                  >
                    {cancelText}
                  </button>
                )}

                <button
                  className={`btn ${confirmColor}`}
                  onClick={onConfirm}
                  style={{ width: "120px", marginLeft: "10px" }}
                >
                  {confirmText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
