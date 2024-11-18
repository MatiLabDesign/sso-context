import axios from "axios";
import { RECEPCION_URL } from "../constants/API_URL";

class RecepcionService {
  getAllRecepcion() {
    return axios.get(RECEPCION_URL);
  }

  getRecepcionById(id) {
    return axios.get(`${RECEPCION_URL}/${id}`);
  }

  createRecepcion(recepcion) {
    return axios.post(RECEPCION_URL, recepcion);
  }

  updateRecepcion(id, recepcion) {
    return axios.put(`${RECEPCION_URL}/${id}`, recepcion);
  }

  softDeleteRecepcion(id) {
    return axios.patch(`${RECEPCION_URL}/${id}`, { eliminado: true });
  }
}

export default new RecepcionService();
