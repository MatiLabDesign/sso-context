import React from "react";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/RecepcionService";

const RecepcionForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      comentario: "",
      eliminado: false,
      itemRecepcion: {
        cubreGrampa: { estado: "", requerimiento: "", observacion: "" },
        cubrePolea: { estado: "", requerimiento: "", observacion: "" },
        cubreVastago: { estado: "", requerimiento: "", observacion: "" },
        grampaAntiEyeccion: { estado: "", requerimiento: "", observacion: "" },
        estructuraChasis: { estado: "", requerimiento: "", observacion: "" },
        linternaSeparador: { estado: "", requerimiento: "", observacion: "" },
        mesaDeMotor: { estado: "", requerimiento: "", observacion: "" },
        rielesDeMotor: { estado: "", requerimiento: "", observacion: "" },
        soporteDeTransporte: { estado: "", requerimiento: "", observacion: "" },
        poleaConducida: { estado: "", requerimiento: "", observacion: "" },
      },
    },
  });

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");

  const onSubmit = async (data) => {
    try {
      const recepcion = data;
      RecepcionService.createRecepcion(recepcion);
      //   navigate("/dashboard/etapa/inspeccionPcp");
      console.log("Datos enviados exitosamente:", recepcion);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Recepción | {tipoEquipo} - OT N°{numeroOT}</h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <Controller
          name="comentario"
          control={control}
          render={({ field }) => (
            <input
              className="comentario-input"
              {...field}
              placeholder="Comentario"
            />
          )}
        />
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
      {[
        "cubreGrampa",
        "cubrePolea",
        "cubreVastago",
        "grampaAntiEyeccion",
        "estructuraChasis",
        "linternaSeparador",
        "mesaDeMotor",
        "rielesDeMotor",
        "soporteDeTransporte",
        "poleaConducida",
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label">Ok</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="ok"
                      {...field}
                      // checked={field.value === "ok"}
                      // onChange={(e) => field.onChange(e.target.value)}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Falta</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="falta"
                      {...field}
                      // checked={field.value === "falta"}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              {/* <label className="form-label">Requerimiento</label> */}
              <Controller
                name={`itemRecepcion.${itemKey}.requerimiento`}
                control={control}
                render={({ field }) => (
                  <input
                    className="form-input"
                    {...field}
                    placeholder="Requerimiento"
                  />
                )}
              />
            </div>
            <div className="item-tittle">
              {/* <label className="form-label">Observación</label> */}
              <Controller
                name={`itemRecepcion.${itemKey}.observacion`}
                control={control}
                render={({ field }) => (
                  <input
                    className="form-input"
                    {...field}
                    placeholder="Observación"
                  />
                )}
              />
            </div>
          </div>
        </div>
      ))}

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default RecepcionForm;
