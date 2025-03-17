import { useEffect, useState } from "react";
import RecepcionService from "../services/RecepcionService";

const useRecepcionData = (recepcionId, reset) => {
  const [recepcionActual, setRecepcionActual] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener los datos de la recepción
  useEffect(() => {
    const fetchRecepcionData = async () => {
      if (!recepcionId) return;

      setLoading(true);
      try {
        // const response = await RecepcionService.getRecepcionById(recepcionId);
        const response = 2;
        if (response.data) {
          setRecepcionActual(response.data);
          reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecepcionData();
  }, [recepcionId, reset]);

  // Crear una nueva recepción
  const createRecepcion = async (data) => {
    try {
      const nuevaRecepcion = await RecepcionService.createRecepcion(data);
      if (nuevaRecepcion?.data) {
        setRecepcionActual(nuevaRecepcion.data);
      }
      return nuevaRecepcion?.data;
    } catch (error) {
      console.error("Error al crear la recepción:", error);
      throw error;
    }
  };

  const updateRecepcion = async (id, data) => {
    try {
      const response = await RecepcionService.updateOt(id, data);
      setRecepcionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la recepción");
      throw err;
    }
  };
  return { recepcionActual, loading, error, createRecepcion, updateRecepcion };
};

export default useRecepcionData;

