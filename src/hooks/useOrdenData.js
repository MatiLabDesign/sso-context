import { useEffect, useState } from "react";
import OtService from "../services/OtService";

const useOrdenData = (ordenId) => {
  const [otActual, setOtActual] = useState(null);
  const [allOts, setAllOts] = useState([]);
  const [loading, setLoading] = useState(true); // Correcto manejo de `loading`
  const [error, setError] = useState(null); 

  // Obtener la OT específica
  useEffect(() => {
    console.log("ordenId recibido en el hook:", ordenId);
    const fetchOrdenData = async () => {
      if (!ordenId) return;
      try {
        const response = await OtService.getOtById(ordenId);
        console.log("OT específica recibida:", response.data);
        if (response.data) setOtActual(response.data);
      } catch (error) {
        console.error("Error al obtener la OT específica:", error);
      }
    };

    fetchOrdenData();
  }, [ordenId]);

  // Obtener todas las OTs
  useEffect(() => {
    const fetchAllOts = async () => {
      try {
        const response = await OtService.getAllOt();
        if (response.data) setAllOts(response.data);
      } catch (error) {
        console.error("Error al obtener todas las OTs:", error);
      }
    };

    fetchAllOts();
  }, []); // Se ejecuta solo una vez

  const updateOrden = (ordenId, data) => {
      try {
        const response = OtService.updateOt(ordenId, data);
        setRecepcionActual(response.data);
        return response;
      } catch (err) {
        setError("Error al actualizar la recepción");
        throw err;
      }
    };

  return { otActual, allOts, loading, error };
};

export default useOrdenData;
