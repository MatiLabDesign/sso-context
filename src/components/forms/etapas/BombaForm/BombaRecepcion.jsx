import React, { useState, useEffect} from "react";
import './BombaFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RecepcionService from "../../../../services/RecepcionService";

const BombaRecepcion = () => {

  const numeroOrden = window.localStorage.getItem('numeroOT');
  const tipoEquipo = window.localStorage.getItem('tipoEquipo');
  const [recepcion, setRecepcion] = useState([]);

  useEffect(() => {
    RecepcionService.getAllRecepcion()
        .then((response) => {
        setRecepcion(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("el error esta en el useEffect");
      });
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const recepcion = data;
    RecepcionService.createRecepcion(recepcion);
    navigate("/dashboard/etapa/inspeccionBM");
    console.log(recepcion);
  };
  
  return (
    <div>
      <h1>RECEPCIÓN</h1>
      <h3>{numeroOrden} | {tipoEquipo}</h3>
      {recepcion.map((comentario) => (
               
               <p className="parrafo" key={comentario.id}>- {comentario.comentario}</p>
                     ))}
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

export default BombaRecepcion;
