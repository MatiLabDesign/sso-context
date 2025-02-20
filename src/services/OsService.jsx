import axios from "axios";
import { OS_URL } from "../constants/API_URL";

class OsService {
  getAllOs() {
    return axios.get(OS_URL);
  }
  
  getOsById(id) {
    return axios.get(`${OS_URL}/${id}`);
  }

  createOs(orden) {
    return axios.post(OS_URL, orden);
  }

  updateOs (id, orden) {
    return axios.put(`${OS_URL}/${id}`, orden);
  }

  softDeleteOs(id) {
    return axios.patch(`${OS_URL}/${id}`, { eliminado: true });
  }
}

export default new OsService();
