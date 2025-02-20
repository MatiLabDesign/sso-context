import React, { useState, useEffect } from "react";
import './PcpFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EnsayoService from "../../../../services/EnsayoService";

const PcpEnsayo = () => {
  const numeroOrden = window.localStorage.getItem('numeroOT');
  const tipoEquipo = window.localStorage.getItem('tipoEquipo');

  const [ensayo, setEnsayo] = useState([]);

  useEffect(() => {
    EnsayoService.getAllEnsayos()
      .then((response) => {
        setEnsayo(response.data);
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
    const ensayo = data;
    EnsayoService.createEnsayo(ensayo);
    navigate("/dashboard/etapa/salidaPcp");
    console.log(ensayo);
  };

  return (
    <div>
      <h1>ENSAYO</h1>
      {/* <h3>{numeroOrden} | {tipoEquipo}</h3> */}
      {ensayo.map((comentario) => (
               
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

export default PcpEnsayo;
