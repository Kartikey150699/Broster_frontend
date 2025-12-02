import axios from "axios";

const API_BASE = "http://localhost:8081/broster/v2/api/userManage";

export const fetchAdminList = async (companyId, adminId = "") => {
  return axios.post(
    `${API_BASE}/getAdminList`,
    { companyId, adminId },
    { withCredentials: true }
  ).then(res => res.data);
};