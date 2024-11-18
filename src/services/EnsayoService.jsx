import axios from "axios";
import { ENSAYO_URL } from "../constants/API_URL";

class EnsayoService {
  getAllEnsayos() {
    return axios.get(ENSAYO_URL);
  }

  createEnsayo(ensayo) {
    return axios.post(ENSAYO_URL, ensayo);
  }

  getEnsayoById(id) {
    return axios.get(`${ENSAYO_URL}/${id}`);
  }

  updateEnsayo(id, ensayo) {
    return axios.put(`${ENSAYO_URL}/${id}`, ensayo);
  }

  softDeleteEnsayo(id) {
    return axios.patch(`${ENSAYO_URL}/${id}`, { eliminado: true });
  }
}

export default new EnsayoService();
