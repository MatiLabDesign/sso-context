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

  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");
  const ordenId = localStorage.getItem("ordenId");

  console.log(ordenId);

  const navigate = useNavigate();

  const { allOts, otActual, loading, error } = useOrdenData(ordenId);
  console.log("Estan son todas la oTsssss" , JSON.stringify(otActual));
  console.log("Este está después de useOrdenData", JSON.stringify(otActual, null, 2));
//   const [otActual, setOtActual] = useState(null)
//   console.log(otActual);

//  useEffect(() => {
//     console.log("ordenId recibido en el hook:", ordenId);
//     const fetchOrdenData = async () => {
//       if (!ordenId) return;
//       try {
//         const response = await OtService.getOtById(ordenId);
//         console.log("OT específica recibida:", response.data);
//         if (response.data) setOtActual(response.data);
//       } catch (error) {
//         console.error("Error al obtener la OT específica:", error);
//       }
//     };

//     fetchOrdenData();
//   }, [ordenId]);

//   console.log(otActual);

  const recepcionId = otActual?.id;
  const {
    recepcionActual,
    loading: recepcionLoading,
    error: recepcionError,
    createRecepcion,
    updateRecepcion,
  } = useRecepcionData(recepcionId, reset);

  const onSubmit = async (data) => {
    try {
      if (recepcionActual && Object.keys(recepcionActual).length > 0) {
        console.log("Recepción existente:", recepcionActual);
        updateRecepcion(recepcionActual);
        console.log(recepcionActual)
      } else {
        const nuevaRecepcion = await createRecepcion(data);
        console.log("Nueva recepción creada:", nuevaRecepcion);

        // if (nuevaRecepcion?.data) {
        //   updateRecepcion(recepcionId, nuevaRecepcion.data);
          
        // }

        if (modeloEquipo) {
          navigate(`/dashboard/etapa/inspeccion${modeloEquipo}A`);
        } else {
          console.error("Error: Modelo de equipo no definido");
        }
      }
    } catch (error) {
      console.error("Error al procesar la recepción:", error);
    }
  };

  // if (loading || recepcionLoading) return <p>Cargando datos...</p>;
  // if (error) return <p>{error}</p>;
  // if (recepcionError) return <p>{recepcionError}</p>;

  // console.log(allOts);
  console.log(otActual);

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
