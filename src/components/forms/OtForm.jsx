import React, { useState, useEffect } from "react";
import style from "./FormStyle.module.css";
import OtService from "../../services/OtService";
import ClienteService from "../../services/ClienteService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EquipoService from "../../services/EquipoService";
import TipoEquipo from './../../views/TipoEquipo';

const OtForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const ot = data;
    OtService.createOt(ot);
    navigate("/dashboard/ot");
    console.log(ot);
  };

  const includeOtro = watch("otro");

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    ClienteService.getAllClientes()
      .then((response) => {
        setClientes(response.data);
        console.log(response.data);
        const results = response.data;
        return results;
      })
      .catch((error) => {
        console.log("el error esta en el useEffect");
      });
  }, []);

  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    EquipoService.getAllEquipos()
      .then((response) => {
        setEquipos(response.data);
        console.log(response.data);
        const results = response.data;
        return results;
      })
      .catch((error) => {
        console.log("el error esta en el useEffect");
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_ot}>
        <div className={style.input_ot}>
          <label>Cliente</label>
          <select {...register("cliente")}>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.razonSocial}
              </option>
            ))}
          </select>
        </div>
        <div className={style.input_ot}>
          <label>Equipos</label>
          <select {...register("equipos")}>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.tipoEquipo.tipo} - {equipo.tipoEquipo.marca} - {equipo.tipoEquipo.modelo}
              </option>
            ))}
          </select>
        </div>

        {/* <div className={style.input_ot}>
          <label>Equipo</label>
          <input
            type="text"
            {...register("equipo", {
              required: true,
            })}
          />
          {errors.equipo?.type === "required" && <p>El campo es requerido</p>}
        </div> */}

        <div className={style.input_ot}>
          <label>N° Rto transporte</label>
          <input type="text" {...register("rtoTran")} />
        </div>
        <div>
          <label>otro</label>
          <input
            className={style.input_check}
            type="checkbox"
            {...register("otro")}
          />
        </div>
        {includeOtro && (
          <div className={style.input_ot}>
            <input type="text" {...register("campo")} />
          </div>
        )}

        <button className={style.form_control_s} type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};

export default OtForm;
