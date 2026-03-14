import { useEffect, useState } from "react";
import ImagenService from "../services/ImagenService";

const useImagenData = (imagenId, reset, modeloEquipo) => {
  const [imagen, setImagen] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener la imagen
  useEffect(() => {
    const fetchImagenData = async () => {
      if (!imagenId) return;

      setLoading(true);
      try {
        const response = await ImagenService.getImagenById(imagenId);
        // const response = 2;
        if (response.data) {
          setImagen(response.data);
          reset(response.data); // Rellena el formulario
        }
      } catch (error) {
        setError("Error al obtener los datos de recepción");
        console.error("Error al obtener los datos de recepción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagenData();
  }, [imagenId, reset]);

  
  // Crear una nueva imagen ------ARREGLADO
  const newImagenRecepcion = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenRecepcion(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };

  const newImagenInspeccionVh60 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpVh60(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenInspeccionDv1 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpDv1(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenInspeccionMiniG = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpMiniG(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenInspeccionCougar = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpCougar(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenInspeccionUcl = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpUcl(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenInspeccionGenerico = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpGenerico(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };



  const newImagenInspeccion2 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenInspeccionPcpVh60(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  // Crear una nueva imagen ------ARREGLADO
  const newImagen = async (data) => {
  // const newImagenInspeccionPcp = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenRecepcion(data);
      //REVISAR BIEN LOS ENDPOINTS----------------------------------------------->>>>>

      
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };

  const updateImagenRecepcion = async (imagenId, data) => {
    try {
      console.log("id:", imagenId);
      console.log("formData:", data);
      const response = await ImagenService.updateImagenRecepcion(imagenId, data);
      setImagen(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la recepción");
      throw err;
    }
  };
  const updateImagenInspeccion = async (imagenId, data) => {
    try {
      const response = await ImagenService.updateImagen(imagenId, data);
      setImagen(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la recepción");
      throw err;
    }
  };
  return { imagen, loading, error, newImagenRecepcion, newImagenInspeccionVh60, newImagenInspeccionDv1, newImagenInspeccionCougar, newImagenInspeccionMiniG, newImagenInspeccionUcl, newImagenInspeccionGenerico, updateImagenRecepcion, updateImagenInspeccion };
};

export default useImagenData;

