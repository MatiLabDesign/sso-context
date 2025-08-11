import axios from "axios";
import { RECEPCION_URL } from "../constants/API_URL";

class RecepcionService {
  getAllRecepcion() {
    return axios.get(RECEPCION_URL);
  }

  getRecepcionById(id) {
    return axios.get(`${RECEPCION_URL}/${id}`);
  }

  createRecepcion(recepcion) {
    return axios.post(RECEPCION_URL, recepcion);
  }

  updateRecepcion(id, recepcion) {
    return axios.put(`${RECEPCION_URL}/${id}`, recepcion);
  }

  updateRecepcionImagen(id, datosJson, imagenes) {
    const formData = new FormData();
    formData.append("jsonData", JSON.stringify(datosJson));
    imagenes.forEach((img, index) => {
      if (img) {
        formData.append(`imagen${index}`, img);
      }
    });

    return axios.post(`${RECEPCION_URL}/${id}/subir-imagen`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  softDeleteRecepcion(id) {
    return axios.patch(`${RECEPCION_URL}/${id}/softdelete`, { eliminado: true });
  }
}

export default new RecepcionService();

