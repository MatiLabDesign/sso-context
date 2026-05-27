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


  // Crear una nueva imagen ------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Crear una nueva imagen ------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Crear una nueva imagen ------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  //RECEPCION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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


  const imagenServices = {
  Vh60: ImagenService.createImagenInspeccionPcpVh60,
  Dv1: ImagenService.createImagenInspeccionPcpDv1,
  MiniG: ImagenService.createImagenInspeccionPcpMiniG,
  Cougar: ImagenService.createImagenInspeccionPcpCougar,
};
  //INSPECCION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const newImagenInspeccion = async (modeloEquipo, data) => {
  try {
    const serviceFn = imagenServices[modeloEquipo];

    if (!serviceFn) {
      throw new Error(`No existe servicio para el modelo ${modeloEquipo}`);
    }

    const nuevaImagen = await serviceFn(data);

    if (nuevaImagen?.data) {
      setImagen(nuevaImagen.data);
    }

    return nuevaImagen?.data;
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
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


  const newImagenEnsayoVh60 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenEnsayoPcpVh60(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenEnsayoDv1 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenEnsayoPcpDv1(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenEnsayoMiniG = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenEnsayoPcpMiniG(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const newImagenEnsayoCougar = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenEnsayoPcpCougar(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };

  //SALIDA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const newImagenSalida = async (data) => {
    try {
      const nuevaImagen = await ImagenService.createImagenSalida(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };


  //Update imagenes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //Update imagenes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //Update imagenes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  //RECEPCION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

  //INSPECCION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const updateImagenInspeccionVh60 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenInspeccionPcpVh60(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const updateImagenInspeccionDv1 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenInspeccionPcpDv1(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const updateImagenInspeccionMiniG = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenInspeccionPcpMiniG(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const updateImagenInspeccionCougar = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenInspeccionPcpCougar(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
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

  //ENSAYO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const updateImagenEnsayoVh60 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenEnsayoPcpVh60(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const updateImagenEnsayoDv1 = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenEnsayoPcpDv1(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const updateImagenEnsayoMiniG = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenEnsayoPcpMiniG(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };
  const updateImagenEnsayoCougar = async (data) => {
    try {
      const nuevaImagen = await ImagenService.updateImagenEnsayoPcpCougar(data);
      if (nuevaImagen?.data) {
        setImagen(nuevaImagen.data);
      }
      return nuevaImagen?.data;
    } catch (error) {
      console.error("Error al cargar la imagen :", error);
      throw error;
    }
  };




  return { imagen, loading, error,
     newImagenRecepcion, newImagenInspeccion, newImagenInspeccionVh60, newImagenInspeccionDv1, newImagenInspeccionCougar, newImagenInspeccionMiniG, newImagenInspeccionUcl, newImagenInspeccionGenerico, newImagenSalida,
     newImagenEnsayoVh60, newImagenEnsayoDv1, newImagenEnsayoCougar, newImagenEnsayoMiniG,
     updateImagenRecepcion, updateImagenInspeccionVh60, updateImagenInspeccionDv1, updateImagenInspeccionCougar, updateImagenInspeccionMiniG, updateImagenInspeccion,
     updateImagenEnsayoVh60, updateImagenEnsayoDv1, updateImagenEnsayoCougar, updateImagenEnsayoMiniG};
};

export default useImagenData;

