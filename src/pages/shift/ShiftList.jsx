import React, { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import NotificationBar from "../../components/NotificationBar";
import UniversalModal from "../../components/UniversalModal";
import { useNavigate } from "react-router-dom";

export default function ShiftList() {
  const navigate = useNavigate();

  // ------------------------------
  // State
  // ------------------------------
  const [loading, setLoading] = useState(true);
  const [shiftList, setShiftList] = useState([]);
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteShiftName, setDeleteShiftName] = useState("");

  // ------------------------------
  // Auto-hide notifications (2.5 sec)
  // ------------------------------
  useEffect(() => {
    if (infoMessages.length || errorMessages.length) {
      const timer = setTimeout(() => {
        setInfoMessages([]);
        setErrorMessages([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [infoMessages, errorMessages]);

  // ------------------------------
  // Load mock data (Replace with API later)
  // ------------------------------
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const mock = [
          {
            shiftName: "早番",
            groupShowDtoList: [
              { groupName: "営業部" },
              { groupName: "開発部" }
            ]
          },
          {
            shiftName: "遅番",
            groupShowDtoList: [
              { groupName: "企画部" }
            ]
          }
        ];

        setShiftList(mock);

      } catch (e) {
        setErrorMessages(["シフト一覧の取得に失敗しました。"]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ------------------------------
  // Delete Action
  // ------------------------------
  function handleDelete() {
    // TODO: API integration
    setInfoMessages([`「${deleteShiftName}」を削除しました。（仮動作）`]);
    setDeleteModalVisible(false);
  }

  if (loading) {
    return <OwnerLayout title="シフト一覧">読み込み中...</OwnerLayout>;
  }

  return (
    <OwnerLayout title="シフト一覧">
      {/* Notifications */}
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-list fa-fw"></i> シフト一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="row row-padding-top-1">
        <div className="col-sm-8 col-md-8"></div>
        <div className="col-sm-4 col-md-4 text-right admin-add-btn">
          <a href="/shift/create" className="btn btn-primary">
            <i className="fa fa-plus fa-fw"></i> シフト追加
          </a>
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px 10px" }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "visible",
            padding: "0 0",
            height: "auto"
          }}
        >
          <div className="panel panel-default">
            <table
              className="table table-bordered table-condensed table-hover"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                whiteSpace: "normal"
              }}
            >
              <thead>
                <tr className="primary">
                  <th className="text-center primary" style={{ width: "30%" }}>
                    シフト名
                  </th>
                  <th className="text-center primary" style={{ width: "50%" }}>
                    利用グループ
                  </th>
                  <th className="text-center primary" style={{ width: "12%" }}>
                    操作
                  </th>
                </tr>
              </thead>

              <tbody>
                {shiftList.map((s, index) => (
                  <tr key={index}>
                    {/* SHIFT NAME */}
                    <td className="text-left">{s.shiftName}</td>

                    {/* GROUPS */}
                    <td className="text-left">
                      {s.groupShowDtoList.map((g, idx) => (
                        <span
                          key={idx}
                          className="label label-info"
                          style={{
                            fontSize: 12,
                            lineHeight: "2",
                            marginRight: 5
                          }}
                        >
                          {g.groupName}
                        </span>
                      ))}
                    </td>

                    {/* ACTION LINKS */}
                    <td className="text-center">
                      {/* UPDATE */}
                      <a
                        style={{ paddingRight: 8 }}
                        onClick={() => navigate(`/shift/edit/${s.shiftName}`)}
                      >
                        <i className="fa fa-check fa-fw"></i> 更新
                      </a>

                      {/* DELETE */}
                      <a
                        style={{ paddingRight: 8, cursor: "pointer" }}
                        onClick={() => {
                          setDeleteShiftName(s.shiftName);
                          setDeleteModalVisible(true);
                        }}
                      >
                        <i className="fa fa-ban fa-fw"></i> 削除
                      </a>
                    </td>
                  </tr>
                ))}

                {/* NO DATA */}
                {shiftList.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-3">
                      シフトが見つかりませんでした。
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* UNIVERSAL MODAL */}
      <UniversalModal
        visible={deleteModalVisible}
        title="削除確認"
        message="このシフトを削除しますか？"
        targetName={deleteShiftName}
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