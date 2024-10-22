import axios from "axios";
import { INSPECCION_URL } from "../constants/API_URL";

class InspeccionService {
  getAllInspecciones() {
    return axios.get(INSPECCION_URL);
  }

  createInspeccion(inspeccion) {
    return axios.post(INSPECCION_URL, inspeccion);
  }
}

export default new InspeccionService();
