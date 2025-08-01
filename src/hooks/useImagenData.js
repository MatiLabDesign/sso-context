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





  const updateImagen = async (imagenId, data) => {
    try {
      const response = await ImagenService.updateImagen(imagenId, data);
      setImagen(response.data);
      return response;
    } catch (err) {
      setError("Error al actualizar la recepción");
      throw err;
    }
  };
  return { imagen, loading, error, newImagen, updateImagen };
};

export default useImagenData;

