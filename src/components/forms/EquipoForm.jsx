import React, { useState } from "react";
import "./ClienteForm.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TipoEquipoService from "../../services/TipoEquipoService";
import EquipoService from "../../services/EquipoService";

const EquipoForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const equipo = data;
    EquipoService.createEquipo(equipo);
    navigate("/dashboard/equipo");
    console.log(equipo);
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="form-cliente">
        <div className="input-cliente">
          <label>N° de serie</label>
          <input
            type="text"
            {...register("numSerieEquipo", {
              required: true,
            })}
          />
          {errors.numSerieEquipo?.type === "required" && <p>El campo es requerido</p>}
          
        </div>
        <div className="input-cliente">
          <label>Tipo de equipo</label>
          <input
            type="text"
            // {...register("numSerieEquipo", {
            //   required: true,
            // })}
          />
          {errors.numSerieEquipo?.type === "required" && <p>El campo es requerido</p>}
          
        </div>
        

        
        {/* <div className="input-cliente">
          <label>Tipo de equipo</label>
          <select {...register("tipoEquipo")}>
            <option value="1">Equipo1</option>
            <option value="1">Equipo2</option>
            <option value="1">Equipo3</option>
          </select>
        </div> */}

        
        <button className="form-control-s" type="submit">Guardar</button>
      </form>
    
      
    </>
  );
};

export default EquipoForm;
