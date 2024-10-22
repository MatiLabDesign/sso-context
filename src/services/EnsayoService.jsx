import axios from "axios";
import { ENSAYO_URL } from "../constants/API_URL";

class EnsayoService {
  getAllEnsayos() {
    return axios.get(ENSAYO_URL);
  }

  createEnsayo(ensayo) {
    return axios.post(ENSAYO_URL, ensayo);
  }
}

export default new EnsayoService();
