export default function OwnerFooter({ hideLoginInfo = false }) {
  return (
    <footer className="footer" id="footer">
      <div className="footer-below">
        <div className="container">
          <div className="row">
            {/* LEFT SIDE — hide only when hideLoginInfo = true */}
            {!hideLoginInfo && (
              <div
                className="col-lg-8 text-left"
                style={{ paddingLeft: "171px" }}
              >
                <i className="fa fa-user fa-fw"></i> ログイン中
              </div>
            )}

            {/* When hidden, keep spacing so layout stays stable */}
            {hideLoginInfo && <div className="col-lg-8"></div>}

            {/* Right side copyright */}
            <div
              className="col-lg-4 text-right"
              style={{ paddingRight: "170px" }}
            >
              <a
                href="http://www.ifnt.co.jp"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                © 2026 IFNET v2.0.1
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
