import React, {useState, useEffect} from "react";
import './BombaFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InspeccionService from "../../../../services/InspeccionService";


const BombaInspeccionC = () => {
  const numeroOrden = window.localStorage.getItem('numeroOT');
  const tipoEquipo = window.localStorage.getItem('tipoEquipo');
  const [inspeccion, setInspeccion] = useState([]);

  useEffect(() => {
    InspeccionService.getAllInspecciones()
        .then((response) => {
        setInspeccion(response.data);
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
    const inspeccion = data;
    
    InspeccionService.createInspeccion(inspeccion);
    navigate("/dashboard/etapa/ensayoBM");
    console.log(inspeccion);
  };

  return (
    <div>
      <h1>INSPECCIÓN</h1>
      <h3>{numeroOrden} | {tipoEquipo}</h3>
      {inspeccion.map((comentario) => (
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

export default BombaInspeccionC;
