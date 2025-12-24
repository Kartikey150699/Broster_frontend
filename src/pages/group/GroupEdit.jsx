import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import UniversalModal from "../../components/UniversalModal";
import NotificationBar from "../../components/NotificationBar";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/CommonButton";

import axios from "axios";

export default function GroupEdit() {
  const { companyId, groupId } = useParams(); // /group/edit/:companyId/:groupId

  // ----------------------------------------------------
  // STATE
  // ----------------------------------------------------
  const [form, setForm] = useState({
    companyId: companyId || "",
    groupId: groupId || "",
    groupName: "",
    parentGroupId: "",
    shiftId: "",
    targetDate: "", // shift apply date (edit only)
    applyGroupId: "",
  });

  const [parentGroupList, setParentGroupList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [applyGroupList, setApplyGroupList] = useState([]);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const navigate = useNavigate();
  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ----------------------------------------------------
  // INITIAL LOAD
  // ----------------------------------------------------
  useEffect(() => {
    loadMasterData();
    loadGroupDetail();
  }, []);

  // ----------------------------------------------------
  // LOAD MASTER DATA (Mock for now)
  // ----------------------------------------------------
  const loadMasterData = () => {
    setParentGroupList([
      { id: "", name: "なし" },
      { id: "P001", name: "本社" },
      { id: "P002", name: "支店A" },
    ]);

    setShiftList([
      { id: "", name: "-- 未選択 --" },
      { id: "S01", name: "日勤" },
      { id: "S02", name: "夜勤" },
    ]);

    setApplyGroupList([
      { id: "", name: "-- 自動作成 --" },
      { id: "A01", name: "承認1" },
      { id: "A02", name: "承認2" },
    ]);
  };

  // ----------------------------------------------------
  // LOAD EXISTING GROUP DATA (Mock)
  // ----------------------------------------------------
  const loadGroupDetail = async () => {
    try {
      console.log("Loading group:", companyId, groupId);

      // Replace with actual GET API later:
      // const res = await axios.post("http://localhost:8081/broster/v2/api/group/find", { companyId, groupId });

      // TEST DATA
      const mock = {
        groupName: "営業部",
        parentGroupId: "P001",
        shiftId: "S01",
        targetDate: "2025-02-01",
        applyGroupId: "A01",
      };

      setForm({
        ...form,
        ...mock,
      });
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  };

  // ----------------------------------------------------
  // FORM FIELD UPDATE
  // ----------------------------------------------------
  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ----------------------------------------------------
  // SUBMIT UPDATE
  // ----------------------------------------------------
  const submitForm = async () => {
    const url = "http://localhost:8081/broster/v2/api/group/update";

    try {
      console.log("Submitting UPDATE:", form);
      // await axios.post(url, form);

      setConfirmVisible(false);

      // success notification
      setInfoMessages(["グループを更新しました。"]);
      setErrorMessages([]);

      // auto redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/group/list");
      }, 1500);
    } catch (err) {
      setErrorMessages(["更新に失敗しました。"]);
      setInfoMessages([]);
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // PAGE UI
  // ----------------------------------------------------
  return (
    <OwnerLayout title="グループ更新">
      {/* Notification Bar */}
      <NotificationBar
        infoMessages={infoMessages}
        errorMessages={errorMessages}
      />

      {/* PAGE TITLE */}
      <div className="row row-padding-top-1">
        <div className="col-md-12">
          <h2>
            <i className="fa fa-group fa-fw"></i>
            グループ更新
          </h2>
          <hr className="star-primary" />
        </div>
      </div>

      {/* FORM */}
      <div className="form-horizontal">
        {/* GROUP NAME */}
        <div className="row row-padding-top-2">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">
              グループ名 <i className="fa fa-pencil"></i>
            </label>
          </div>
          <div className="col-md-4 col-sm-6">
            <input
              type="text"
              className="form-control"
              value={form.groupName}
              onChange={(e) => updateField("groupName", e.target.value)}
            />
          </div>
        </div>

        {/* PARENT GROUP */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">親グループ</label>
          </div>
          <div className="col-md-4 col-sm-6">
            <select
              className="form-control"
              value={form.parentGroupId}
              onChange={(e) => updateField("parentGroupId", e.target.value)}
            >
              {parentGroupList.map((pg) => (
                <option key={pg.id} value={pg.id}>
                  {pg.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SHIFT */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">
              シフト <i className="fa fa-pencil"></i>
            </label>
          </div>
          <div className="col-md-4 col-sm-6">
            <select
              className="form-control"
              value={form.shiftId}
              onChange={(e) => updateField("shiftId", e.target.value)}
            >
              {shiftList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SHIFT APPLY DATE */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">
              シフト変更適用日 <i className="fa fa-pencil"></i>
            </label>
          </div>
          <div className="col-md-4 col-sm-6">
            <input
              type="date"
              className="form-control"
              value={form.targetDate}
              onChange={(e) => updateField("targetDate", e.target.value)}
            />
          </div>
        </div>

        {/* APPLY GROUP */}
        <div className="row row-padding-top-1">
          <div className="col-md-offset-2 col-md-2 col-sm-offset-1 col-sm-3">
            <label className="input-label">承認グループ</label>
          </div>
          <div className="col-md-4 col-sm-6">
            <select
              className="form-control"
              value={form.applyGroupId}
              onChange={(e) => updateField("applyGroupId", e.target.value)}
            >
              {applyGroupList.map((ag) => (
                <option key={ag.id} value={ag.id}>
                  {ag.name}
                </option>
              ))}
            </select>

            <span style={{ color: "red", fontSize: 12 }}>
              ※「自動作成」の場合は、承認グループ更新で承認者を設定してください
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="row row-padding-top-3">
          <div className="col-md-12 text-center">
            <CommonButton
              label="更新"
              icon="plus"
              color="primary"
              onClick={() => setConfirmVisible(true)}
            />

            <CommonButton
              label="戻る"
              icon="ban"
              color="secondary"
              style={{ marginLeft: 10 }}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      <UniversalModal
        visible={confirmVisible}
        title="確認"
        message="この内容で更新しますか？ この操作は少々時間がかかる場合があります。"
        confirmText="更新"
        cancelText="キャンセル"
        confirmColor="btn-primary"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={submitForm}
      />
    </OwnerLayout>
  );
}
