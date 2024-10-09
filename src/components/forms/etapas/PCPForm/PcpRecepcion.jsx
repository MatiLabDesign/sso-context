import React from "react";
import './PcpFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RecepcionService from "../../../../services/RecepcionService";

const PcpRecepcion = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const recepcion = data;
    RecepcionService.createRecepcion(recepcion);
    navigate("/dashboard/etapa/inspeccionPcp");
    console.log(recepcion);
  };

  return (
    <div>
      <h1>PCP RECEPCIÓN</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='{style.input_cliente}'>
          <label>Comentario</label>
          <input
            type="text"
            {...register("comentario", {
              required: true,
            })}
          />
          {errors.comentario?.type === "required" && (
            <p>El campo es requerido</p>
          )}
        </div>

        <button className='btn' type="submit">
          Check
        </button>
      </form>
    </div>
  );
};

export default PcpRecepcion;
