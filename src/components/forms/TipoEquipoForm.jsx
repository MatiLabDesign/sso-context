import React, { useState } from "react";
import style from "./FormStyle.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TipoEquipoService from "../../services/TipoEquipoService";

const TipoEquipoForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const tipoEquipo = data;
    TipoEquipoService.createTipoEquipo(tipoEquipo);
    navigate("/dashboard/tipoequipo");
    console.log(tipoEquipo);
    
  };

  

  return (
    <>
    {/* ESTAN TODO LAS OPCIONES HARDCODIADAS */}
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_tipo}>
        <div className={style.input_tipo}>
          <label>Tipo de equipo</label>
          <select {...register("tipo")}>
            <option value="--">--</option>
            <option value="PCP">PCP</option>
            <option value="UCL">Unidad Carrera Larga</option>
            <option value="BM">Bomba Mecánica</option>
          </select>
        </div>
        <div className={style.input_tipo}>
          <label>Modelo</label>
          <select {...register("modelo")}>
            <option value="--">--</option>
            <option value="Vh60">Vh60</option>
            <option value="Dv1">Dv1</option>
            <option value="MiniG">MiniG</option>
            <option value="Cougar">Cougar</option>
            <option value="900-1100">900/1100</option>
            <option value="BombaMec">ModBombaMec</option>
          </select>
        </div>

        {/* <div className={style.input_tipo}>
          <label>Marca</label>
          <input
            type="text"
            {...register("marca")}
          />
          
        </div> */}

        {/* <div className={style.input_tipo}>
          <label>Marca</label>
          <select {...register("marca")}>
            <option value="--">--</option>
            <option value="Marca1">Marca1</option>
            <option value="Marca2">Marca2</option>
            <option value="Marca3">Marca3</option>
          </select>
        </div> */}
        <button className={style.form_control_s} type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};

export default TipoEquipoForm;
