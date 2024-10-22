import axios from "axios";
import { SALIDA_URL } from "../constants/API_URL";

class SalidaService {
  getAllSalidas() {
    return axios.get(SALIDA_URL);
  }

  createSalida(salida) {
    return axios.post(SALIDA_URL, salida);
  }
}

export default new SalidaService();
