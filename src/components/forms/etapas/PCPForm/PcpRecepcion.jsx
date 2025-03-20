import { useForm } from "react-hook-form";
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/RecepcionService";
import OtService from "../../../../services/OtService";
import { useNavigate } from "react-router-dom";
import recepcionPCP from "../../../../data/recepcionPCP";
import { useEffect, useState } from "react";
import useOrdenData from "../../../../hooks/useOrdenData";
import useRecepcionData from "../../../../hooks/useRecepcionData";

const PcpRecepcion = () => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: recepcionPCP,
  });

  const ordenId = localStorage.getItem("ordenId");
 
  console.log(ordenId);

  const navigate = useNavigate();

  

  const { allOts, otActual, updateOt, loading, error } = useOrdenData(ordenId);
  
  useEffect(() => {
    if (otActual) {
      console.log("✅ Datos recibidos:", otActual);
  
      if (otActual.recepcion && otActual.recepcion.id) {
        setRecepcionId(otActual.recepcion.id);
        
      } else {
        console.warn("⚠️ Advertencia: `otActual.recepcion` no tiene un ID válido.");
        setRecepcionId(null); // Limpia el estado para evitar errores posteriores
      }
    }
  }, [otActual]);
  
  const [recepcionId, setRecepcionId] = useState(null);
  
  useEffect(() => {
    if (recepcionId) {
        console.log("✅ Este es el id de recepción:", recepcionId);
     }
}, [recepcionId]);
 
  const {
    recepcionActual,
    loading: recepcionLoading,
    error: recepcionError,
    createRecepcion,
    updateRecepcion,
  } = useRecepcionData(recepcionId, reset);

  useEffect(() => {
    if (recepcionActual) {
        console.log("✅ Datos Recepción actual:", recepcionActual);
    }
}, [recepcionActual]);

const onSubmit = async (data) => {
  try {
    const modeloEquipoActual = otActual?.equipo?.tipoEquipo?.modelo;
    const tipoEquipoActual = otActual?.equipo?.tipoEquipo?.tipo;

    if (recepcionId) {
      console.log("Recepción existente:", recepcionId);

      await updateRecepcion(recepcionId, data);
      console.log("✅ Recepción actualizada correctamente:", data);

      if (modeloEquipoActual && tipoEquipoActual) {
        navigate(`/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}A`);
      } else {
        console.error("❌ Error: Modelo de equipo no definido.");
      }

    } else {
      console.log("🚀 Creando nueva recepción...");

      const nuevaRecepcion = await createRecepcion(data);
      console.log("✅ Nueva recepción creada:", nuevaRecepcion);

      const nuevaRecepcionId = nuevaRecepcion?.id;
      if (nuevaRecepcionId) {
        console.log("🔄 Actualizando OT con ID de nueva recepción...");

        const updatedOt = {
          ...otActual,
          recepcion: { id: nuevaRecepcionId }
        };

        console.log("🔍 JSON enviado a la API:", updatedOt);

        await updateOt(ordenId, updatedOt);

        console.log("✅ OT actualizada con éxito.");

        if (modeloEquipoActual && tipoEquipoActual) {
          navigate(`/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}A`);
        } else {
          console.error("❌ Error: Modelo de equipo no definido.");
        }

      } else {
        console.error("❌ Error: No se pudo obtener el ID de la nueva recepción.");
        return;
      }
    }
  } catch (error) {
    console.error("❌ Error al procesar la recepción:", error);
  }
};




  // if (loading || recepcionLoading) return <p>Cargando datos...</p>;
  // if (error) return <p>{error}</p>;
  // if (recepcionError) return <p>{recepcionError}</p>;

  // console.log(allOts);
  // console.log(ordenData);

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        {/* Recepción | {tipoEquipo} - OT N°{numeroOT} */}
        Recepción PCP
      </h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <input {...register("comentario")} placeholder="Comentario" />
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
      {[
        "cubreGrampa",
        "cubrePolea",
        "cubreVastago",
        "grampaAntiEyeccion",
        "estructuraChasis",
        "linternaSeparador",
        "mesaDeMotor",
        "rielesDeMotor",
        "soporteDeTransporte",
        "poleaConducida",
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Ok</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`itemRecepcion.${itemKey}.estado`)}
                checked={watch(`itemRecepcion.${itemKey}.estado`)}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="Requerimiento"
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.observacion`)}
                placeholder="Observación"
              />
            </div>
          </div>
        </div>
      ))}

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default PcpRecepcion;
