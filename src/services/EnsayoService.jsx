import axios from "axios";
import { ENSAYO_URL } from "../constants/API_URL";

class EnsayoService {
  getAllEnsayos() {
    return axios.get(ENSAYO_URL);
  }

  createEnsayoVh60(ensayo) {
    return axios.post(`${ENSAYO_PCPVH60_URL}`, ensayo);
  }
  createEnsayoDv1(ensayo) {
    return axios.post(`${ENSAYO_PCPDV1_URL}`, ensayo);
  }
  createEnsayoMinig(ensayo) {
    return axios.post(`${ENSAYO_PCPMINIG_URL}`, ensayo);
  }
  createEnsayoCougar(ensayo) {
    return axios.post(`${ENSAYO_PCPCOUGAR_URL}`, ensayo);
  }


  getEnsayoVh60ById(id) {
    return axios.get(`${ENSAYO_PCPVH60_URL}/${id}`);
  }
  getEnsayoDv1ById(id) {
    return axios.get(`${ENSAYO_PCPDV1_URL}/${id}`);
  }
  getEnsayoMinigById(id) {
    return axios.get(`${ENSAYO_PCPMINIG_URL}/${id}`);
  }
  getEnsayoCougarById(id) {
    return axios.get(`${ENSAYO_PCPCOUGAR_URL}/${id}`);
  }

  updateEnsayoVh60(id, ensayo) {
    return axios.put(`${ENSAYO_PCPVH60_URL}/${id}`, ensayo);
  }
  updateEnsayoDv1(id, ensayo) {
    return axios.put(`${ENSAYO_PCPDV1_URL}/${id}`, ensayo);
  }
  updateEnsayoMinig(id, ensayo) {
    return axios.put(`${ENSAYO_PCPMINIG_URL}/${id}`, ensayo);
  }
  updateEnsayoCougar(id, ensayo) {
    return axios.put(`${ENSAYO_PCPCOUGAR_URL}/${id}`, ensayo);
  }

  softDeleteEnsayoVh60(id) {
    return axios.patch(`${ENSAYO_PCPVH60_URL}/${id}`, { eliminado: true });
  }
  softDeleteEnsayoDv1(id) {
    return axios.patch(`${ENSAYO_PCPDV1_URL}/${id}`, { eliminado: true });
  }
  softDeleteEnsayoMinig(id) {
    return axios.patch(`${ENSAYO_PCPMINIG_URL}/${id}`, { eliminado: true });
  }
  softDeleteEnsayoCougar(id) {
    return axios.patch(`${ENSAYO_PCPCOUGAR_URL}/${id}`, { eliminado: true });
  }
}

export default new EnsayoService();
