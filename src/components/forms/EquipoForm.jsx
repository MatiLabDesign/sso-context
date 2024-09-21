import React, { useEffect, useState } from "react";
import style from "./FormStyle.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EquipoService from "../../services/EquipoService";
import TipoEquipoService from "../../services/TipoEquipoService";

const EquipoForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const equipo = {
      numSerieEquipo: data.numSerieEquipo,
      tipoEquipo: {
        id: data.tipoequipo_id,
      },
    };
    EquipoService.createEquipo(equipo);
    navigate("/dashboard/equipo");
    console.log(equipo);
  };

  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    TipoEquipoService.getAllTipos()
      .then((response) => {
        setTipos(response.data);
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
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_equipo}>
        <div className={style.input_equipo}>
          <label>N° de serie</label>
          <input
            type="text"
            {...register("numSerieEquipo", {
              required: true,
            })}
          />
          {errors.numSerieEquipo?.type === "required" && (
            <p>El campo es requerido</p>
          )}
        </div>

        <div className={style.input_ot}>
          <label>Tipo de Equipo</label>
          <select {...register("tipoequipo_id")}>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.tipo} - {tipo.modelo} - {tipo.marca}
              </option>
            ))}
          </select>
        </div>

        <button className={style.form_control_s} type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};

export default EquipoForm;
