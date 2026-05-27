import { useEffect, useState } from "react";
import InspeccionService from "../services/InspeccionService";

const useInspeccionData = (inspeccionId, reset, tipoEquipo) => {
  const [inspeccionActual, setInspeccionActual] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener los datos de la inspección según el tipo de equipo
  useEffect(() => {
    const fetchInspeccionData = async () => {
      if (!inspeccionId) return;
      if (!tipoEquipo) return; // Si no hay tipo, no hacer fetch
      if (typeof reset !== "function") return; // Si no hay reset, no hacer fetch

      setLoading(true);
      try {
        let response;

        switch (tipoEquipo) {
          case "Vh60":
          case "VH60":
            response = await InspeccionService.getInspeccionVh60ById(inspeccionId);
            break;
          case "Dv1":
          case "DV1":
            response = await InspeccionService.getInspeccionDv1ById(inspeccionId);
            break;
          case "MiniG":
          case "Minig":
          case "miniG":
            response = await InspeccionService.getInspeccionMinigById(inspeccionId);
            break;
          case "Cougar":
          case "cougar":
            response = await InspeccionService.getInspeccionCougarById(inspeccionId);
            break;
          case "Ucl":
          case "UCL":
            response = await InspeccionService.getInspeccionUclById(inspeccionId);
            break;
          default:
            console.warn("⚠️ Tipo de equipo no reconocido para fetch:", tipoEquipo);
            return;
        }

        if (response?.data) {
          setInspeccionActual(response.data);
          reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de inspección");
        console.error(`Error al obtener inspección (${tipoEquipo}):`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspeccionData();
  }, [inspeccionId, reset, tipoEquipo]);


  // Crear una nueva Inspección
  const newInspeccion = async (inspeccion, modeloEquipo) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccion(inspeccion, modeloEquipo);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };


  // Actualización Crear nueva Inspección por equipo

  const newInspeccionVh60 = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccionVh60(data);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newInspeccionDv1 = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccionDv1(data);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newInspeccionMiniG = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccionMiniG(data);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newInspeccionCougar = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccionCougar(data);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newInspeccionUcl = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccionUcl(data);
      if (nuevaInspeccion?.data) {
        setInspeccionActual(nuevaInspeccion.data);
      }
      return nuevaInspeccion?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////

  const updateInspeccion = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccionVh60(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  // Actualización Update Inspección por equipo

  const updateInspeccionVh60 = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccionVh60(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateInspeccionDv1 = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccionDv1(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateInspeccionMinig = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccionMinig(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateInspeccionCougar = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccionCougar(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateInspeccionUcl = async (id, data) => {
    try {
      const response = await InspeccionService.updateInspeccionUcl(id, data);
      setInspeccionActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////

  return { inspeccionActual, loading, error,  newInspeccion, newInspeccionVh60, newInspeccionDv1, newInspeccionCougar, newInspeccionMiniG, newInspeccionUcl, updateInspeccion, updateInspeccionVh60, updateInspeccionDv1, updateInspeccionMinig, updateInspeccionCougar, updateInspeccionUcl};
};

export default useInspeccionData;


