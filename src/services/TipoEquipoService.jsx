import axios from "axios";
import { TIPO_EQUIPO_URL } from "../constants/API_URL";

class TipoEquipoService {
  getAllTipos() {
    return axios.get(TIPO_EQUIPO_URL);
  }

  createTipoEquipo(tipoEquipo) {
    return axios.post(TIPO_EQUIPO_URL, tipoEquipo);
  }
}

export default new TipoEquipoService();
