import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

/**
 * Admin List Page (管理者一覧)
 * Modern but preserves the JSP design feel
 */
export default function AdminList() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [records, setRecords] = useState([]);

  // TEMP dummy data — replace with API call later
  useEffect(() => {
    setRecords([
      {
        companyId: "1001",
        adminId: "admin01",
        adminName: "山田太郎",
        mailAddress: "taro@example.com",
        createDatetime: "2025-01-01 10:00",
      },
      {
        companyId: "1002",
        adminId: "admin02",
        adminName: "佐藤花子",
        mailAddress: "hanako@example.com",
        createDatetime: "2025-01-05 15:30",
      },
    ]);
  }, []);

  return (
    <AdminLayout title="管理者一覧">

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i>
            管理者一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* INFO MESSAGE */}
      {infoMessages.length > 0 && (
        <div className="row row-padding-top-1">
          <div className="col-sm-12 text-center">
            <div className="alert alert-info alert-dismissible fade in">
              <span className="fa fa-info-circle fa-fw"></span>
              {infoMessages.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorMessages.length > 0 && (
        <div className="row row-padding-top-1">
          <div className="col-sm-12 text-center">
            <div className="alert alert-danger alert-dismissible fade in">
              <span className="fa fa-exclamation-triangle fa-fw"></span>
              {errorMessages.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Button Row */}
      <div className="row row-padding-top-1">
        <div className="col-sm-8 col-md-8"></div>

        <div className="col-sm-4 col-md-4 text-right">
          <a href="/admin/create" className="btn btn-primary">
            <i className="fa fa-plus fa-fw"></i> 管理者追加
          </a>
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px 10px" }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "scroll",
            padding: "0 0",
            height: "500px",
          }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed table-hover"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                whiteSpace: "nowrap",
              }}
            >
              <thead>
                <tr className="primary">
                  <th className="text-center primary" style={{ width: "15%" }}>
                    管理者ID
                  </th>
                  <th className="text-center primary" style={{ width: "30%" }}>
                    管理者名
                  </th>
                  <th className="text-center primary" style={{ width: "25%" }}>
                    メールアドレス
                  </th>
                  <th className="text-center primary" style={{ width: "15%" }}>
                    登録日
                  </th>
                  <th className="text-center primary" style={{ width: "15%" }}>
                    操作
                  </th>
                </tr>
              </thead>

              <tbody>
                {records.map((e, index) => (
                  <tr key={index}>
                    <td className="text-center">{e.adminId}</td>
                    <td className="text-center">{e.adminName}</td>
                    <td className="text-center">{e.mailAddress}</td>
                    <td className="text-center">{e.createDatetime}</td>

                    <td className="text-center">
                      {/* Edit */}
                      <a
                        href={`/admin/edit/${e.companyId}/${e.adminId}`}
                        style={{ paddingRight: "8px" }}
                      >
                        <i className="fa fa-check fa-fw"></i>
                        更新
                      </a>

                      {/* Delete */}
                      <a
                        href={`/admin/delete/${e.companyId}/${e.adminId}`}
                        style={{ paddingRight: "8px" }}
                      >
                        <i className="fa fa-ban fa-fw"></i>
                        削除
                      </a>
                    </td>
                  </tr>
                ))}

                {/* No Records */}
                {records.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      管理者が見つかりませんでした。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
}