import axios from "axios";
import { EQUIPO_URL } from "../constants/API_URL";

class EquipoService {
  getAllEquipos() {
    return axios.get(EQUIPO_URL);
  }

  getEquipoById(id) {
    return axios.get(`${EQUIPO_URL}/${id}`);
  }

  createEquipo(equipo) {
    return axios.post(EQUIPO_URL, equipo);
  }

  updateEquipo (id, equipo) {
    return axios.put(`${EQUIPO_URL}/${id}`, equipo);
  }

  softDeleteEquipo(id) {
    return axios.patch(`${EQUIPO_URL}/${id}/softdelete`, { eliminado: true });
  }
}

export default new EquipoService();
