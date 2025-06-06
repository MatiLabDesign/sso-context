import axios from "axios";
import { IMAGEN_URL, IMAGEN_URL_GET } from "../constants/API_URL";  

class ImagenService {

  getAllImagenes() {
    return axios.get(IMAGEN_URL);
  }

  getImagenByRecepcionId(recepcionId) {
    return axios.get(`${IMAGEN_URL_GET}/${recepcionId}`);
  }

  createImagen(formData) {
    return axios.post(IMAGEN_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  updateImagen (id, formData) {
    return axios.put(`${IMAGEN_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  softDeleteImagenEquipo(id) {
    return axios.patch(`${IMAGEN_URL}/${id}`, { eliminado: true });
  }
}

export default new ImagenService();