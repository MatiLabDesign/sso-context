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
        const response = await InspeccionService.getInspeccionVh60ById(inspeccionId);
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

  // Obtener los datos de la inspección
  useEffect(() => {
    const fetchInspeccionVh60Data = async () => {
      if (!inspeccionId) return;

      setLoading(true);
      try {
        const response = await InspeccionService.getInspeccionVh60ById(inspeccionId);
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

    fetchInspeccionVh60Data();
  }, [inspeccionId, reset]);


  useEffect(() => {
    const fetchInspeccionDv1Data = async () => {
      if (!inspeccionId) return;

      setLoading(true);
      try {
        const response = await InspeccionService.getInspeccionDv1ById(inspeccionId);
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

    fetchInspeccionDv1Data();
  }, [inspeccionId, reset]);

  useEffect(() => {
    const fetchInspeccionMinigData = async () => {
      if (!inspeccionId) return;

      setLoading(true);
      try {
        const response = await InspeccionService.getInspeccionMinigById(inspeccionId);
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

    fetchInspeccionMinigData();
  }, [inspeccionId, reset]);
  
  useEffect(() => {
    const fetchInspeccionCougarData = async () => {
      if (!inspeccionId) return;

      setLoading(true);
      try {
        const response = await InspeccionService.getInspeccionCougarById(inspeccionId);
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

    fetchInspeccionCougarData();
  }, [inspeccionId, reset]);

  
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
  const newInspeccionMinig = async (data) => {
    try {
      const nuevaInspeccion = await InspeccionService.createInspeccionMinig(data);
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

  return { inspeccionActual, loading, error,  newInspeccion, newInspeccionVh60, newInspeccionDv1, newInspeccionCougar, newInspeccionMinig, newInspeccionUcl, updateInspeccion, updateInspeccionVh60, updateInspeccionDv1, updateInspeccionMinig, updateInspeccionCougar, updateInspeccionUcl};
};

export default useInspeccionData;

