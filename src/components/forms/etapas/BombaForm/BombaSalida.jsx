import React from "react";
import './BombaFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SalidaService from "../../../../services/SalidaService";

const BombaSalida = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const salida = data;
    SalidaService.createSalida(salida);
    navigate("/dashboard/listar-ot");
    console.log(salida);
  };


  return (
    <div>
      <h1>BOMBA SALIDA</h1>
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

export default BombaSalida;
