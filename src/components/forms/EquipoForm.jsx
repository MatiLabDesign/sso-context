import React, { useEffect, useState } from "react";
import style from "./FormStyle.module.css";
import { useNavigate} from "react-router-dom";
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
      tipoEquipo: { //Cambie esta constante equipos<<<<<<<<<<<<<<<<<<<<<<<
        id: data.tipoequipo_id// Asignar el valor del select a tipoEquipo.id
      }
    };
    EquipoService.createEquipo(equipo);
    navigate("/dashboard/equipo");
    console.log(equipo);
  };
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<aca sigue>>>>>>>>>>>>>>>>>>>>>>>>>
  // const onSubmit = (data) => {
  //   // Modificar los datos del formulario para ajustar el formato del JSON
  //   const equipo = {
  //     numSerieEquipo: data.numSerieEquipo,
  //     tipoEquipo: {
  //       id: data.tipoequipo_id, // Asignar el valor del select a tipoEquipo.id
  //     },
  //   };

    // Enviar los datos al servicio
  //   EquipoService.createEquipo(equipo)
  //     .then(() => {
  //       console.log("Equipo creado:", equipo);
  //       navigate("/dashboard/equipo");
  //     })
  //     .catch((error) => {
  //       console.error("Error al crear el equipo:", error);
  //     });
  // };

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
          {errors.numSerieEquipo?.type === "required" && <p>El campo es requerido</p>}
          
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





        {/* <div className={style.input_equipo}>
          <label>Tipo de equipo</label>
          <input
            type="text"
            // {...register("numSerieEquipo", {
            //   required: true,
            // })}
          />
          {errors.numSerieEquipo?.type === "required" && <p>El campo es requerido</p>}
          
        </div> */}
        

        
        {/* <div className="input-cliente">
          <label>Tipo de equipo</label>
          <select {...register("tipoEquipo")}>
            <option value="1">Equipo1</option>
            <option value="1">Equipo2</option>
            <option value="1">Equipo3</option>
          </select>
        </div> */}

        
        <button className={style.form_control_s} type="submit">Guardar</button>
      </form>
    
      
    </>
  );
};

export default EquipoForm;
