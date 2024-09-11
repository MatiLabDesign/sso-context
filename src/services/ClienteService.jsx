import axios from "axios";
import { CLIENTE_URL } from "../constants/API_URL";

class ClienteService {
  getAllClientes() {
    return axios.get(CLIENTE_URL);
  }

  createCliente(cliente) {
    return axios.post(CLIENTE_URL, cliente);
  }
}

export default new ClienteService();
