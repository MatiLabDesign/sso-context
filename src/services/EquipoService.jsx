import axios from "axios";
import { EQUIPO_URL } from "../constants/API_URL";

class EquipoService {
  getAllEquipos() {
    return axios.get(EQUIPO_URL);
  }

  createEquipo(equipo) {
    return axios.post(EQUIPO_URL, equipo);
  }
}

export default new EquipoService();
