import React, { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import { useNavigate } from "react-router-dom";

export default function TemplateList() {
  const navigate = useNavigate();

  const [templateList, setTemplateList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState("");
  const [deleteTemplateName, setDeleteTemplateName] = useState("");

  // Auto hide notifications
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  // Load templates (Mock until API)
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // MOCK (Replace later with backend API)
        const mock = [
          {
            templateId: "TMP001",
            templateName: "基本シフト",
            createDatetime: "2024-01-20",
          },
          {
            templateId: "TMP002",
            templateName: "早番テンプレート",
            createDatetime: "2024-02-05",
          },
        ];

        setTemplateList(mock);
      } catch (e) {
        setErrorMessages(["テンプレート一覧の取得に失敗しました。"]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Delete action (Replace with API later)
  function handleDelete() {
    setInfoMessages([`テンプレート「${deleteTemplateId}」を削除しました。（仮動作）`]);
    setDeleteModalVisible(false);
  }

  if (loading) {
    return <OwnerLayout title="テンプレート一覧">読み込み中...</OwnerLayout>;
  }

  return (
    <OwnerLayout title="テンプレート一覧">
      <NotificationBar infoMessages={infoMessages} errorMessages={errorMessages} />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> テンプレート一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="row row-padding-top-1">
       <div className="col-md-10 col-md-offset-1 text-right template-add-btn">
        <button
            className="btn btn-primary"
            onClick={() => navigate("/template/create")}
        >
          <i className="fa fa-plus fa-fw"></i> テンプレート登録
        </button>
       </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px" }}>
        <div
          className="col-md-10 col-md-offset-1"
          style={{ overflowX: "scroll", height: "500px", padding: 0 }}
        >
          <div className="panel panel-default">
            <table className="table table-bordered table-condensed table-hover">
              <thead>
                <tr className="primary">
                  <th className="text-center" style={{ width: "60%" }}>テンプレート名</th>
                  <th className="text-center" style={{ width: "20%" }}>登録日</th>
                  <th className="text-center" style={{ width: "20%" }}>操作</th>
                </tr>
              </thead>

              <tbody>
                {templateList.map((t, index) => (
                  <tr key={index}>
                    <td className="text-left">{t.templateName}</td>
                    <td className="text-center">{t.createDatetime}</td>

                    <td className="text-center">
                      {/* UPDATE */}
                      <a
                        style={{ paddingRight: 8, cursor: "pointer" }}
                        onClick={() => navigate(`/template/edit/${t.templateId}`)}
                      >
                        <i className="fa fa-check fa-fw"></i> 更新
                      </a>

                      {/* DELETE */}
                      <a
                        style={{ paddingRight: 8, cursor: "pointer" }}
                        onClick={() => {
                          setDeleteTemplateId(t.templateId);
                          setDeleteTemplateName(t.templateName)
                          setDeleteModalVisible(true);
                        }}
                      >
                        <i className="fa fa-ban fa-fw"></i> 削除
                      </a>
                    </td>
                  </tr>
                ))}

                {templateList.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      テンプレートが見つかりません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      <UniversalModal
        visible={deleteModalVisible}
        title="削除確認"
        message="このテンプレートを削除しますか？"
        targetName={deleteTemplateName}
        confirmText="削除"
        cancelText="キャンセル"
        confirmColor="btn-danger"
        cancelColor="btn-default"
        iconClass="fa fa-exclamation-triangle"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />
    </OwnerLayout>
  );
}