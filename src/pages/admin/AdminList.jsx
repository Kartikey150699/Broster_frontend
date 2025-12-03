import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import DeleteModal from "../../components/DeleteModal";

/**
 * Fetches real data from Spring Boot API
 */
export default function AdminList() {
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetAdmin, setTargetAdmin] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // ------- API CALL (REAL DATA) -------
  useEffect(() => {
    fetchAdminList();
  }, []);

  const fetchAdminList = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8081/broster/v2/api/userManage/getAdminList",
        {
          companyId: "11018",   // required by backend
          adminId: ""           // backend allows empty string
        },
        {
          withCredentials: true,
        }
      );

      console.log("API Response:", response.data);

      // For backend response:
      // adminRecordDtoList → real data
      if (response.data?.adminRecordDtoList) {
        setRecords(response.data.adminRecordDtoList);
      }

      if (response.data?.infoMessages) {
        setInfoMessages(response.data.infoMessages);
      }

      if (response.data?.errorMessages) {
        setErrorMessages(response.data.errorMessages);
      }

    } catch (error) {
      console.error("Failed to fetch admin list:", error);
      setErrorMessages(["サーバーとの通信に失敗しました。"]);
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async () => {
  if (!targetAdmin) return;

  try {
    const payload = {
      companyId: targetAdmin.companyId,
      adminId: targetAdmin.adminId
    };

    const res = await axios.delete(
      "http://localhost:8081/broster/v2/api/userManage/deleteAdmin",
      {
        data: payload,
        withCredentials: true
      }
    );

    // ===== SUCCESS =====
    if (res.data.resultCode === "00000") {
      setShowDeleteModal(false);

      // Show success notification
      setDeleteSuccess(`管理者「${targetAdmin.adminName}」を削除しました。`);
      setTimeout(() => setDeleteSuccess(""), 4000);

      fetchAdminList();
      return;
    }

    // ===== FAILURE (HTTP OK but backend error) =====
    setDeleteError("削除に失敗しました。");
    setTimeout(() => setDeleteError(""), 4000);

  } catch (err) {
    console.error("DELETE ERROR:", err);

    // ===== SERVER ERROR =====
    setDeleteError("サーバーエラーが発生しました。");
    setTimeout(() => setDeleteError(""), 4000);
  }
};

  return (
    <AdminLayout title="管理者一覧">

      {/* ===== TOP NOTIFICATION BAR ===== */}

      {deleteSuccess && (
        <div className="row" style={{ marginTop: "15px" }}>
          <div className="col-md-12">
            <div className="alert alert-info text-center">
              <i className="fa fa-check-circle"></i> {deleteSuccess}
            </div>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="row" style={{ marginTop: "15px" }}>
          <div className="col-md-12">
            <div className="alert alert-danger text-center">
              <i className="fa fa-exclamation-triangle"></i> {deleteError}
            </div>
          </div>
        </div>
      )}

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> 管理者一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-muted" style={{ padding: 20 }}>
          <i className="fa fa-spinner fa-spin fa-2x"></i>
          <p>読み込み中…</p>
        </div>
      )}

      {/* INFO MESSAGES */}
      {infoMessages.length > 0 && (
        <div className="row row-padding-top-1">
          <div className="col-sm-12 text-center">
            <div
              className="alert alert-info alert-dismissible fade in"
              role="alert"
            >
              <span className="fa fa-info-circle fa-fw"></span>
              {infoMessages.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ERROR MESSAGES */}
      {errorMessages.length > 0 && (
        <div className="row row-padding-top-1">
          <div className="col-sm-12 text-center">
            <div
              className="alert alert-danger alert-dismissible fade in"
              role="alert"
            >
              <span className="fa fa-exclamation-triangle fa-fw"></span>
              {errorMessages.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD BUTTON */}
      <div className="row row-padding-top-1">
        <div className="col-sm-8 col-md-8"></div>
        <div className="col-sm-4 col-md-4 text-right">
          <a href="/admin/create" className="btn btn-primary">
            <i className="fa fa-plus fa-fw"></i> 管理者追加
          </a>
        </div>
      </div>

      {/* TABLE */}
      {!loading && (
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
                        <a
                          href={`/admin/edit/${e.companyId}/${e.adminId}`}
                          style={{ paddingRight: 8 }}
                        >
                          <i className="fa fa-check fa-fw"></i> 更新
                        </a>

                        <a
                          onClick={() => {
                            setTargetAdmin({ companyId: e.companyId, adminId: e.adminId, adminName: e.adminName });
                            setShowDeleteModal(true);
                          }}
                          style={{ paddingRight: 8, cursor: "pointer" }}
                        >
                          <i className="fa fa-ban fa-fw"></i> 削除
                        </a>
                      </td>
                    </tr>
                  ))}

                  {/* NO DATA */}
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
      )}

      <DeleteModal
      visible={showDeleteModal}
  title="削除確認"
  message="この管理者を削除しますか？"
  targetName={targetAdmin?.adminName}
  targetId={targetAdmin?.adminId}
  onCancel={() => setShowDeleteModal(false)}
  onConfirm={deleteAdmin}
/>
    </AdminLayout>
  );
}