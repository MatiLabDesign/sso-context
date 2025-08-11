import axios from "axios";
import { SALIDA_URL } from "../constants/API_URL";

class SalidaService {
  getAllSalidas() {
    return axios.get(SALIDA_URL);
  }

  createSalida(salida) {
    return axios.post(SALIDA_URL, salida);
  }

  getSalidaById(id) {
    return axios.get(`${SALIDA_URL}/${id}`);
  }

  updateSalida(id, salida) {
    return axios.put(`${SALIDA_URL}/${id}`, salida);
  }

  softDeleteSalida(id) {
    return axios.patch(`${SALIDA_URL}/${id}/softdelete`, { eliminado: true });
  }

  
}

export default new SalidaService();
