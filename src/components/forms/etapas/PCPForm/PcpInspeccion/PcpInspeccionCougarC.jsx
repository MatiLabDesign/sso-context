import React from "react";
import { useForm, Controller } from "react-hook-form";
import "../PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import { Link, useNavigate } from "react-router-dom";
import InspeccionService from "../../../../../services/InspeccionService";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const PcpInspeccionCougarC = () => {
  const { handleSubmit, control, register } = useForm();

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");
  const inspeccionId = window.localStorage.getItem("ordenId");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const inspeccion = data;
      await InspeccionService.updateInspeccion(inspeccionId, inspeccion);
      console.log("Datos enviados exitosamente:", inspeccion);
      navigate("/dashboard/etapa/ensayoPCP");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/ensayoPCP`);
  };

  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPCougarB`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección Cougar C</h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>
        <button type="button" className="form-button-2">
          <Link onClick={handleClickA}>
            <FaArrowLeft />
          </Link>
        </button>
        <button type="button" className="form-button-2">
          <Link onClick={handleClick}>
            <FaArrowRight />
          </Link>
        </button>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
      <h3>Sistema Hidraulico</h3>
      {[
        "zapataDeFreno",
        "ferodo",
        "levaS",
        "vastagoDeResortes",
        "resortes",
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
                {...register(`items.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Desgastado</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`items.${itemKey}.fuga`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Deformado</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`items.${itemKey}.roto`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Roto</label>
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

      
    </form>
  );
};

export default PcpInspeccionCougarC;
