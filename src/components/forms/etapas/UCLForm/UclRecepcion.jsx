import React from "react";
import './UclFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RecepcionService from "../../../../services/RecepcionService";

const UclRecepcion = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const recepcion = data;
    RecepcionService.createRecepcion(recepcion);
    navigate("/dashboard/etapa/inspeccionUCL");
    console.log(recepcion);
  };

  return (
    <div>
      <h1>UNIDAD DE CARREA LARGA RECEPCIÓN</h1>
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

export default UclRecepcion;
