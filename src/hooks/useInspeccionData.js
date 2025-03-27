import { useEffect, useState } from "react";
import InspeccionService from "../services/InspeccionService";

const useInspeccionData = (inspeccionId, reset) => {
  const [inspeccionActual, setInspeccionActual] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener los datos de la inspección
  useEffect(() => {
    const fetchInspeccionData = async () => {
      if (!inspeccionId) return;

      setLoading(true);
      try {
        const response = await InspeccionService.getInspeccionById(inspeccionId);
        if (response.data) {
          setInspeccionActual(response.data);
          reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspeccionData();
  }, [inspeccionId, reset]);

  // Crear una nueva Inspección
  const createInspeccion = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccion(data);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };

  const updateInspeccion = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccion(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  return { inspeccionActual, loading, error, createInspeccion, updateInspeccion };
};

export default useInspeccionData;

