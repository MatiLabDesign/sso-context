import axios from "axios";
import { OT_URL } from "../constants/API_URL";

class OtService {
  getAllOt() {
    return axios.get(OT_URL);
  }
  
  getOtById(id) {
    return axios.get(`${OT_URL}/${id}`);
  }

  createOt(orden) {
    return axios.post(OT_URL, orden);
  }

  updateOt (id, orden) {
    return axios.put(`${OT_URL}/${id}`, orden);
  }

  softDeleteOt(id) {
    return axios.patch(`${OT_URL}/${id}`, { eliminado: true });
  }
}

export default new OtService();
