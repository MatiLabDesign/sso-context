import React from "react";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";7
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/RecepcionService";
import { useNavigate } from "react-router-dom";
import PcpInspeccion from './PcpInspeccion';
import PcpInspeccionVH60A from './PcpInspeccionVH60A';
import InspeccionService from "../../../../services/InspeccionService";

const PcpInspeccionVH60B = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      comentario: "",
      eliminado: false,
      rodamientoPcpVh60: {
        axial294158: { estado: undefined, requerimiento: "", observacion: "" },
        guiaSup6022: { estado: undefined, requerimiento: "", observacion: "" },
        guiaInf6017: { estado: undefined, requerimiento: "", observacion: "" },
        freno60051rsZ: { estado: undefined, requerimiento: "", observacion: "" },
        antirretornoCsk25PpC3: { estado: undefined, requerimiento: "", observacion: "" }},
      transmisionFrenoPcpVh60:{
        corona: { estado: undefined, requerimiento: "", observacion: "" },
        pinion: { estado: undefined, requerimiento: "", observacion: "" },
        pastillasFreno: { estado: undefined, requerimiento: "", observacion: "" },
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
      navigate("/dashboard/etapa/inspeccionPCPC");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección B | {tipoEquipo} - OT N°{numeroOT}</h3>

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
      <h3>Rodamientos</h3>
      {[
        "Axial 294158",
        "Guia Sup 6022",
        "Guia Inf 6017",
        "Freno 6005 1RS o Z",
        "Antiret CSK25-PP-C3",
        
      ].map((itemKey) => (
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
                      value= "ok"
                      {...field}
                      checked={field.value === "ok"}
                      onChange={() => field.onChange("ok")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Picado</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "picado"
                      {...field}
                      checked={field.value === "picado"}
                      onChange={() => field.onChange("picado")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Laminado</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "laminado"
                      {...field}
                      checked={field.value === "laminado"}
                      onChange={() => field.onChange("laminado")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">F.Jaula</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "jaula"
                      {...field}
                      checked={field.value === "jaula"}
                      onChange={() => field.onChange("jaula")}
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
                    placeholder="Desgaste Especificar"
                  />
                )}
              />
            </div>
            
          </div>
        </div>
      ))}

      <h3>Transmisión freno</h3>
      {[
        
        "Corona",
        "Piñon",
        "Pastillas Freno",
      ].map((itemKey) => (
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
                      value= "ok"
                      {...field}
                      checked={field.value === "ok"}
                      onChange={() => field.onChange("ok")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Picado</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "picado"
                      {...field}
                      checked={field.value === "picado"}
                      onChange={() => field.onChange("picado")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Desgaste</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "desgastado"
                      {...field}
                      checked={field.value === "desgastado"}
                      onChange={() => field.onChange("desgastado")}
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
                      value= "roto"
                      {...field}
                      checked={field.value === "roto"}
                      onChange={() => field.onChange("roto")}
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

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default PcpInspeccionVH60B;

