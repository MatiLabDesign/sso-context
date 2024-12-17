import React from "react";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";7
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/RecepcionService";
import { useNavigate } from "react-router-dom";
import PcpInspeccion from "./PcpInspeccion";
import PcpInspeccionVH60A from "./PcpInspeccionVH60A";
import InspeccionService from "../../../../services/InspeccionService";

const PcpInspeccionVH60C = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      comentario: "",
      eliminado: false,
      itemInspeccionVH60C: {
        bomba: { estado: undefined, requerimiento: "", observacion: "" },
        manifold: { estado: undefined, requerimiento: "", observacion: "" },
        caliper: { estado: undefined, requerimiento: "", observacion: "" },
        conjuntoMangueras: {
          estado: undefined,
          requerimiento: "",
          observacion: "",
        },
        polea: { estado: undefined, requerimiento: "", observacion: "" },
      },
    },
  });

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const inspeccion = data;
      await InspeccionService.createInspeccion(inspeccion);
      console.log("Datos enviados exitosamente:", inspeccion);
      navigate("/dashboard/etapa/ensayoPCP");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        Inspección C | {tipoEquipo} - OT N°{numeroOT}
      </h3>

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
      <h3>Items</h3>
      {["Bomba",
       "Manifold",
       "Cáliper",
       "Conjunto Mangueras"].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Ok</label>
              <Controller
                name={`itemInspeccion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="ok"
                      {...field}
                      checked={field.value === "ok"}
                      onChange={() => field.onChange("ok")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fuga</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="fugas"
                      {...field}
                      checked={field.value === "fugas"}
                      onChange={() => field.onChange("fugas")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Roto</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="roto"
                      {...field}
                      checked={field.value === "roto"}
                      onChange={() => field.onChange("roto")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Eficiencia</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="eficiencia"
                      {...field}
                      checked={field.value === "eficiencia"}
                      onChange={() => field.onChange("eficiencia")}
                    />
                  </>
                )}
              />
            </div>
            {/* <div className="item-tittle">
              <label className="form-label">Falta</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="false"
                      {...field}
                      checked={field.value === false}
                      onChange={(e) => field.onChange(false)}
                    />
                  </>
                )}
              />
            </div> */}

            <div className="item-tittle">
              {/* <label className="form-label">Requerimiento</label> */}
              <Controller
                name={`itemRecepcion.${itemKey}.especificar`}
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

      <h3>Polea</h3>
      {["polea"].map(
        (itemKey) => (
          <div className="item-section" key={itemKey}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title">{itemKey}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <Controller
                  name={`itemInspeccion.${itemKey}.estado`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className="radio-input"
                        type="radio"
                        value="ok"
                        {...field}
                        checked={field.value === "ok"}
                        onChange={() => field.onChange("ok")}
                      />
                    </>
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">Fisuras</label>
                <Controller
                  name={`itemRecepcion.${itemKey}.estado`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className="radio-input"
                        type="radio"
                        value="fisuras"
                        {...field}
                        checked={field.value === "fisuras"}
                        onChange={() => field.onChange("fisuras")}
                      />
                    </>
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">Poros</label>
                <Controller
                  name={`itemRecepcion.${itemKey}.estado`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className="radio-input"
                        type="radio"
                        value="poros"
                        {...field}
                        checked={field.value === "poros"}
                        onChange={() => field.onChange("poros")}
                      />
                    </>
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">D.Inadec.</label>
                <Controller
                  name={`itemRecepcion.${itemKey}.estado`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className="radio-input"
                        type="radio"
                        value="diseno"
                        {...field}
                        checked={field.value === "diseno"}
                        onChange={() => field.onChange("diseno")}
                      />
                    </>
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">N° Trazab.</label>
                <Controller
                  name={`itemRecepcion.${itemKey}.estado`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className="radio-input"
                        type="radio"
                        value="trazabilidad"
                        {...field}
                        checked={field.value === "trazabilidad"}
                        onChange={() => field.onChange("trazabilidad")}
                      />
                    </>
                  )}
                />
              </div>
              {/* <div className="item-tittle">
              <label className="form-label">Falta</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="false"
                      {...field}
                      checked={field.value === false}
                      onChange={(e) => field.onChange(false)}
                    />
                  </>
                )}
              />
            </div> */}

              <div className="item-tittle">
                {/* <label className="form-label">Requerimiento</label> */}
                <Controller
                  name={`itemRecepcion.${itemKey}.especificar`}
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
        )
      )}

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default PcpInspeccionVH60C;
