import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import { Link, useNavigate } from "react-router-dom";
import InspeccionService from "../../../../../services/InspeccionService";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
const PcpInspeccionMiniGB = () => {
  const { handleSubmit, register } = useForm();

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");
  const inspeccionId = window.localStorage.getItem("ordenId");

  const navigate = useNavigate();
  // const [inspeccionId, setInspeccionId] = useState();

  // Cargar todas las inspecciones//////////
  // useEffect(() => {
  //   const fetchRecepcionData = async () => {
  //     try {
  //       const response = await InspeccionService.getAllInspecciones();
  //       setInspeccionId(response.data.length);
  //       console.log("Datos recibidos:", response.data);

  //     } catch (error) {
  //       console.error("Error al obtener los datos de recepción:", error);
  //     }
  //   };

  //   fetchRecepcionData();
  // }, []);

  // useEffect(() => {
  //   console.log("La cantidad de registros son:", inspeccionId);
  // }, [inspeccionId]);

  // useEffect(() => {
  //   const fetchInspeccionById = async () => {
  //     try {
  //       const response = await InspeccionService.getInspeccionById(inspeccionId);
  //       setInspeccionId(response.data.length);
  //       console.log("Datos por id", response.data);

  //     } catch (error) {
  //       console.error("Error al obtener los datos de recepción:", error);
  //     }
  //   };

  //   fetchInspeccionById();
  // }, []);

  const onSubmit = async (data) => {
    try {
      const inspeccion = data;
      await InspeccionService.updateInspeccion(inspeccionId, inspeccion);
      console.log("Datos enviados exitosamente:", inspeccion);
      navigate("/dashboard/etapa/inspeccionPCPMiniGC");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPMiniGC`);
  };

  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPMiniGA`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        {/* Numero de registros: {inspeccionId} */}
      </h3>
      <h3 className="form-title">Inspección MiniG B</h3>

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

      {["axial29416", "guiaSupNJ217", "guiaInfNJ214", "zapata61822"].map(
        ({ key, value }) => (
          <div className="item-section" key={key}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title">{value}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${value}.ok`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Picado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${value}.picado`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Laminado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${value}.laminado`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">F.jaula</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${value}.fallaEnJaula`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Desgaste</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${value}.desgaste`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`rodamientoPcpVh60.${value}.especificar`)}
                  placeholder="Especificar"
                />
              </div>
            </div>
          </div>
        )
      )}

      <h3>Item</h3>
      {["cuboPortaRodamiento"].map((itemKey) => (
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
                {...register(`transmisionFrenoPcpVh60.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Picado</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`transmisionFrenoPcpVh60.${itemKey}.picado`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Desgaste</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`transmisionFrenoPcpVh60.${itemKey}.desgaste`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Roto</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`transmisionFrenoPcpVh60.${itemKey}.roto`)}
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`transmisionFrenoPcpVh60.${itemKey}.especificar`)}
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

export default PcpInspeccionMiniGB;
