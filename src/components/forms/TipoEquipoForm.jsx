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
          <label>Marca</label>
          <select {...register("marca")}>
            <option value="--">--</option>
            <option value="Yokohama">Yokohama</option>
            <option value="Hiflow">Hiflow</option>
            <option value="MiBombita">MiBombita</option>
          </select>
        </div>
        <div className={style.input_tipo}>
          <label>Modelo</label>
          <select {...register("modelo")}>
            <option value="--">--</option>
            <option value="H60">H60</option>
            <option value="Hf120">Hf120</option>
            <option value="Orbital">Orbital</option>
            <option value="JK60">JK60</option>
            <option value="JKf120">JKf120</option>
            <option value="Torrinte">Torrinte</option>
          </select>
        </div>

        <button className={style.form_control_s} type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};

export default TipoEquipoForm;
