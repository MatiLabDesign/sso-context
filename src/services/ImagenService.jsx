import axios from "axios";
import { IMAGEN_URL, IMAGEN_URL_GET } from "../constants/API_URL";  

class ImagenService {

  //este metodo revisar puede que no este funcionando
  getAllImagenes() {
    return axios.get(IMAGEN_URL);
  }


  getImagenByRecepcionId(recepcionId) {
    return axios.get(`${IMAGEN_URL}/recepcion/${recepcionId}`);
  }
  getImagenByInspeccionId(inspeccionId) {
    return axios.get(`${IMAGEN_URL}/inspeccionPcpVh60/${inspeccionId}`);
  }
  // getImagenByInspeccionId(inspeccionId) {
  //   return axios.get(`${IMAGEN_URL}/inspeccionPcpVh60/${inspeccionId}`);
  // }

  //----ARREGLADO
  createImagenRecepcion(formData) {
    return axios.post(`${IMAGEN_URL}/subirRecepcion`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  // createImagenInspeccionPcp(formData, modeloEquipo) {
  //   return axios.post(`${IMAGEN_URL}/subirInspeccion${modeloEquipo}`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   });
  // }

  createImagenInspeccionPcpVh60(formData) {
    return axios.post(`${IMAGEN_URL}/subirInspeccionVh60`, formData, {
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