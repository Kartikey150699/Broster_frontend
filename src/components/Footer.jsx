export default function OwnerFooter() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-below">
        <div className="container">
          <div className="row">

            {/* Left side text (login info) */}
            <div
              className="col-lg-8 text-left"
              style={{ paddingLeft: "171px" }}
            >
              <i className="fa fa-user fa-fw"></i> ログイン中
            </div>

            {/* Right side copyright */}
            <div
              className="col-lg-4 text-right"
              style={{ paddingRight: "186px" }}
            >
              <a
                href="http://www.ifnt.co.jp"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                © 2023 IFNET v1.4.19
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}