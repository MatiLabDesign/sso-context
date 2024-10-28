import React, { useState } from "react";
import style from "./FormStyle.module.css";
import ClienteService from "../../services/ClienteService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ClienteForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const cliente = data;
    ClienteService.createCliente(cliente);
    navigate("/dashboard/client");
    console.log(cliente);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_cliente}>
        <div className={style.form_box}>
          <div className={style.input_cliente}>
            <label>Cuit</label>
            <input
              type="number"
              {...register("cuit", {
                required: true,
                maxLength: 11,
              })}
            />
            {errors.cuit?.type === "required" && <p>El campo es requerido</p>}
            {errors.cuit?.type === "maxLength" && <p>Maximo de 11 numeros</p>}
          </div>
          <div className={style.input_cliente}>
            <label>Razón Social</label>
            <input
              type="text"
              {...register("razonSocial", {
                required: true,
              })}
            />
            {errors.razonSocial?.type === "required" && (
              <p>El campo es requerido</p>
            )}
          </div>

          {/* select de areas */}
          <div className={style.input_cliente}>
            <label>Area</label>
            <select {...register("area")}>
              <option value="sur">Sur</option>
              <option value="norte">Norte</option>
              <option value="centro">Centro</option>
            </select>
          </div>
        
          <div className={style.input_cliente}>
            <label>Nombre Fantasia</label>
            <input
              type="text"
              {...register("nombreFantasia", {
                required: true,
              })}
            />
            {errors.nombreFantasia?.type === "required" && (
              <p>El campo es requerido</p>
            )}
          </div>
          </div>
        <div className={style.form_box}>
          <div className={style.input_cliente}>
            <label>Contacto</label>
            <input
              type="text"
              {...register("nombreContacto", {
                required: true,
              })}
            />
            {errors.nombreContacto?.type === "required" && (
              <p>El campo es requerido</p>
            )}
          </div>
          <div className={style.input_cliente}>
            <label>Teléfono</label>
            <input
              type="number"
              {...register("telefono", {
                required: true,
                maxLength: 10,
              })}
            />
            {errors.telefono?.type === "required" && (
              <p>El campo es requerido</p>
            )}
            {errors.telefono?.type === "maxLength" && (
              <p>Maximo de 10 numeros</p>
            )}
          </div>
          <div className={style.input_cliente}>
            <label>Email</label>
            <input
              type="text"
              {...register("mail", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.mail?.type === "required" && <p>El campo es requerido</p>}
            {errors.mail?.type === "pattern" && (
              <p>No corresponde a un email</p>
            )}
          </div>
        <button className={style.form_control_s} type="submit">
          Guardar
        </button>
        </div>
      </form>
    </>
  );
};

export default ClienteForm;
