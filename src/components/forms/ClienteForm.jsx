import React, { useState } from "react";
import "./ClienteForm.css";
import Label from "./../../../01uikit/label/Label";
import { StyledSelect } from "../../../01uikit/01styled-components/StyledSelect";
import ClienteService from "../../../services/ClienteService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ClienteForm = () => {
  const { register, formState: {errors}, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const cliente = data;
    ClienteService.createCliente(cliente);
    navigate("/listar-cliente");
    console.log(cliente);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-cliente">
        <div className="input-cliente">
          <Label id="label" label={"Cuit"} />
          <input type="number" {...register('cuit', {
            required: true,
            maxLength: 11
          })} />
          {errors.cuit?.type === 'required' && <p>El campo es requerido</p>} 
          {errors.cuit?.type === 'maxLength' && <p>Maximo de 11 numeros</p>} 
        </div>
        <div className="input-cliente">
          <Label id="label" label={"Razón Social"} />
          <input type="text" {...register('razonSocial', {
            required: true
          })} />
          {errors.razonSocial?.type === 'required' && <p>El campo es requerido</p>} 
        </div>

        {/* select de areas */}
        <div className="input-cliente">
          <Label id="label" label={"Area"} />
          <StyledSelect {...register("area")}>
            <option value="sur">Sur</option>
            <option value="norte">Norte</option>
            <option value="centro">Centro</option>
          </StyledSelect>
        </div>

        <div className="input-cliente">
          <Label id="label" label={"Nombre Fantasia"} />
          <input type="text" {...register('nombreFantasia', {
            required: true
          })} />
          {errors.nombreFantasia?.type === 'required' && <p>El campo es requerido</p>} 
        </div>
        <div className="input-cliente">
          <Label id="label" label={"Contacto"} />
          <input type="text" {...register('nombreContacto', {
            required: true
          })} />
          {errors.nombreContacto?.type === 'required' && <p>El campo es requerido</p>} 
        </div>
        <div className="input-cliente">
          <Label id="label" label={"Telefono"} />
          <input type="number" {...register('telefono', {
            required: true,
            maxLength: 10
          })} />
          {errors.telefono?.type === 'required' && <p>El campo es requerido</p>}
          {errors.telefono?.type === 'maxLength' && <p>Maximo de 10 numeros</p>}  
        </div>
        <div className="input-cliente">
          <Label id="label" label={"Email"} />
          <input type="text" {...register('mail', {
            required: true,
            pattern: /^\S+@\S+\.\S+$/
          })} />
          {errors.mail?.type === 'required' && <p>El campo es requerido</p>} 
          {errors.mail?.type === 'pattern' && <p>No corresponde a un email</p>} 
        </div>
        <input          
          className="form-control-s"
          type="submit"
          value="Guardar"
        />
      </form>
    </>
  );
};

export default ClienteForm;
