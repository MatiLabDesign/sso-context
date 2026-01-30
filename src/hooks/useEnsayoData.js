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
        const response = await EnsayoService.getEnsayoVh60ById(ensayoId);
        if (response.data) {
          setEnsayoActual(response.data);
          // reset(response.data); // Rellena el formulario
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

  useEffect(() => {
    const fetchEnsayoDv1Data = async () => {
      if (!ensayoId) return;

      setLoading(true);
      try {
        const response = await EnsayoService.getEnsayoDv1ById(ensayoId);
        if (response.data) {
          setEnsayoActual(response.data);
          // reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnsayoDv1Data();
  }, [ensayoId, reset]);

  useEffect(() => {
    const fetchEnsayoMinigData = async () => {
      if (!ensayoId) return;

      setLoading(true);
      try {
        const response = await EnsayoService.getEnsayoMinigById(ensayoId);
        if (response.data) {
          setEnsayoActual(response.data);
          // reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnsayoMinigData();
  }, [ensayoId, reset]);

  useEffect(() => {
    const fetchEnsayoCougarData = async () => {
      if (!ensayoId) return;

      setLoading(true);
      try {
        const response = await EnsayoService.getEnsayoCougarById(ensayoId);
        if (response.data) {
          setEnsayoActual(response.data);
          // reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnsayoCougarData();
  }, [ensayoId, reset]);

  // Crear una nueva Inspección
  const newEnsayoVh60 = async (data) => {
    try {
      const nuevoEnsayo = await EnsayoService.createEnsayoVh60(data);
      if (nuevoEnsayo?.data) {
        setEnsayoActual(nuevoEnsayo.data);
      }
      return nuevoEnsayo?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newEnsayoDv1 = async (data) => {
    try {
      const nuevoEnsayo = await EnsayoService.createEnsayoDv1(data);
      if (nuevoEnsayo?.data) {
        setEnsayoActual(nuevoEnsayo.data);
      }
      return nuevoEnsayo?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newEnsayoMinig = async (data) => {
    try {
      const nuevoEnsayo = await EnsayoService.createEnsayoMinig(data);
      if (nuevoEnsayo?.data) {
        setEnsayoActual(nuevoEnsayo.data);
      }
      return nuevoEnsayo?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };
  const newEnsayoCougar = async (data) => {
    try {
      const nuevoEnsayo = await EnsayoService.createEnsayoCougar(data);
      if (nuevoEnsayo?.data) {
        setEnsayoActual(nuevoEnsayo.data);
      }
      return nuevoEnsayo?.data;
    } catch (error) {
      console.error("Error al crear la Inspección:", error);
      throw error;
    }
  };

  const updateEnsayoVh60 = async (id, data) => {
    try {
      const response = await EnsayoService.updateEnsayoVh60(id, data);
      setEnsayoActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateEnsayoDv1 = async (id, data) => {
    try {
      const response = await EnsayoService.updateEnsayoDv1(id, data);
      setEnsayoActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateEnsayoMinig = async (id, data) => {
    try {
      const response = await EnsayoService.updateEnsayoMinig(id, data);
      setEnsayoActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  const updateEnsayoCougar = async (id, data) => {
    try {
      const response = await EnsayoService.updateEnsayoCougar(id, data);
      setEnsayoActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };

  
  const updateEnsayo = async (id, data) => {
    try {
      const response = await EnsayoService.updateEnsayoVh60(id, data);
      setEnsayoActual(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la inspección");
      throw err;
    }
  };
  
  return { ensayoActual, loading, error, newEnsayoVh60, newEnsayoDv1, newEnsayoMinig, newEnsayoCougar, updateEnsayo, updateEnsayoVh60, updateEnsayoDv1, updateEnsayoMinig, updateEnsayoCougar };
};

export default useEnsayoData;

