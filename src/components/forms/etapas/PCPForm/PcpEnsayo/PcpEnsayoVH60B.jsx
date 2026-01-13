import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../PcpEnsayo.css";
import { Link, useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_B_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import ensayoVH60 from "../../../../../data/ensayoPCPVH60";

const PcpEnsayoVH60B = () => {
  const ordenId = localStorage.getItem("ordenId");
  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");
  const ensayoVh60Id = localStorage.getItem("ensayoVh60Id");

  const navigate = useNavigate();

  // Formulario
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: ensayoVH60,
  });

  // Hooks de datos
  const { otActual } = useOrdenData(ordenId);
  const { ensayoActual, updateEnsayoVh60 } = useEnsayoData(ensayoVh60Id);

  // ⬇️ Cargar datos reales desde backend cuando llegan
  useEffect(() => {
    if (ensayoActual) {
      reset(ensayoActual);
    }
  }, [ensayoActual, reset]);

  // ⬇️ Guardar ensayo
  const onSubmit = async (data) => {
    try {
      if (ensayoVh60Id) {
        // EDITAR ENSAYO EXISTENTE
        await updateEnsayoVh60({
          id: ensayoVh60Id,   // <- 🔥 ESTE ID ES LA CLAVE
          ...data,
        });

      } else {
        // CREACIÓN (si alguna vez lo necesitás)
        console.warn("No existe ensayoVh60Id — no se creó un nuevo ensayo.");
      }

      navigate(`/dashboard/etapa/salidaPCP`);

    } catch (error) {
      console.error("Error al guardar ensayo:", error);
    }
  };

  // Navegación manual
  const handleClickNext = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/salidaPCP`);
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/ensayoPCP`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      
      <h3 className="form-title">Ensayo PCP VH60 B</h3>

      {/* Comentario */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>

        <button className="form-button-2">
          <Link onClick={handleClickPrev}>
            <FaArrowLeft />
          </Link>
        </button>

        <button className="form-button-2">
          <Link onClick={handleClickNext}>
            <FaArrowRight />
          </Link>
        </button>

        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>

      {/* Lista de ítems */}
      <div className="lista-container2">
        {ENSAYO_B_ITEMS.map((item) => (
          <div className="item-section" key={item.estado}>

            <div className="item-field">

              <div className="item-title">
                <h4>{item.label}</h4>
              </div>

              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(item.estado)}
                />
              </div>

              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(item.observacion)}
                  placeholder="Observación"
                />
              </div>

            </div>

          </div>
        ))}
      </div>

    </form>
  );
};

export default PcpEnsayoVH60B;


