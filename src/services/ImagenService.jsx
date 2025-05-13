import axios from "axios";
import { IMAGEN_URL } from "../constants/API_URL";

class ImagenService {

  getAllImagenes() {
    return axios.get(IMAGEN_URL);
  }

  getImagenById(id) {
    return axios.get(`${IMAGEN_URL}/${id}`);
  }

  createImagen(imagen) {
    return axios.post(IMAGEN_URL, imagen);
  }

  updateImagen (id, imagen) {
    return axios.put(`${IMAGEN_URL}/${id}`, imagen);
  }

  softDeleteImagenEquipo(id) {
    return axios.patch(`${IMAGEN_URL}/${id}`, { eliminado: true });
  }
}

export default new ImagenService();