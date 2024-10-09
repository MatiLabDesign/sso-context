import axios from "axios";
import { ENSAYO_URL } from "../constants/API_URL";

class EnsayoService {
  // getAllClientes() {
  //   return axios.get(CLIENTE_URL);
  // }

  createEnsayo(ensayo) {
    return axios.post(ENSAYO_URL, ensayo);
  }
}

export default new EnsayoService();
