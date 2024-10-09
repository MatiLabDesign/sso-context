import React from "react";
import './BombaFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EnsayoService from "../../../../services/EnsayoService";

const BombaEnsayo = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const ensayo = data;
    EnsayoService.createEnsayo(ensayo);
    navigate("/dashboard/etapa/salidaBM");
    console.log(ensayo);
  };

  return (
    <div>
      <h1>BOMBA ENSAYO</h1>
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

export default BombaEnsayo;
