import { useEffect, useState } from "react";
import axios from "axios";
import OwnerLayout from "../../layouts/OwnerLayout";
import UniversalModal from "../../components/UniversalModal";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8081/broster/v2/api/group/list",
        { companyId: "11018" }
      );

      const list = res.data.groupDetailInfoDtoList || [];
      setGroups(list.length > 0 ? list : TEST_DATA);

    } catch (err) {
      // No error messages - silently use test data
      setGroups(TEST_DATA);
    }
  };

  // Test data only
  const TEST_DATA = [
    {
      companyId: "11018",
      groupId: "G001",
      groupName: "営業部",
      parentGroupName: "本社",
      shiftName: "日勤",
      applyGroupName: "承認1",
      createDatetime: "2025/01/01",
      updateDatetime: "2025/02/01",
    },
    {
      companyId: "11018",
      groupId: "G002",
      groupName: "開発部",
      parentGroupName: "本社",
      shiftName: "夜勤",
      applyGroupName: "承認2",
      createDatetime: "2025/01/10",
      updateDatetime: "2025/02/05",
    },
  ];

  return (
    <OwnerLayout title="グループ一覧">
      {/* TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-file fa-fw"></i> グループ一覧
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="row row-padding-top-1">
        <div className="col-sm-8 col-md-8"></div>
        <div className="col-sm-4 col-md-4 text-right">
          <a href="/group/create" className="btn btn-primary">
            <i className="fa fa-plus fa-fw"></i> グループ追加
          </a>
        </div>
      </div>

      {/* TABLE */}
      <div className="row row-padding-top-1" style={{ padding: "10px 10px" }}>
        <div
          className="col-md-12"
          style={{
            overflowX: "auto",
            height: "500px",
            padding: 0,
          }}
        >
          <div className="panel panel-default">

            <table
              className="table table-bordered table-condensed table-hover"
              style={{ width: "100%", whiteSpace: "nowrap" }}
            >
              <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "#fff" }}>
                <tr className="primary">
                  <th className="text-center" style={{ width: "20%" }}>グループ名</th>
                  <th className="text-center" style={{ width: "20%" }}>親グループ名</th>
                  <th className="text-center" style={{ width: "15%" }}>シフト名</th>
                  <th className="text-center" style={{ width: "15%" }}>承認グループ</th>
                  <th className="text-center" style={{ width: "10%" }}>登録日</th>
                  <th className="text-center" style={{ width: "10%" }}>更新日</th>
                  <th className="text-center" style={{ width: "10%" }}>操作</th>
                </tr>
              </thead>

              <tbody>
                {groups.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      データがありません
                    </td>
                  </tr>
                )}

                {groups.map((g, i) => (
                  <tr key={i} className="text-center">
                    <td>{g.groupName}</td>
                    <td>{g.parentGroupName}</td>
                    <td>{g.shiftName}</td>
                    <td>{g.applyGroupName}</td>
                    <td className="text-center">{g.createDatetime}</td>
                    <td className="text-center">{g.updateDatetime}</td>

                    <td className="text-center">
                      <a
                        href={`/group/edit/${g.companyId}/${g.groupId}`}
                        style={{ paddingRight: 8 }}
                      >
                        <i className="fa fa-check fa-fw"></i> 更新
                      </a>

                      <a
                        style={{ paddingRight: 8, cursor: "pointer" }}
                        onClick={() => {
                            setSelectedGroup(g);
                            setDeleteModalVisible(true);
                        }}
                        >
                        <i className="fa fa-ban fa-fw"></i> 削除
                        </a>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>

      <UniversalModal
        visible={deleteModalVisible}
        title="削除確認"
        message="本当に削除しますか？"
        targetName={selectedGroup?.groupName}
        targetId={selectedGroup?.groupId}
        confirmText="削除する"
        cancelText="キャンセル"
        confirmColor="btn-danger"

        onCancel={() => setDeleteModalVisible(false)}

        onConfirm={() => {
            console.log("DELETE CONFIRMED:", selectedGroup);
            setDeleteModalVisible(false);
        }}
        />

    </OwnerLayout>
  );
}