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
      marca: data.marca,
      tipoEquipo: {
        id: data.tipoequipo_id,
        tipo: data.tipoequipo_id,
        modelo: data.modelo
        
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
                {tipo.tipo} - {tipo.modelo}
              </option>
            ))}
          </select>
        </div> 

        {/*<div className={style.input_tipo}>
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

                
        */}

        <div className={style.input_tipo}>
                  <label>Marca</label>
                  <input
                    type="text"
                    {...register("marca")}
                  />
                  
                </div>

        <button className={style.form_control_s} type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};

export default EquipoForm;
