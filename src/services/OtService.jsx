import axios from "axios";
import { OT_URL } from "../constants/API_URL";

class OtService {
  getAllOt() {
    return axios.get(OT_URL);
  }

  //REVISAR PARA TRAER ORDEN EN NAVEGACIÓN DE ETAPAS
  getOtById(id) {
    return axios.get(OT_URL + id);
  }

  createOt(orden) {
    return axios.post(OT_URL, orden);
  }
}

export default new OtService();
