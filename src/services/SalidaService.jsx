import axios from "axios";
import { SALIDA_URL } from "../constants/API_URL";

class SalidaService {
  // getAllClientes() {
  //   return axios.get(CLIENTE_URL);
  // }

  createSalida(salida) {
    return axios.post(SALIDA_URL, salida);
  }
}

export default new SalidaService();
