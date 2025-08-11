import axios from "axios";
import { IMAGEN_ENSAYO_PCPCOUGAR_URL, IMAGEN_ENSAYO_PCPDV1_URL, IMAGEN_ENSAYO_PCPMINIG_URL, IMAGEN_ENSAYO_PCPVH60_URL, IMAGEN_INSPECCION_PCPCOUGAR_URL, IMAGEN_INSPECCION_PCPDV1_URL, IMAGEN_INSPECCION_PCPMINIG_URL, IMAGEN_INSPECCION_PCPVH60_URL, IMAGEN_RECEPCION_URL, IMAGEN_URL, RECEPCION_URL } from "../constants/API_URL";  

class ImagenService {

  //este metodo revisar puede que no este funcionando
  getAllImagenes() {
    return axios.get(IMAGEN_URL);
  }
  getImagenByRecepcionId(recepcionId) {
    return axios.get(`${IMAGEN_RECEPCION_URL}/${recepcionId}`);
  }
  
  getImagenByInspeccionVh60Id(inspeccionVh60Id) {
    return axios.get(`${IMAGEN_INSPECCION_PCPVH60_URL}/${inspeccionVh60Id}`);
  }
  getImagenByInspeccionDv1Id(inspeccionDv1Id) {
    return axios.get(`${IMAGEN_INSPECCION_PCPDV1_URL}/${inspeccionDv1Id}`);
  }
  getImagenByInspeccionMiniGId(inspeccionMiniGId) {
    return axios.get(`${IMAGEN_INSPECCION_PCPMINIG_URL}/${inspeccionMiniGId}`);
  }
  getImagenByInspeccionCougarId(inspeccionCougarId) {
    return axios.get(`${IMAGEN_INSPECCION_PCPCOUGAR_URL}/${inspeccionCougarId}`);
  }

  getImagenByEnsayoVh60Id(ensayoVh60Id) {
    return axios.get(`${IMAGEN_ENSAYO_PCPVH60_URL}/${ensayoVh60Id}`);
  }
  getImagenByEnsayoDv1Id(ensayoDv1Id) {
    return axios.get(`${IMAGEN_ENSAYO_PCPDV1_URL}/${ensayoDv1Id}`);
  }
  getImagenByEnsayoMiniGId(ensayoMiniGId) {
    return axios.get(`${IMAGEN_ENSAYO_PCPMINIG_URL}/${ensayoMiniGId}`);
  }
  getImagenByEnsayoCougarId(ensayoCougarId) {
    return axios.get(`${IMAGEN_ENSAYO_PCPCOUGAR_URL}/${ensayoCougarId}`);
  }

  // Crear Imagenes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  createImagenRecepcion(formData) {
    return axios.post(`${IMAGEN_RECEPCION_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  createImagenInspeccionPcpVh60(formData) {
    return axios.post(`${IMAGEN_INSPECCION_PCPVH60_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  createImagenInspeccionPcpDv1(formData) {
    return axios.post(`${IMAGEN_INSPECCION_PCPDV1_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  createImagenInspeccionPcpMiniG(formData) {
    return axios.post(`${IMAGEN_INSPECCION_PCPMINIG_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  createImagenInspeccionPcpCougar(formData) {
    return axios.post(`${IMAGEN_INSPECCION_PCPCOUGAR_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  
  createImagenEnsayoPcpVh60(formData) {
    return axios.post(`${IMAGEN_ENSAYO_PCPVH60_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  createImagenEnsayoPcpDv1(formData) {
    return axios.post(`${IMAGEN_ENSAYO_PCPDV1_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  createImagenEnsayoPcpMiniG(formData) {
    return axios.post(`${IMAGEN_ENSAYO_PCPMINIG_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  createImagenEnsayoPcpCougar(formData) {
    return axios.post(`${IMAGEN_ENSAYO_PCPCOUGAR_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  updateImagenRecepcion (id, formData) {
    return axios.put(`${IMAGEN_RECEPCION_URL}/${id}`, formData, {
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