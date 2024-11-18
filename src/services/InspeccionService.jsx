import axios from "axios";
import { INSPECCION_URL } from "../constants/API_URL";

class InspeccionService {
  getAllInspecciones() {
    return axios.get(INSPECCION_URL);
  }

  createInspeccion(inspeccion) {
    return axios.post(INSPECCION_URL, inspeccion);
  }

  getInspeccionById(id) {
    return axios.get(`${INSPECCION_URL}/${id}`);
  }

  updateInspeccion(id, inspeccion) {
    return axios.put(`${INSPECCION_URL}/${id}`, inspeccion);
  }

  softDeleteInspeccion(id) {
    return axios.patch(`${INSPECCION_URL}/${id}`, { eliminado: true });
  }
}

export default new InspeccionService();
