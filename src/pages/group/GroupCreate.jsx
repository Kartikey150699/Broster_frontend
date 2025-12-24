import { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import UniversalModal from "../../components/UniversalModal";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../../components/NotificationBar";
import axios from "axios";
import CommonButton from "../../components/CommonButton";

export default function GroupCreate() {
  // ----------------------------------------------------
  // STATE
  // ----------------------------------------------------
  const [form, setForm] = useState({
    companyId: "11018",
    groupId: "",
    groupName: "",
    parentGroupId: "",
    shiftId: "",
    applyGroupId: "",
  });

  const navigate = useNavigate();
  const [parentGroupList, setParentGroupList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [applyGroupList, setApplyGroupList] = useState([]);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const [infoMessages, setInfoMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // ----------------------------------------------------
  // LOAD MASTER DATA (Mock for now)
  // ----------------------------------------------------
  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = () => {
    // Replace with API later
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
  // UPDATE FORM FIELD
  // ----------------------------------------------------
  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ----------------------------------------------------
  // SUBMIT HANDLER
  // ----------------------------------------------------
  const submitForm = async () => {
    const url = "http://localhost:8081/broster/v2/api/group/regist";

    try {
      console.log("Submitting CREATE:", form);
      // await axios.post(url, form);

      setConfirmVisible(false);

      // success notification
      setInfoMessages(["グループを登録しました。"]);
      setErrorMessages([]);

      // auto redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/group/list");
      }, 1500);
    } catch (err) {
      setErrorMessages(["登録に失敗しました。"]);
      setInfoMessages([]);
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // PAGE UI
  // ----------------------------------------------------
  return (
    <OwnerLayout title="グループ登録">
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
            グループ登録
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
              label="登録"
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
        message="この内容で登録しますか？ この操作は少々時間がかかる場合があります。"
        confirmText="登録"
        cancelText="キャンセル"
        confirmColor="btn-primary"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={submitForm}
      />
    </OwnerLayout>
  );
}
