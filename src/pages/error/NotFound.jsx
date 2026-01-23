import AuthLayout from "../../layouts/AuthLayout";

export default function NotFound() {
  return (
    <AuthLayout title="エラー">
      <div className="row row-padding-top-2">
        <div className="col-md-offset-3 col-md-6">
          <div className="panel panel-danger">
            <div className="panel-heading text-center">
              <b style={{ fontSize: "20px" }}>
                <i className="fa fa-exclamation-triangle fa-fw" />{" "}
                ご指定のページが存在しません
              </b>
            </div>

            <div className="panel-body text-center">
              <div className="row row-padding-top-1">
                <div className="col-md-12">
                  <p>
                    あなたがアクセスしたページは見つかりませんでした。
                    <br />
                    ＵＲＬをご確認の上、再度アクセスしてください。
                    <br />
                    このページが何度も表示される場合は、
                    <br />
                    お探しのページが移動・削除された可能性がありますので、
                    <br />
                    管理者に問い合わせて下さい。
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
