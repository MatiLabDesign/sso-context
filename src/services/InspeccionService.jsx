import axios from "axios";
import { INSPECCION_PCPCOUGAR_URL, INSPECCION_PCPDV1_URL, INSPECCION_PCPMINIG_URL, INSPECCION_PCPVH60_URL, INSPECCION_URL } from "../constants/API_URL";

class InspeccionService {
  getAllInspecciones() {
    return axios.get(INSPECCION_URL);
  }

  createInspeccion(inspeccion, modeloEquipo) {
    return axios.post(`${INSPECCION_URL}/${modeloEquipo}`, inspeccion);
  }

  createInspeccionVh60(inspeccion) {
    return axios.post(`${INSPECCION_PCPVH60_URL}`, inspeccion);
  }
  createInspeccionDv1(inspeccion) {
    return axios.post(`${INSPECCION_PCPDV1_URL}`, inspeccion);
  }
  createInspeccionMinig(inspeccion) {
    return axios.post(`${INSPECCION_PCPMINIG_URL}`, inspeccion);
  }
  createInspeccionCougar(inspeccion) {
    return axios.post(`${INSPECCION_PCPCOUGAR_URL}`, inspeccion);
  }

  getInspeccionVh60ById(id) {
    return axios.get(`${INSPECCION_PCPVH60_URL}/${id}`);
  }
  getInspeccionDv1ById(id) {
    return axios.get(`${INSPECCION_PCPDV1_URL}/${id}`);
  }
  getInspeccionMinigById(id) {
    return axios.get(`${INSPECCION_PCPMINIG_URL}/${id}`);
  }
  getInspeccionCougarById(id) {
    return axios.get(`${INSPECCION_PCPCOUGAR_URL}/${id}`);
  }

  updateInspeccionVh60(id, inspeccion) {
    return axios.put(`${INSPECCION_PCPVH60_URL}/${id}`, inspeccion);
  }
  updateInspeccionDv1(id, inspeccion) {
    return axios.put(`${INSPECCION_PCPDV1_URL}/${id}`, inspeccion);
  }
  updateInspeccionMinig(id, inspeccion) {
    return axios.put(`${INSPECCION_PCPMINIG_URL}/${id}`, inspeccion);
  }
  updateInspeccionCougar(id, inspeccion) {
    return axios.put(`${INSPECCION_PCPCOUGAR_URL}${id}`, inspeccion);
  }

  softDeleteInspeccionVh60(id) {
    return axios.patch(`${INSPECCION_PCPVH60_URL}/${id}/softdelete`, { eliminado: true });
  }
  softDeleteInspeccionDv1(id) {
    return axios.patch(`${INSPECCION_PCPDV1_URL}/${id}/softdelete`, { eliminado: true });
  }
  softDeleteInspeccionMinig(id) {
    return axios.patch(`${INSPECCION_PCPMINIG_URL}/${id}/softdelete`, { eliminado: true });
  }
  softDeleteInspeccionCougar(id) {
    return axios.patch(`${INSPECCION_PCPCOUGAR_URL}/${id}/softdelete`, { eliminado: true });
  }
  
}

export default new InspeccionService();
