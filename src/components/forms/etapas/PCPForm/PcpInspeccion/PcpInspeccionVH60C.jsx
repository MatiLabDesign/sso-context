import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "../PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import { useNavigate, Link } from "react-router-dom";
import InspeccionService from "../../../../../services/InspeccionService";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useInspeccionData from "../../../../../hooks/useInspeccionData";

const PcpInspeccionVH60C = () => {
  const { handleSubmit, control, register, reset, watch } = useForm();

  const ordenId = window.localStorage.getItem("ordenId");

  const navigate = useNavigate();

  console.log(ordenId);

  const { allOts, otActual, updateOt, loading, error } = useOrdenData(ordenId);

  useEffect(() => {
    if (otActual) {
      console.log("✅ Datos recibidos:", otActual);

      if (otActual.inspeccionPcpVh60 && otActual.inspeccionPcpVh60.id) {
        setInspecionId(otActual.inspeccionPcpVh60.id);
      } else {
        console.warn(
          "⚠️ Advertencia: `otActual.inspeccionPcpVh60` no tiene un ID válido."
        );
        setInspecionId(null); // Limpia el estado para evitar errores posteriores
      }
    }
  }, [otActual]);

  const [inspeccionId, setInspecionId] = useState(null);

  useEffect(() => {
    if (inspeccionId) {
      console.log("✅ Este es el id de Inspección:", inspeccionId);
    }
  }, [inspeccionId]);

  const { inspeccionActual, createInspeccion, updateInspeccion } =
    useInspeccionData(inspeccionId, reset);

  useEffect(() => {
    if (inspeccionActual) {
      console.log("✅ Datos Inspección actual:", inspeccionActual);
    }
  }, [inspeccionActual]);

  const onSubmit = async (data) => {
    try {
      const modeloEquipoActual = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipoActual = otActual?.equipo?.tipoEquipo?.tipo;

      if (inspeccionId) {
        console.log("Inspección existente:", inspeccionId);

        await updateInspeccion(inspeccionId, data);
        console.log("✅ Inspección actualizada correctamente:", data);

        if (modeloEquipoActual && tipoEquipoActual) {
          // console.log("acá navega a ensayo");
          // navigate(`/dashboard/etapa/ensayo${tipoEquipoActual}${modeloEquipoActual}`);
          navigate(`/dashboard/etapa/ensayo${tipoEquipoActual}`);
        } else {
          console.error("❌ Error: Modelo de equipo no definido.");
        }
      } else {
        console.log("🚀 La inspección no existe...");
      }
    } catch (error) {
      console.error("❌ Error al procesar la inspección:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/ensayoPCP`);
  };
  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60B`);
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const inspeccion = data;
  //     await InspeccionService.updateInspeccion(inspeccionId, inspeccion);
  //     console.log("Datos enviados exitosamente:", inspeccion);
  //     navigate("/dashboard/etapa/ensayoMiniGA");
  //   } catch (error) {
  //     console.error("Error al enviar los datos:", error);
  //   }
  // };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección C</h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <input {...register("comentario")} placeholder="Comentario" />
      </div>

      {/* Iterar sobre cada propiedad en sistemaHidraulicoPcpVh60 */}
      <h3>Items</h3>
      {["bomba", "manifold", "caliper", "conjuntoMangueras"].map((itemKey) => (
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
                {...register(`sistemaHidraulicoPcpVh60.${itemKey}.ok`)}
                checked={watch(`sistemaHidraulicoPcpVh60.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fugas</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`sistemaHidraulicoPcpVh60.${itemKey}.fugas`)}
                checked={watch(`sistemaHidraulicoPcpVh60.${itemKey}.fugas`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Roto</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`sistemaHidraulicoPcpVh60.${itemKey}.roto`)}
                checked={watch(`sistemaHidraulicoPcpVh60.${itemKey}.roto`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Eficiencia</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`sistemaHidraulicoPcpVh60.${itemKey}.eficiencia`)}
                checked={watch(
                  `sistemaHidraulicoPcpVh60.${itemKey}.eficiencia`
                )}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`sistemaHidraulicoPcpVh60.${itemKey}.especificar`)}
                placeholder="Especificar"
              />
            </div>
          </div>
        </div>
      ))}

      <h3>Polea</h3>
      {["polea"].map((itemKey) => (
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
                {...register(`poleaPcpVh60.${itemKey}.ok`)}
                checked={watch(`poleaPcpVh60.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fisura</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.fisura`)}
                checked={watch(`poleaPcpVh60.${itemKey}.fisura`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Poros</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.poros`)}
                checked={watch(`poleaPcpVh60.${itemKey}.poros`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">D. Inadec.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.disenoInadecuado`)}
                checked={watch(`poleaPcpVh60.${itemKey}.disenoInadecuado`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">N° Trazab.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.numeroTrazabilidad`)}
                checked={watch(`poleaPcpVh60.${itemKey}.numeroTrazabilidad`)}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`poleaPcpVh60.${itemKey}.especificar`)}
                placeholder="Especificar"
              />
            </div>
          </div>
        </div>
      ))}

      <button type="submit" className="form-button">
        Guardar
      </button>
      <Link onClick={handleClickA}>Anterior</Link>
      <Link onClick={handleClick}>Siguiente</Link>
    </form>
  );
};

export default PcpInspeccionVH60C;
