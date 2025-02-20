import React, { useState, useEffect } from "react";
import style from "./FormStyle.module.css";
import ClienteService from "../../services/ClienteService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EquipoService from "../../services/EquipoService";
import OsService from "../../services/OsService";

const OsForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const ordens = {
        numeroOS: data.numeroOS,
        cliente: {
          id: data.cliente_id,
        },
        //no trae los id, viene undefined
        equipo: {
          id: data.equipo_id,
        },
        remitoTransporte: data.remitoTransporte,
        comentario: data.comentario,
        etapaActual: 1
      };
    OsService.createOs(ordens);  
    // OtService.createOt(orden);
    navigate("/dashboard/listar-ot");
    console.log(ordens);
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
            <div className= {style.form_container_i}>
              <div className={style.column_two}>
                <div className={style.input_ot}>
                  <label>Cliente</label>
                  <select {...register("cliente_id")}>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.razonSocial}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={style.input_ot}>
                  <label>Equipos</label>
                  <select {...register("equipo_id")}>
                    {equipos.map((equipo) => (
                      <option key={equipo.id} value={equipo.id}>
                        {equipo.tipoEquipo.tipo} - {equipo.tipoEquipo.modelo} -{" "}
                        {equipo.tipoEquipo.marca}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={style.column_two}>
                <div className={style.input_ot}>
                  <label>N° OS</label>
                  <input className={style.form_input_i}  type="text" {...register("numeroOT")} />
                </div>
    
                {/* <div className={style.input_ot}>
                  <label>N° Rto transporte</label>
                  <input className={style.form_input_i}  type="text" {...register("remitoTransporte")} />
                </div> */}
              </div>
            </div>
            {/* <div>
              <label>otro</label>
              <input
                className={style.input_check}
                type="checkbox"
                {...register("otro")}
              />
            </div>
            {includeOtro && (
              <div className={style.input_ot}>
                <input  type="text" {...register("comentario")} />
              </div>
            )} */}
    
            <button className={style.form_control_s} type="submit">
              Guardar
            </button>
          </form>
        </>
  );
};

export default OsForm;
