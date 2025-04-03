import { useEffect, useState } from "react";
import EnsayoService from "../services/EnsayoService";

const useEnsayoData = (ensayoId, reset) => {
  const [ensayoActual, setEnsayoActual] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener los datos del Ensayo 
  useEffect(() => {
    const fetchEnsayoData = async () => {
      if (!ensayoId) return;

      setLoading(true);
      try {
        const response = await EnsayoService.getEnsayoById(ensayoId);
        if (response.data) {
          setEnsayoActual(response.data);
          reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnsayoData();
  }, [ensayoId, reset]);

  // Crear una nueva Inspección
  const createEnsayo = async (data) => {
    try {
      const nuevaEnsayo = await EnsayoService.createEnsayo(data);
      if (nuevaEnsayo?.data) {
        setEnsayoActual(nuevaEnsayo.data);
      }
      return nuevaEnsayo?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };

  const updateEnsayo = async (id, data) => {
    try {
      const response = await EnsayoService.updateEnsayo(id, data);
      setEnsayoActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  return { ensayoActual, loading, error, createEnsayo, updateEnsayo };
};

export default useEnsayoData;

