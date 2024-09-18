import axios from "axios";
import { OT_URL } from "../constants/API_URL";

class OtService {
  getAllOt() {
    return axios.get(OT_URL);
  }

  createOt(ot) {
    return axios.post(OT_URL, ot);
  }
}

export default new OtService();
