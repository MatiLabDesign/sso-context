import React, { useState, useEffect } from "react";
import './PcpFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SalidaService from "../../../../services/SalidaService";

const PcpSalida = () => {
  const numeroOrden = window.localStorage.getItem('numeroOT');
  const tipoEquipo = window.localStorage.getItem('tipoEquipo');

  const [salida, setSalida] = useState([]);

  useEffect(() => {
    SalidaService.getAllSalidas()
      .then((response) => {
        setSalida(response.data);
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
    const salida = data;
    SalidaService.createSalida(salida);
    navigate("/dashboard/listar-ot");
    console.log(salida);
  };

  return (
    <div>
      <h1>SALIDA</h1>
      {/* <h3>{numeroOrden} | {tipoEquipo}</h3> */}
      {salida.map((comentario) => (
               
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
        <button className='btn-salida' type="submit">
          Terminar
        </button>
      </form>
    </div>
  );
};

export default PcpSalida;
