import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import { useNavigate } from "react-router-dom";
import InspeccionService from "../../../../services/InspeccionService";

const PcpInspeccionVH60C = () => {
  const { handleSubmit, control, register } = useForm();

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const inspeccion = data;
      await InspeccionService.updateInspeccion(22, inspeccion);
      console.log("Datos enviados exitosamente:", inspeccion);
      navigate("/dashboard/etapa/ensayoPCP");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        Inspección C
      </h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <input {...register("comentario")} placeholder="Comentario" />
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
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
                {...register(`items.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fuga</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`items.${itemKey}.fuga`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Roto</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`items.${itemKey}.roto`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Eficiencia</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`items.${itemKey}.eficiencia`)}
              />
            </div>
            
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`items.${itemKey}.especificar`)}
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
                {...register(`polea.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fisuras</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`polea.${itemKey}.fisuras`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Poros</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`polea.${itemKey}.poros`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">D.Inadec.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`polea.${itemKey}.inadecuado`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">N° Trazab.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`polea.${itemKey}.trazabilidad`)}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`polea.${itemKey}.especificar`)}
                placeholder="Especificar"
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

export default PcpInspeccionVH60C;
