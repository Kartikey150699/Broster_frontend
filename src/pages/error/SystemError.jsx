import AuthLayout from "../../layouts/AuthLayout";

export default function SystemError() {
  return (
    <AuthLayout title="エラー">
      <div className="row row-padding-top-2">
        <div className="col-md-offset-3 col-md-6">
          <div className="panel panel-danger">
            <div className="panel-heading text-center">
              <b style={{ fontSize: "20px" }}>
                <i className="fa fa-exclamation-triangle fa-fw" />{" "}
                エラーが発生しました！
              </b>
            </div>

            <div className="panel-body text-center">
              {/* Message Block 1 */}
              <div className="row row-padding-top-1">
                <div className="col-md-12">
                  <p>
                    システム内部で不正なデータを検知しました。
                    <br />
                    大変お手数ですが再度ログインしてください。
                    <br />
                    <br />
                  </p>
                </div>
              </div>

              {/* Message Block 2 */}
              <div className="row">
                <div className="col-md-12">
                  <p style={{ paddingBottom: "30px" }}>
                    それでも解決しない場合はシステム管理者まで
                    <br />
                    ご連絡いただけますようお願い致します。
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
