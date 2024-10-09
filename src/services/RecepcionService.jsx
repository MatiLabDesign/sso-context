import axios from "axios";
import { RECEPCION_URL } from "../constants/API_URL";

class RecepcionService {
  // getAllClientes() {
  //   return axios.get(CLIENTE_URL);
  // }

  createRecepcion(recepcion) {
    return axios.post(RECEPCION_URL, recepcion);
  }
}

export default new RecepcionService();
