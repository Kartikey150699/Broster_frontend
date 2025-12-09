export default function NotificationBar({ infoMessages = [], errorMessages = [] }) {
  return (
    <>
      {/* SUCCESS */}
      {infoMessages.length > 0 && (
        <div className="alert alert-info text-center">
          {infoMessages.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
      )}

      {/* ERROR */}
      {errorMessages.length > 0 && (
        <div className="alert alert-danger text-center">
          {errorMessages.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
      )}
    </>
  );
}