import axios from "axios";
import { TIPO_EQUIPO_URL } from "../constants/API_URL";

class TipoEquipoService {

  getAllTipos() {
    return axios.get(TIPO_EQUIPO_URL);
  }

  getTipoById(id) {
    return axios.get(`${TIPO_EQUIPO_URL}/${id}`);
  }

  createTipoEquipo(tipoEquipo) {
    return axios.post(TIPO_EQUIPO_URL, tipoEquipo);
  }

  updateTipoEquipo (id, tipoEquipo) {
    return axios.put(`${TIPO_EQUIPO_URL}/${id}`, tipoEquipo);
  }

  softDeleteTipoEquipo(id) {
    return axios.patch(`${TIPO_EQUIPO_URL}/${id}`, { eliminado: true });
  }
}

export default new TipoEquipoService();
