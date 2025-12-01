import axios from "axios";

const API_BASE = "http://localhost:8081/broster/v2/api";

export const fetchAdminList = async () => {
  const response = await axios.get(`${API_BASE}/admin/list`, {
    withCredentials: true,
  });
  return response.data;
};