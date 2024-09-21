import axios from "axios";
import { OT_URL } from "../constants/API_URL";

class OtService {
  getAllOt() {
    return axios.get(OT_URL);
  }

  createOt(orden) {
    return axios.post(OT_URL, orden);
  }
}

export default new OtService();
