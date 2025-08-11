import axios from "axios";
import { CLIENTE_URL } from "../constants/API_URL";

class ClienteService {
  // Obtener todos lo clientes
  getAllClientes() {
    return axios.get(CLIENTE_URL);
  }
  // Obtener un cliente específico por ID
  getClienteById(id) {
    return axios.get(`${CLIENTE_URL}/${id}`);
  }
  // Crear cliente
  createCliente(cliente) {
    return axios.post(CLIENTE_URL, cliente);
  }
   // Actualizar un cliente por ID
  updateCliente(id, cliente) {
    return axios.put(`${CLIENTE_URL}/${id}`, cliente);
  }
  // Eliminar un cliente de forma lógica (soft delete)
  softDeleteCliente(id) {
    return axios.patch(`${CLIENTE_URL}/${id}/softdelete`, { eliminado: true });
  }
}

export default new ClienteService();
